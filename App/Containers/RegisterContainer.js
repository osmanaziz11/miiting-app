import React, { Component } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, AsyncStorage, Platform, Image, Switch } from "react-native";
import Styles from "./Styles/RegisterStyles";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import Header from "../Components/Header";
import LoginLink from "../Components/LoginLink";
import Images from "../Themes/Images";
import ImagePicker from "react-native-image-crop-picker";
import LinearGradient from "react-native-linear-gradient";
import GestureRecognizer from 'react-native-swipe-gestures';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MiitingLoader from "../Components/MiitingLoader";
import FacebookHandler from "../Config/FacebookConfig";
import socket from "../Config/SocketConfig";
import DateTimePicker from 'react-native-modal-datetime-picker';
import AddButton from "../Components/AddButton";
import Metrics from "../Themes/Metrics";


class RegisterContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			firstname: "",
			lastname: "",
			email: "",
			phone: "",
			password: "",
			photo: "",
			birthdate: "",
			single: false,
			passwordVisible: true,
			err_firstname: false,
			err_lastname: false,
			err_email: false,
			err_phone: false,
			err_password: false,
			err_birthdate: false,
			global_err: false,
			currentEvent: this.props.navigation.getParam("currentEvent", {}),
			is_creating_event: this.props.navigation.getParam("is_creating_event", false),
			is_joining: this.props.navigation.getParam("is_joining", false),
			qrcode: this.props.navigation.getParam("qrcode", "no qr code"),
			is_coming: this.props.navigation.getParam("is_coming", true),
			is_loading: false,
			isDatePickerVisible: false,
		}
		this.focus = this.focus.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.togglePassword = this.togglePassword.bind(this);
		this.handleFacebook = this.handleFacebook.bind(this);
		this._handleDatePicked = this._handleDatePicked.bind(this);
		this._hideDatePicker = this._hideDatePicker.bind(this);
		this._showDatePicker = this._showDatePicker.bind(this);
		this.handleAddPhoto = this.handleAddPhoto.bind(this);
		this.navigation = this.props.navigation;
		this.validatePhone = this.validatePhone.bind(this);
	}

	componentDidMount() {
		this.facebookHandler = new FacebookHandler();
	}

	handleAddPhoto() {
		if (this.state.photo === "") {
			ImagePicker.openPicker({
				width: 600,
				height: 600,
				includeBase64: true,
				cropperToolbarColor: "#547FFA",
				cropping: true
			}).then(response => {
				if (response.data) {
					this.setState({ photo: response.data })
				}
			});
		} else {
			this.setState({ photo: "" });
		}
	}

	formatImageUrl(imageUrl) {
		if (imageUrl == "") {
			return (imageUrl);
		}
		return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
	}

	handleFacebook() {
		this.facebookHandler.login(user => {
			Api.userRegister({
				facebook: user.credentials.token
			}).then(response => {
				switch (response.status) {
					case "success":
						this.loginAndNavigate(response);
						break;
					case "error":
						Alert.alert(I18n.t("register_title"), I18n.t(response.message));
						break;
					default:
						Alert.alert(I18n.t("register_title"), I18n.t("unknown_error"));
				}
			})
		});
	}

	focus(e) {
		this.refs[e].focus();
	}

	_handleDatePicked(date) {
		var day = this.addZero(date.getDate());
		var month = this.addZero(date.getMonth() + 1);
		var year = this.addZero(date.getFullYear());
		var datePicked = `${day}/${month}/${year}`;
		this.setState({ birthdate: datePicked });
		this._hideDatePicker();
	}

	_hideDatePicker() {
		this.setState({ isDatePickerVisible: false });
	}

	_showDatePicker() {
		this.setState({ isDatePickerVisible: true });
	}

	handleRegister() {
		if (this.validateForm()) {
			this.setState({ is_loading: true })
			Api.userRegister({
				email: this.state.email,
				password: this.state.password,
				phone: this.state.phone,
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				birthday: this.state.birthdate,
				single: this.state.single,
				photo: this.state.photo
			}).then(response => {
				switch (response.status) {
					case "success":
						this.loginAndNavigate(response);
						break;
					case "error":
						this.setState({ is_loading: false })
						Alert.alert(I18n.t("register_title"), I18n.t(response.message));
						break;
					default:
						Alert.alert(I18n.t("register_title"), I18n.t("unknown_error"));
				}
			})
		} else {
			this.setState({ global_err: true })
		}
	}

	loginAndNavigate(loginResponse) {
		AsyncStorage.multiSet([
			["@login:email", this.state.email],
			["@login:password", this.state.password],
			["@login:firstname", this.state.firstname],
			["@login:birthdate", this.state.birthdate],
			["@login:lastname", this.state.lastname],
			["@login:phone", this.state.phone],
			["@login:single", this.state.single.toString()],
			["@login:id", loginResponse.content.id],
			["@login:token", loginResponse.content.token]
		], error => {
			if (error == null) {
				AsyncStorage.getItem("@push:token", (error, result) => {
					Api.tokenAdd(result).then(response => {
						if (response.status === "success") console.log("Succesfully registered FCM token:", result);
					});
				});
				// Alert.alert(I18n.t("register_title"), I18n.t("register_success"));
				socket.emit("register", { id: loginResponse.content.id });
				if (this.navigation.getParam("is_joining", false)) {
					var qrcodeInput = this.navigation.getParam("qrcode", null);
					console.log(this.navigation)
					Api.addUserInEvent({
						qrcode: qrcodeInput,
						is_coming: this.state.is_coming ? 1 : 0,
					})
						.then(response => {
							switch (response.status) {
								case "success":
									this.setState({ is_loading: false })
									this.navigation.replace("JoinInvitation", { content: response.content })
									break;
								case "error":
									if(response.message === "already_registered"){
										this.props.navigation.replace("Dashboard", {content: loginResponse.content, loginResponse: loginResponse})
									}else{
										Alert.alert("Code de l\'évènement", I18n.t(response.message))
									}
									break;
								default:
									Alert.alert(I18n.t("login_title"), I18n.t("unknown_error"));
							}
						})
				} else if (this.navigation.getParam("is_creating_event", false)) {
					this.setState({ is_loading: false })
					this.navigation.replace("EventSuccess", { currentEvent: this.navigation.state.params.currentEvent, currentUser: loginResponse.content })

				} else {
					this.setState({is_loading: false})
					if (loginResponse.content.events.length == 0) {
						this.props.navigation.replace("NoEvent", {currentUser: loginResponse.content, id: null})
					} else {
						this.props.navigation.replace("Dashboard", {content: loginResponse.content})
					}
				}
			}
		});
	}

	validateForm() {
		var isFormValid = true;

		if (this.validateFirstName()) {
			this.setState({ err_firstname: true })
			isFormValid = false;
		}

		if (this.validateLastName()) {
			this.setState({ err_lastname: true })
			isFormValid = false;
		}

		if (this.validateEmail() === false) {
			this.setState({ err_email: true })
			isFormValid = false;
		}

		if (this.validatePassword()) {
			this.setState({ err_password: true })
			isFormValid = false;
		}

		if (this.validatePhone()) {
			this.setState({ err_phone: true })
			isFormValid = false;
		}

		return isFormValid;
	}

	validateFirstName() {
		return this.state.firstname <= 0;
	}

	validateLastName() {
		return this.state.lastname <= 0;
	}

	validateEmail() {
		let email = this.state.email;
		let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email.length > 0 && regex.test(email);
	}

	validatePassword() {
		return this.state.password.length < 3;
	}

	validatePhone() {
		// return this.state.phone.length != 0 && (this.state.phone.length != 10 || !(isNaN(this.state.phone)));
		let phonelength = this.state.phone.length;
		return (phonelength != 0 && phonelength != 10) || (phonelength == 10 && isNaN(this.state.phone))
	}

	togglePassword() {
		this.setState({ passwordVisible: !this.state.passwordVisible })
	}

	addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	render() {
		return (
			<View
				style={Styles.container}
				onSwipeDown={() => { Keyboard.dismiss() }}>
				<Header title={I18n.t("header_register")}
					onBackPressed={() => { this.props.navigation.navigate("Launch") }} />
				<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} keyboardDismissMode="on-drag">
					{this.state.global_err &&
						<Text style={Styles.global_err}>{I18n.t("register_errors")}</Text>
					}
					<View style={Styles.formContainer}>
						<View style={Styles.previewContainer}>
							<View style={Styles.addPhotoContainer}>
								{(this.state.photo !== null && this.state.photo.length > 0) ?
									<View style={Styles.eventPhotoPreview}>
										<Image source={{ uri: this.formatImageUrl("data:image/jpeg;base64," + this.state.photo) }} style={Styles.eventPhotoPreviewImg} resizeMode={"cover"} />
									</View>
									:
									<AddButton onPress={this.handleAddPhoto} textStyles={Styles.addButtonText} text={I18n.t("add_profile_picture")} />
								}
							</View>
							{this.state.photo != "" && <TouchableOpacity
								onPress={() => { this.setState({ photo: "" }) }}>
								<Text style={Styles.removePictureButtonText}>{I18n.t("remove_profile_picture")}</Text>
							</TouchableOpacity>}
						</View>
						<View>
							<Text style={Styles.textInputLabel}>{I18n.t("input_firstname_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TextInput
									ref={"inputFirstName"}
									underlineColorAndroid={"transparent"}
									autoCapitalize={"sentences"}
									autoCorrect={false}
									returnKeyType={"next"}
									placeholder={this.state.err_firstname ? I18n.t("firstname_too_short") : I18n.t("register_firstname_placeholder")}
									placeholderTextColor={this.state.err_firstname ? "#ed4949" : "#8a91a1"}
									onChangeText={value => { this.setState({ firstname: value }) }}
									onSubmitEditing={() => { this.focus("inputLastName") }}
									style={this.validateFirstName() ? this.state.err_firstname ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput} />
								<Image style={Styles.validateImg} source={this.validateFirstName() ? this.state.err_firstname ? Images.icons.invalid : null : Images.icons.valid} />
							</View>
							<Text style={Styles.textInputLabel}>{I18n.t("input_lastname_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TextInput
									ref={"inputLastName"}
									underlineColorAndroid={"transparent"}
									autoCorrect={false}
									autoCapitalize={"sentences"}
									returnKeyType={"next"}
									placeholder={this.state.err_lastname ? I18n.t("lastname_too_short") : I18n.t("register_lastname_placeholder")}
									placeholderTextColor={this.state.err_lastname ? "#ed4949" : "#8a91a1"}
									onChangeText={value => { this.setState({ lastname: value }) }}
									onSubmitEditing={() => { this.focus("inputEmail") }}
									style={this.validateLastName() ? this.state.err_lastname ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput} />
								<Image style={Styles.validateImg} source={this.validateLastName() ? this.state.err_lastname ? Images.icons.invalid : null : Images.icons.valid} />
							</View>
							<Text style={Styles.textInputLabel}>{I18n.t("input_birthdate_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TouchableOpacity onPress={this._showDatePicker} style={Styles.pickers}>
									<Text containerStyle={Styles.textInput}>{this.state.birthdate.length <= 0 ? "Choisissez une date" : this.state.birthdate}</Text>
									<Image source={Images.icons.date_picker_icon} style={Styles.pickers_icons} />
								</TouchableOpacity>
								<DateTimePicker
									isVisible={this.state.isDatePickerVisible}
									onConfirm={this._handleDatePicked}
									onCancel={this._hideDatePicker}
									mode={"date"}
									maximumDate={new Date()}
									cancelTextIOS={I18n.t("datetime_picker_cancel_text")}
									confirmTextIOS={I18n.t("datetime_picker_confirm_text")}
									titleIOS={I18n.t("modal_title_date_picker")} />
							</View>
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
									onSubmitEditing={() => { this.focus("inputPhone") }}
									style={this.validateEmail() === false ? this.state.err_email ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput} />
									{this.state.email.length > 0 &&
										<Image style={Styles.validateImg} source={(this.validateEmail() === false || this.state.err_email) ? Images.icons.invalid : Images.icons.valid} />
									}
							</View>
							<Text style={Styles.textInputLabel}>{I18n.t("input_phone_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TextInput
									ref={"inputPhone"}
									underlineColorAndroid={"transparent"}
									autoCapitalize={"none"}
									autoCorrect={false}
									returnKeyType={"done"}
									keyboardType={"phone-pad"}
									placeholder={this.state.err_phone ? I18n.t("phone_too_short") : I18n.t("register_phone_placeholder")}
									placeholderTextColor={this.state.err_phone ? "#ed4949" : "#8a91a1"}
									onSubmitEditing={() => { this.focus('inputPassword') }}
									onChangeText={value => { this.setState({ phone: value }) }}
									style={this.validatePhone() ? this.state.err_phone ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput} />
									<Image style={Styles.validateImg} source={this.validatePhone() ? this.state.err_phone ? Images.icons.invalid : null : Images.icons.valid} />
							</View>
							<Text style={Styles.confidentialInput}>{I18n.t("register_confidentiality")}</Text>
							<Text style={Styles.textInputLabel}>{I18n.t("input_password_label")}</Text>
							<View
								style={Styles.textInputContainer}>
								<TextInput
									ref={"inputPassword"}
									autoCapitalize={"none"}
									secureTextEntry={this.state.passwordVisible}
									underlineColorAndroid={"transparent"}
									returnKeyType={"done"}
									autoCorrect={false}
									placeholder={this.state.err_password ? I18n.t("password_too_short") : I18n.t("register_password_placeholder")}
									placeholderTextColor={this.state.err_password ? "#ed4949" : "#8a91a1"}
									onChangeText={value => { this.setState({ password: value }) }}
									onSubmitEditing={this.handleRegister}
									style={this.validatePassword() ? this.state.err_password ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput} />
								<Image style={[Styles.validateImg, Styles.validateImgPassword]} source={this.validatePassword() ? this.state.err_password ? Images.icons.invalid : null : Images.icons.valid} />
								<TouchableOpacity style={Styles.showPassword}
									hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
									onPress={this.togglePassword}>
									<Image resizeMode={"contain"} style={Styles.showPasswordImg} source={Images.icons.eye} />
								</TouchableOpacity>
							</View>
							<View style={Styles.singleInputContainer}>
								<Text style={Styles.singleInputLabel}>{I18n.t("edit_user_single_input_label")}</Text>
								<Switch value={this.state.single} onValueChange={single => this.setState({ single })} trackColor={"#527afe"} thumbColor={"#FFFFFF"}></Switch>
							</View>
						</View>
						{this.state.is_loading &&
							<MiitingLoader />
						}
						<TouchableOpacity
							ref={"buttonSubmit"}
							onPress={this.handleRegister}
							disabled={this.state.is_loading}>
							<LinearGradient
								colors={["#547FFA", "#82ABFB"]}
								start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
								style={Styles.buttonSubmit}>
								<Text style={Styles.buttonText}>{I18n.t("register_submit_button")}</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity
							ref={"buttonFacebook"}
							onPress={this.handleFacebook}>
							<View style={Styles.facebookButton}>
								<Image source={Images.icons.fb_logo} style={Styles.fb_logo} />
								<Text style={Styles.facebookButtonText}>{I18n.t("continue_with_fb")}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
				{!this.state.global_err &&
					<LoginLink text={I18n.t("have_an_account_question")} goTo={() => { this.props.navigation.replace('Login', { is_creating_event: this.state.is_creating_event, currentEvent: this.state.currentEvent, is_joining: this.state.is_joining }) }} route={"login"}/>
				}
			</View>
		)
	}
}

export default RegisterContainer;
