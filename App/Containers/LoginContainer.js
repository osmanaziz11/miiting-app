import React, { Component } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, AsyncStorage, Platform, Image, ScrollView } from "react-native";
import Styles from "./Styles/LoginStyles";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import Header from "../Components/Header";
import LoginLink from "../Components/LoginLink";
import Images from "../Themes/Images";
import LinearGradient from "react-native-linear-gradient";
import GestureRecognizer from 'react-native-swipe-gestures';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FacebookHandler from "../Config/FacebookConfig";
import socket from "../Config/SocketConfig";
import MiitingLoader from "../Components/MiitingLoader";

class LoginContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			global_err: false,
			email: "",
			password: "",
			passwordVisible: true,
			err_email: false,
			err_password: false,
			currentEvent: this.props.navigation.getParam("currentEvent", {}),
			is_creating_event: this.props.navigation.getParam("is_creating_event", false),
			is_joining: this.props.navigation.getParam("is_joining", false),
			qrcode: this.props.navigation.getParam("qrcode", "No qrCode"),
			qrcode: this.props.navigation.getParam("is_coming", true),
			is_loading: false,
		}

		this.focus = this.focus.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.togglePassword = this.togglePassword.bind(this);
		this.handleFacebook = this.handleFacebook.bind(this);
		this.renderErrorPasswordFromAPI = this.renderErrorPasswordFromAPI.bind(this);
		this.navigation = this.props.navigation;
	}

	componentDidMount() {
		this.facebookHandler = new FacebookHandler();
		AsyncStorage.getItem("@login:email", (error, result) => {
			if (!error && result != null && result != "") {
				this.setState({ email: result }, () => {
					this.refs.inputEmail.setNativeProps({ text: this.state.email });
				})
			}
		});
	}

	focus(e) {
		this.refs[e].focus();
	}

	handleFacebook() {
		this.setState({ is_loading: true })
		this.facebookHandler.login(user => {
			Api.userLogin({
				facebook: user.credentials.token
			}).then(response => {
				console.log(response)
				switch (response.status) {
					case "success":
						this.loginAndNavigate(response);
						break;
					case "error":
						if (response.message === "mail_not_exists") {
							Api.userRegister({
								facebook: user.credentials.token
							}).then(registerResponse => {
								switch (registerResponse.status) {
									case "success":
										this.loginAndNavigate(registerResponse);
										break;
									default:
										this.setState({ is_loading: false })
										Alert.alert(I18n.t("register_title"), I18n.t("mail_not_exists"));
								}
							});
						} else {
							this.setState({ is_loading: false })
							Alert.alert(I18n.t("register_title"), I18n.t(response.message));
						}
						break;
					default:
						this.setState({ is_loading: false })
						Alert.alert(I18n.t("register_title"), I18n.t("unknown_error"));
				}
			})
		});
	}

	handleLogin() {
		if (this.validateForm()) {
			this.setState({ is_loading: true })
			Api.userLogin({
				email: this.state.email,
				password: this.state.password,
			}).then(response => {
				switch (response.status) {
					case "success":
						console.log("Login success for email", this.state.email);
						this.loginAndNavigate(response);
						break;
					case "error":
						this.setState({ is_loading: false, password: "" });
						if (response.message === "bad_password") {
							this.renderErrorPasswordFromAPI()
						}
						if (response.message === "mail_not_exists") {
							this.renderErrorEmail()
						}
						break;
					default:
						this.setState({ is_loading: false })
						Alert.alert(I18n.t("login_title"), I18n.t("unknown_error"));
				}
			})
		}
	}

	loginAndNavigate(loginResponse) {
		console.log(this.state.id)
		AsyncStorage.multiSet([
			["@login:firstname", loginResponse.content.firstname],
			["@login:lastname", loginResponse.content.lastname],
			["@login:email", this.state.email],
			["@login:id", loginResponse.content.id],
			["@login:token", loginResponse.content.token]
		], error => {
			if (error == null) {
				AsyncStorage.getItem("@push:token", (error, result) => {
					Api.tokenAdd(result).then(response => {
						if (response.status === "success") console.log("Succesfully registered FCM token:", result);
					});
				});
				socket.emit("register", { id: loginResponse.content.id });
				if (this.navigation.getParam("is_joining", false)) {
					var qrcodeInput = this.navigation.getParam("qrcode", null);
					Api.addUserInEvent({
						qrcode: qrcodeInput,
						is_coming: this.state.is_coming ? 1 : 0
					})
						.then(response => {
							console.log(response, this.state)
							this.setState({ is_loading: false });
							switch (response.status) {
								case "success":
									response.content.picture = loginResponse.content.picture;
									this.navigation.replace("JoinInvitation", { content: response.content })
									break;
								case "error":
									if (response.message === "already_registered") {
										this.props.navigation.replace("Dashboard", { content: loginResponse.content })
									} else {
										Alert.alert("Code de l\'évènement", I18n.t(response.message))
									}
									break;
								default:
									Alert.alert(I18n.t("login_title"), I18n.t("unknown_error"));
							}
						})
				} else if (this.navigation.getParam("is_creating_event", false)) {
					this.navigation.replace("EventSuccess", { currentEvent: this.state.currentEvent, currentUser: loginResponse.content })
				} else {
					if (loginResponse.content.events.length == 0) {
						this.props.navigation.replace("NoEvent", { currentUser: loginResponse.content, id: null })
					} else {
						if (loginResponse.content.events.length === 1) {
							this.props.navigation.replace("Dashboard", { content: loginResponse.content, id: this.state.id });
						} else {
							this.props.navigation.replace("SelectEvent", { content: loginResponse.content });
						}
					}
				}
			}
		});
	}

	renderErrorPassword() {
		this.setState({ err_password: true, global_err: true, err_email: false })
	}

	renderErrorPasswordFromAPI() {
		this.setState({ global_err: true, err_email: false })
	}

	renderErrorEmail() {
		this.setState({ err_email: true, global_err: true, err_password: false })
	}

	validateEmail() {
		return this.state.email.length <= 0 || this.state.email.indexOf("@") == -1;
	}

	validatePassword() {
		return this.state.password.length <= 0;
	}

	validateForm() {
		var isFormValid = true;

		if (this.validateEmail()) {
			isFormValid = false;
			this.setState({ err_email: true })
		}

		if (this.validatePassword()) {
			isFormValid = false;
			this.setState({ err_password: true })
		}

		return isFormValid;
	}

	togglePassword() {
		this.setState({ passwordVisible: !this.state.passwordVisible })
	}

	render() {
		return (
			<GestureRecognizer
				style={Styles.container}
				onSwipeDown={() => { Keyboard.dismiss() }}>
				<Header title={I18n.t("header_login")}
					onBackPressed={() => { this.navigation.navigate("Launch") }} />
				<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} keyboardDismissMode="on-drag" style={Styles.scrollView}>
					{(!this.state.global_err && this.state.is_joining) &&
						<Text style={Styles.loginInstructions}>{I18n.t("login_instructions")}</Text>
					}
					{this.state.global_err &&
						<Text style={Styles.global_err}>{I18n.t("login_errors")}</Text>
					}
					<View style={Styles.formContainer}>
						<View>
							<Text style={Styles.textInputLabel}>{I18n.t("input_email_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TextInput
									ref={"inputEmail"}
									autoCapitalize={"none"}
									keyboardType={"email-address"}
									autoCorrect={false}
									returnKeyType={"next"}
									underlineColorAndroid={"transparent"}
									placeholder={this.state.err_email ? I18n.t("invalid_email_format") : I18n.t("input_email_placeholder")}
									placeholderTextColor={this.state.err_email ? "#ed4949" : "#8a91a1"}
									onChangeText={value => { this.setState({ email: value }) }}
									onSubmitEditing={() => { this.focus("inputPassword") }}
									style={this.state.err_email ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput} />
								<Image style={Styles.validateImg} source={this.state.err_email ? Images.icons.invalid : null} />
							</View>
							<Text style={Styles.textInputLabel}>{I18n.t("input_password_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TextInput
									ref={"inputPassword"}
									autoCapitalize={"none"}
									secureTextEntry={this.state.passwordVisible}
									underlineColorAndroid={"transparent"}
									returnKeyType={"next"}
									autoCorrect={false}
									value={this.state.password}
									placeholder={this.state.err_password ? I18n.t("password_required") : I18n.t("register_password_placeholder")}
									placeholderTextColor={this.state.err_password ? "#ed4949" : "#8a91a1"}
									onChangeText={value => { this.setState({ password: value }) }}
									style={this.state.err_password ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput} />
								<Image style={[Styles.validateImg, Styles.validateImgPassword]} source={this.state.err_password ? Images.icons.invalid : null} />
								<TouchableOpacity style={Styles.showPassword}
									hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
									onPress={this.togglePassword}>
									<Image resizeMode={"contain"} style={Styles.showPasswordImg} source={Images.icons.eye} />
								</TouchableOpacity>
							</View>
						</View>
						{this.state.is_loading &&
							<MiitingLoader />
						}
						<TouchableOpacity
							ref={"buttonSubmit"}
							onPress={this.handleLogin}
							disabled={this.state.is_loading}>
							<LinearGradient
								colors={["#547FFA", "#82ABFB"]}
								start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
								style={Styles.buttonSubmit}>
								<Text style={Styles.buttonText}>{I18n.t("login_submit_button")}</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
					<View style={Styles.forgotCredentialsContainer}>
						<Text style={Styles.forgotCredentialsSentence}>{I18n.t("forgot_credentials_sentence")}</Text>
						<TouchableOpacity onPress={() => { this.props.navigation.navigate("ForgottenPassword") }}>
							<Text style={Styles.forgotCredentialsButton}>{I18n.t("click_here")}</Text>
						</TouchableOpacity>
					</View>
					<View style={Styles.separator}>
						<Text style={Styles.separatorText}>{"ou"}</Text>
					</View>
					<TouchableOpacity
						ref={"buttonFacebook"}
						onPress={this.handleFacebook}
						disabled={this.state.is_loading}>
						<View style={Styles.facebookButton}>
							<Image source={Images.icons.fb_logo} style={Styles.fb_logo} />
							<Text style={Styles.facebookButtonText}>{I18n.t("continue_with_fb")}</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAwareScrollView>
				{(this.state.is_creating_event || this.state.is_joining) &&
					<LoginLink text={I18n.t("no_account_question")} route={"register"} goTo={() => { this.navigation.replace('Register', { is_creating_event: this.state.is_creating_event, currentEvent: this.state.currentEvent, is_joining: this.state.is_joining, qrcode: this.navigation.getParam("qrcode", null), is_coming: this.state.is_coming }) }} />
				}
			</GestureRecognizer>
		)
	}
}

export default LoginContainer;
