import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, Platform, AsyncStorage, Linking } from "react-native";
import Styles from "./Styles/LaunchStyles";
import Images from "../Themes/Images";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import Swiper from "react-native-swiper";
import ElevatedView from "react-native-elevated-view";
import LinearGradient from "react-native-linear-gradient";
import LoginLink from "../Components/LoginLink";
import socket from "../Config/SocketConfig";

class LaunchContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			index: 0,
			mail: "",
			password: "",
			isLoading: true,
		}

		this.handleEventCreate = this.handleEventCreate.bind(this);
		this.handleJoinEvent = this.handleJoinEvent.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		try {
			AsyncStorage.multiGet(['@login:email', '@login:token', "@savedEvent:id"], (error, savedLogin) => {
				if (savedLogin != null && savedLogin[0][1] !== null && savedLogin[1][1] !== null) {
					console.log("Saved login data found:", savedLogin);
					this.state.email = savedLogin[0][1];
					this.state.token = savedLogin[1][1];
					this.state.id = savedLogin[2][1];
					Api.userLogin({
						email: this.state.email,
						token: this.state.token,
					}).then(response => {
						switch (response.status) {
							case "success":
								console.log("Autologin success for email", this.state.email);
								this.loginAndNavigate(response);
								break;
							case "error":
								this.setState({ isLoading: false })
								console.log("Autologin failed for email", this.state.email);
								break;
							default:
								this.setState({ isLoading: false })
								Alert.alert(I18n.t("login_title"), I18n.t("unknown_error"));
						}
					});
				} else {
					this.setState({ isLoading: false })
					console.log("No login data found in storage, staying on launch screen.");
					Linking.getInitialURL().then(initialURL => {
						console.log(initialURL)
						if (initialURL !== null) {
							let dataElements = initialURL.split("/");
							if (dataElements.length > 2 && dataElements[dataElements.length - 2] == "qrcode") {
								let joincode = dataElements[dataElements.length - 1];
								Api.getEventJoiningDetails(joincode).then(response => {
									if (response.status === "success") {
										this.props.navigation.navigate("JoiningInfo", { event: response.content, qrcode: joincode })
									}
								});
							}
						}
					});
				}
			});
		} catch (error) {
			this.setState({ isLoading: false })
			console.error("Error while retreiving login data:", error)
		}
	}

	loginAndNavigate(response) {
		AsyncStorage.multiSet([
			["@login:token", response.content.token]
		], error => {
			if (error == null) {
				AsyncStorage.getItem("@push:token", (error, result) => {
					Api.tokenAdd(result).then(response => {
						if (response.status === "success") console.log("Succesfully registered FCM token:", result);
					});
				});

				Linking.getInitialURL().then(initialURL => {
					if (initialURL !== null) {
						let dataElements = initialURL.split("/");
						if (dataElements.length > 2 && dataElements[dataElements.length - 2] == "qrcode") {
							let joincode = dataElements[dataElements.length - 1];
							Api.getEventJoiningDetails(joincode).then(response => {
								if (response.status === "success") {
									this.props.navigation.navigate("JoiningInfo", { event: response.content, qrcode: joincode })
								}
							});
						}
					} else {
						if (response.content.events.length == 0) {
							this.props.navigation.replace("NoEvent", { currentUser: response.content, id: this.state.id })
						} else {
							if (response.content.events.length === 1) {
								this.props.navigation.replace("Dashboard", { content: response.content, id: this.state.id });
							} else {
								this.props.navigation.replace("SelectEvent", { content: response.content });
							}
						}
					}
				});



				socket.emit("register", { id: response.content.id });
			}
		});
		this.setState({ currentUser: response.content })
	}

	handleEventCreate() {
		this.props.navigation.navigate("CreateEvent", { currentUser: this.state.currentUser });
	}

	handleJoinEvent() {
		this.props.navigation.navigate("JoinEvent", { currentUser: this.state.currentUser });
	}

	handleLogout() {
		Api.userLogout().then(response => {
			switch (response.status) {
				case "success":
					AsyncStorage.multiRemove([
						"@login:email",
						"@login:password",
						"@login:token",
						"@savedEvent:id"
					], (error) => {
						if (error != null) console.error("Error while removing savedLogin", error);
						this.props.navigation.replace("Launch");
					});
					break;
				case "error":
					Alert.alert(I18n.t("logout_title"), I18n.t(response.message));
					break;
				default:
					Alert.alert(I18n.t("logout_title"), I18n.t("unknown_error"));
			}
		});
	}

	onProviderPress() {
		let url = "https://www.miiting.net/devenir-partenaire";
		Linking.openURL(url);
	}

	render() {
		return (
			<View style={Styles.container}>
				<View style={Styles.launch_header}>
					<Image source={Images.logo} style={Styles.logo} resizeMode={"contain"} />
					<Text numberOfLines={2} style={Styles.launch_description}>{I18n.t("launch_description")}</Text>
				</View>
				<Swiper containerStyle={Styles.swiper} index={0} autoplay={true} loop={true} autoplayTimeout={Platform.OS === 'ios' ? 5 : 7} scrollEnabled={false} paginationStyle={Styles.pagination} showsPagination={false}>
					<View style={Styles.slide}>
						<ImageBackground source={Images.background_1} style={Styles.launchImg}></ImageBackground>
					</View>
					<View style={Styles.slide}>
						<ImageBackground source={Images.background_2} style={Styles.launchImg}></ImageBackground>
					</View>
					<View style={Styles.slide}>
						<ImageBackground source={Images.background_3} style={Styles.launchImg}></ImageBackground>
					</View>
					<View style={Styles.slide}>
						<ImageBackground source={Images.background_4} style={Styles.launchImg}></ImageBackground>
					</View>
					<View style={Styles.slide}>
						<ImageBackground source={Images.background_5} style={Styles.launchImg}></ImageBackground>
					</View>
				</Swiper>
				{!this.state.isLoading && <View style={Styles.buttonsContainer}>
					<TouchableOpacity
						ref={"buttonCreate"}
						onPress={() => { this.props.navigation.navigate("Register") }}>
						<LinearGradient
							colors={["#547FFA", "#82ABFB"]}
							start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
							style={Styles.buttonCreate}>
							<Text style={Styles.createButtonText}>{I18n.t("launch_register_button")}</Text>
						</LinearGradient>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => { this.props.navigation.navigate("Login") }}>
						<ElevatedView
							elevation={Platform.select({ ios: 9, android: 6 })}
							style={Styles.buttonJoin}>
							<Text style={Styles.joinButtonText}>{I18n.t("launch_login_button")}</Text>
						</ElevatedView>
					</TouchableOpacity>
				</View>}
				<View style={Styles.providerContainer}>
					<Text style={Styles.providerSentence}>{I18n.t("launch_provider_question_sentence")}</Text>
					<TouchableOpacity onPress={this.onProviderPress} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
						<Text style={Styles.providerButton}>{I18n.t("click_here")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

export default LaunchContainer;
