import React, { Component } from "react";
import { Text, View, TextInput, Keyboard, TouchableOpacity, Alert, Image } from "react-native";
import Styles from "./Styles/PotContributionStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import LinearGradient from "../../node_modules/react-native-linear-gradient";
import ElevatedView from "react-native-elevated-view";
import Api from "../Config/Apiconfig";
import AppConfig from "../Config/Appconfig";
import Images from "../Themes/Images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MonthPicker from "react-native-picker";
import moment from "moment";
const stripe = require("stripe-client")(AppConfig.stripePublicKey);
import MiitingLoader from "../Components/MiitingLoader";

class PotContributionContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerIsOpen: false,
			currentEvent: null,
			currentUser: null,
			message: "",
			amount: 0,
			monthPickerData: [],
			exp_month: null,
			exp_year: null,
			expDateDisplay: null,
			monthPickerSelectedValue: null,
			number: "",
			cvc: "",
			is_loading: false,
		};
		this.showMonthPicker = this.showMonthPicker.bind(this);
		this.getMonthPickerData = this.getMonthPickerData.bind(this);
		this.monthPickerSelectHandler = this.monthPickerSelectHandler.bind(this);
		this.addCard = this.addCard.bind(this);
		this.handleParticipate = this.handleParticipate.bind(this);
		this.getStripeToken = this.getStripeToken.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.navigation.getParam("content", {});
		var currentEvent = this.props.navigation.getParam("currentEvent", {});
		this.state.currentUser = currentUser;
		this.state.currentEvent = currentEvent;
	}

	componentDidMount() {
		let pickerData = this.getMonthPickerData();
		this.setState({ monthPickerData: pickerData });
	}

	addCard() {
		const { exp_year, exp_month, number, cvc } = this.state;
		let card = {
			exp_year,
			exp_month,
			number,
			cvc,
		};
		this.props.navigation.goBack();
	}

	monthPickerSelectHandler(data) {
		this.setState({
			exp_month: data[0],
			exp_year: data[1],
			expDateDisplay: data[0] + "/" + data[1].substring(2, 4),
			monthPickerSelectedValue: data
		})
	}

	showMonthPicker() {
		MonthPicker.init({
			pickerData: this.state.monthPickerData,
			onPickerConfirm: this.monthPickerSelectHandler,
			isLoop: false,
			pickerConfirmBtnText: I18n.t("month_picker_confirm"),
			pickerCancelBtnText: I18n.t("month_picker_cancel"),
			pickerTitleText: I18n.t("month_picker_title"),
			pickerConfirmBtnColor: [40, 43, 74, 1],
			pickerCancelBtnColor: [120, 120, 120, 1],
			pickerToolBarBg: [248, 248, 248, 1],
			pickerBg: [248, 248, 248, 1],
			selectedValue: this.state.monthPickerSelectedValue !== null ? this.state.monthPickerSelectedValue : [String(moment().month() + 1), String(moment().year())]
		});
		MonthPicker.show();
	}

	getMonthPickerData() {
		let months = [];
		let years = [];
		let currentYear = moment().year();
		let maxYear = currentYear + 50;
		for (var i = 1; i <= 12; i++) {
			if (i < 10) {
				i = "0" + i
			}
			months.push(String(i))
		}
		for (var i = currentYear; i < maxYear; i++) {
			years.push(String(i))
		}
		return [months, years];
	}

	isCvcValid(cvc) {
		return cvc.length >= 3;
	}

	isCardNumberValid(cardNumber) {
		return cardNumber.length >= 12 && cardNumber.length <= 19;
	}

	handleParticipate({ token }) {
		Api.pot.participate({
			msg: this.state.message,
			amount: this.state.amount,
			token,
			id: this.props.navigation.getParam("pot", {}).id
		}).then(response => {
			switch (response.status) {
				case "success":
					Alert.alert(I18n.t("pot_title"), I18n.t("success_pot_participation"));
					this.props.navigation.goBack();
					break;
				case "error":
					Alert.alert(I18n.t("pot_title_error"), response.message);
					break;
				default:
					Alert.alert(I18n.t("pot_title"), I18n.t("unknow_error"));
					break;
			}
			this.setState({is_loading: false})
		});
	}

	getStripeToken() {
		this.setState({is_loading: true})
		const { number, exp_month, exp_year, cvc } = this.state;
		const card = {
			number,
			exp_month,
			exp_year,
			cvc,
		};
		stripe.createToken({ card }).then(response => {
			if (response.id) {
				this.handleParticipate({ token: response.id });
			}else{
				Alert.alert(I18n.t("pot_title"), I18n.t("pot_contribution_invalid"))
				this.setState({is_loading: false});
			}
		}).catch(e => {
			this.setState({is_loading: false})
		})
	}

	render() {
		return (
			<KeyboardAwareScrollView keyboardDismissMode={"on-drag"} keyboardShouldPersistTaps={"never"} style={Styles.container} contentContainerStyle={Styles.scrollView}>
				<LinearGradient
					colors={["#547FFA", "#82ABFB"]}
					start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
					style={Styles.bg}>
					<Header containerStyle={Styles.headerBg} whiteTheme={true} title={I18n.t("pot_contribution_title")} onBackPressed={() => { this.props.navigation.pop() }} />
					<ElevatedView
						elevation={9}
						style={Styles.leaveMessageContainer}>
						<TextInput
							ref={"leaveMessage"}
							multiline
							autoCapitalize={"none"}
							underlineColorAndroid={"transparent"}
							returnKeyType={"next"}
							autoCorrect={false}
							maxLength={1024}
							placeholder={I18n.t("leave_message_text")}
							onChangeText={value => { this.setState({ message: value }) }}
							onSubmitEditing={Keyboard.dismiss}
							style={Styles.leaveMessageInput} />
					</ElevatedView>
				</LinearGradient>

				<Text style={Styles.amountSentence}>{I18n.t("amount_sentence")}</Text>
				<View style={Styles.moneyInputContainer}>
					<TextInput
						multiline={false}
						numberOfLines={1}
						ref={"moneyAmount"}
						placeholder={I18n.t("no_money")}
						placeholderTextColor={"#727888"}
						style={Styles.amountInput}
						autoCapitalize={"none"}
						underlineColorAndroid={"transparent"}
						returnKeyType={"done"}
						keyboardType={"numeric"}
						autoCorrect={false}
						onChangeText={value => { this.setState({ amount: value }) }} />
					<Text style={Styles.currencyIndicator}>{I18n.t("euros_currency")}</Text>
				</View>
				<View style={Styles.addCardForm}>
					<Text style={Styles.label}>{I18n.t("add_card_input_card_number_label")}</Text>
					<View style={Styles.textInputContainer}>
						<TextInput
							style={Styles.textInput}
							keyboardType={"number-pad"}
							returnKeyType={"next"}
							maxLength={19}
							placeholder={I18n.t("add_card_input_card_number_placeholder")}
							placeholderTextColor={"#939399"}
							underlineColorAndroid={"transparent"}
							onChangeText={text => this.setState({ number: text })}
						/>
						{this.state.number.length > 0 &&
							<Image source={this.isCardNumberValid(this.state.number) === true ? Images.icons.valid : Images.icons.invalid} style={Styles.textInputIcon} />
						}
					</View>
					<View style={Styles.expirationDateAndCVCContainer}>
						<View>
							<Text style={Styles.label}>{I18n.t("add_card_input_card_month_picker_label")}</Text>
							<TouchableOpacity onPress={this.showMonthPicker} style={[Styles.picker, Styles.pickerButton]}>
								<Text style={this.state.expDateDisplay === null ? Styles.inputPlaceholder : Styles.inputContentText}>{this.state.expDateDisplay === null ? I18n.t("add_card_month_placeholder") : this.state.expDateDisplay}</Text>
							</TouchableOpacity>
						</View>
						<View>
							<Text style={Styles.label}>{I18n.t("add_card_input_card_cvc_label")}</Text>
							<View onPress={this.showMonthPicker} style={Styles.picker}>
								<TextInput
									style={Styles.textInput}
									keyboardType={"number-pad"}
									returnKeyType={"done"}
									placeholder={I18n.t("add_card_input_card_cvc_placeholder")}
									placeholderTextColor={"#939399"}
									underlineColorAndroid={"transparent"}
									onChangeText={text => this.setState({ cvc: text })}
								/>
								{this.state.cvc.length > 0 &&
									<Image source={this.isCvcValid(this.state.cvc) === true ? Images.icons.valid : Images.icons.invalid} style={Styles.textInputIcon} />
								}
							</View>
						</View>
					</View>
				</View>
				{this.state.is_loading && <MiitingLoader />}
				<TouchableOpacity
					disabled={this.state.is_loading}
					ref={"participate"}
					onPress={this.getStripeToken}
					style={Styles.buttonContainer}>
					<LinearGradient
						colors={["#547FFA", "#82ABFB"]}
						start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
						style={Styles.buttonParticipate}>
						<Text style={Styles.buttonText}>{I18n.t("pot_participate_button")}</Text>
					</LinearGradient>
				</TouchableOpacity>
			</KeyboardAwareScrollView>
		)
	}
}

export default PotContributionContainer;
