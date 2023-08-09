import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView , Alert} from 'react-native';
import Styles from "./Styles/PotStyles";
import Header from "../Components/Header";
import Drawer from "../Components/Drawer";
import { I18n } from "../Lib";
import Images from '../Themes/Images';
import LinearGradient from "react-native-linear-gradient";
import Api from '../Config/Apiconfig';
import Avatar from "../Components/Avatar";
import Metrics from "../Themes/Metrics";
import moment from "moment";
import Advert from "../Components/Advert";
class PotContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerIsOpen: false,
			currentUser: null,
			currentEvent: null,
			potDetails: {
				enabled : null,
				description: "",
				total_amount: "",
				participants_number: "",
				end_at: "",
				bank_information: false,
			},
			showPot: false,
			time_left: 0,
			messages: [],
		};
		this.handleParticipate = this.handleParticipate.bind(this);
		this.handleAddBankInfo = this.handleAddBankInfo.bind(this);
		this.handleGoToEditUser = this.handleGoToEditUser.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.navigation.getParam("content", {});
		var currentEvent = this.props.navigation.getParam("currentEvent", {});
		this.state.currentUser = currentUser;
		this.state.currentEvent = currentEvent;
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener("didFocus", () => {
			Api.pot.getDetails(this.state.currentEvent.id)
				.then(response => {
					switch (response.status) {
						case "success":
							let end_date = moment(response.content.end_at, "DD/MM/YYYY").hours(23).minutes(59);
							let showPot = moment().isAfter(end_date);
							let days_left = Math.floor(moment.duration(end_date.diff(moment())).asDays());
							var messages = response.content.messages !== undefined ? response.content.messages : [];
							this.setState({ potDetails: response.content, messages, days_left, showPot });
							break;
						case "error":
							console.log(response);
							break;
						default:
							console.log(response);
							break;
					}
				})
		});
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	renderItem({ item, index }) {
		return (
			<View key={index} style={Styles.messageItem}>
				<View style={Styles.messageAuthorPicture}>
					<Avatar
						style={Styles.avatar}
						initials={item.author.initials}
						height={Metrics.screenWidth * 0.1}
						width={Metrics.screenWidth * 0.1} />
				</View>
				<View style={Styles.messageContent}>
					<View style={Styles.messageHeader}>
						<Text>{item.author.name}</Text>
						<Text style={Styles.messageAmount}> • </Text>
						<Text style={Styles.messageAmount}>{item.amount + " €"}</Text>
					</View>
					<View style={Styles.messageBubble}>
						<View style={Styles.messageText}>
							<Text>{item.message}</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}

	handleAddBankInfo() {
		this.props.navigation.navigate("AddBankInfo", { content: this.state.currentUser, currentEvent: this.state.currentEvent, pot: this.state.potDetails });
	}

  handleParticipate() {
		if(this.state.potDetails.enabled){
			this.props.navigation.navigate("PotContribution", { content: this.state.currentUser, currentEvent: this.state.currentEvent, pot: this.state.potDetails });
		}
		else{
			Alert.alert(I18n.t("disabled_pot_alert_title"), I18n.t("disabled_pot_alert_body"));
		}
	}

	handleGoToEditUser(){
		this.props.navigation.navigate("EditUser", {content: this.state.currentUser, currentEvent: this.state.currentEvent})
	}

	render() {
		return (
			<View style={Styles.container}>
				<Header title={I18n.t("pot_title")} onMenuPressed={() => { this.setState({ drawerIsOpen: !this.state.drawerIsOpen }) }} />
				<Drawer onChangeEvent={(item) => {
					this.props.navigation.replace("GuestsList", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
				}}
					isOpen={this.state.drawerIsOpen} bind={this} />
				<ScrollView style={Styles.scrollView}>
					<View style={Styles.potHeader}>
						<Text style={Styles.potTitle}>{this.state.currentEvent.name}</Text>
						<Text style={Styles.potDescription}>{this.state.potDetails.description}</Text>
					</View>
					<View style={Styles.potData}>

						<View style={[Styles.potDataDetails, Styles.potParticipating]}>
							<Image source={Images.icons.participating_icon} style={Styles.detailsIcon} resizeMode={"contain"} />
							<View style={Styles.participatingDetails}>
								<Text style={Styles.potDetailsNumbers}>{this.state.potDetails.participants_number}</Text>
								<Text style={Styles.potDetailsTitle}>{I18n.t("participating")}</Text>
							</View>
						</View>
						{this.state.showPot ?
							<View style={[Styles.potDataDetails, Styles.potParticipating]}>
								<Image source={Images.icons.pot_total} style={Styles.detailsIcon} resizeMode={"contain"} />
								<View style={Styles.participatingDetails}>
									<Text style={Styles.potDetailsNumbers}>{this.state.potDetails.total_amount}</Text>
									<Text style={Styles.potDetailsTitle}>{I18n.t("gathered")}</Text>
								</View>
							</View>
							:
							<View style={[Styles.potDataDetails, Styles.potTimeLeft]}>
								<Image source={Images.icons.date_picker_icon} style={Styles.detailsIcon} resizeMode={"contain"} />
								<View style={Styles.timeLeftDetails}>
									<Text style={Styles.potDetailsNumbers}>{this.state.days_left}</Text>
									<Text style={Styles.potDetailsTitle}>{I18n.t(this.state.days_left >= 1? "days_left_single" : "days_left")}</Text>
								</View>
							</View>
						}
					</View>
					{this.state.showPot === true && this.state.currentEvent.role === "owner" && this.state.potDetails.bank_information === false &&
						<TouchableOpacity
							onPress={this.handleAddBankInfo}
							style={Styles.buttonContainer}>
							<LinearGradient
								colors={["#547FFA", "#82ABFB"]}
								start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
								style={Styles.buttonParticipate}>
								<Text style={Styles.buttonText}>{I18n.t("pot_transfer_funds")}</Text>
							</LinearGradient>
						</TouchableOpacity>
					}
					{(this.state.showPot && this.state.currentEvent.role === "owner") &&
						<View style={Styles.messagesTitleContainer}>
							<Text style={Styles.messagesTitle}>{I18n.t("messages_title")}<Text style={Styles.messagesAmount}>({this.state.messages.length})</Text></Text>
						</View>
					}
					{this.state.showPot &&
						this.state.messages.map((item, index) => this.renderItem({ item, index }))
					}
					{((this.state.potDetails.enabled !== null && !this.state.potDetails.enabled) && this.state.currentEvent.role == "owner") &&
						[
							<Text key={"explain"} style={Styles.explainText}>{I18n.t("pot_activate_explain")}</Text>,
							<TouchableOpacity
							key={"activate"}
							onPress={this.handleGoToEditUser}
							style={[Styles.buttonContainer]}>
							<LinearGradient
								colors={["#547FFA", "#82ABFB"]}
								start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
								style={Styles.buttonParticipate}>
								<Text style={Styles.buttonText}>{I18n.t("pot_activate_button")}</Text>
							</LinearGradient>
						</TouchableOpacity>]}
					{(!this.state.showPot && this.state.currentEvent.role !== "owner") &&
						<TouchableOpacity
							ref={"participate"}
							onPress={this.handleParticipate}
							style={[Styles.buttonContainer]}>
							<LinearGradient
								colors={this.state.potDetails.enabled ? ["#547FFA", "#82ABFB"] :  ["#DFDFDF", "#DFDFDF"]}
								start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
								style={[Styles.buttonParticipate, this.state.potDetails.enabled ? null : Styles.disabledButtonParticipate]}>
								<Text style={Styles.buttonText}>{I18n.t("pot_participate_button")}</Text>
							</LinearGradient>
						</TouchableOpacity>
					}
				</ScrollView>
			</View>
		)
	}
}

export default PotContainer;
