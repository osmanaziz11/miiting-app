import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, Picker, Switch, Image, ActionSheetIOS, Platform, Alert, AsyncStorage } from "react-native";
import Styles from "./Styles/CreateEventStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import Images from "../Themes/Images";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from 'react-native-modal-datetime-picker';
import LoginLink from "../Components/LoginLink";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import AppConfig from "../Config/Appconfig";
import Metrics from "../Themes/Metrics";
import GooglePlacesInput from "../Components/GooglePlacesInput";
import Advert from "../Components/Advert";

class CreateEventContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			event_name: "",
			event_kind: "",
			event_date: "",
			event_time: "",
			event_kind_id: 1,
			event_photo: "",
			event_place: null,
			pickerVisible: false,
			isDatePickerVisible: false,
			isTimePickerVisible: false,
			kinds: [],
			err_name: false,
			err_kind: false,
			err_date: false,
			err_time: false,
			err_photo: false,
			disabled: false,
			bachelorParty: true,
			bacheloretteParty: false,
			advertOpen: true,
		}

		this.validate = this.validate.bind(this);
		this.handleCreateEvent = this.handleCreateEvent.bind(this);
		this.focus = this.focus.bind(this);
		this.handleAddPhoto = this.handleAddPhoto.bind(this);
		this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
		this.navigation = this.props.navigation;
	}

	componentDidMount() {
		Api.getEventKinds()
			.then(response => {
				this.setState({ kinds: response.content, event_kind: response.content[0].name, event_kind_id: response.content[0].id })
			})
	}

	componentDidUpdate() {
		const place = this.props.navigation.state.params.event_place;
		if (place !== undefined) {
			if (this.state.event_place == null || this.state.event_place != place)  {
				this.state.event_place = place;
				this.forceUpdate();
			}
		}
	}

	focus(e) {
		this.refs[e].focus();
	}

	setPickerVisible(bool) {
		this.setState({ pickerVisible: bool })
	}

	_showDatePicker = () => this.setState({ isDatePickerVisible: true });

	_hideDatePicker = () => this.setState({ isDatePickerVisible: false });

	_handleDatePicked = (date) => {
		var day = this.addZero(date.getDate());
		var month = this.addZero(date.getMonth() + 1);
		var year = this.addZero(date.getFullYear());
		var datePicked = `${day}/${month}/${year}`;
		this.setState({ event_date: datePicked });
		this._hideDatePicker();
	};

	_showTimePicker = () => this.setState({ isTimePickerVisible: true });

	_hideTimePicker = () => this.setState({ isTimePickerVisible: false });

	_handleTimePicked = (date) => {
		var hours = this.addZero(date.getHours());
		var minutes = this.addZero(date.getMinutes());
		var timePicked = `${hours}:${minutes}`
		this.setState({ event_time: timePicked });
		this._hideTimePicker();
	};

	addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	_handlePickerIOS() {
		var options = [];
		var ids = [];
		Api.getEventKinds()
			.then(response => {
				var content = response.content;
				for (var i in content) {
					options.push(content[i].name);
					ids.push(content[i].id)
				}
				options.unshift('Cancel');
				ids.unshift('Cancel');
				ActionSheetIOS.showActionSheetWithOptions({
					options: options,
					cancelButtonIndex: 0,
				},
					(buttonIndex) => {
						if (buttonIndex === 0) {
							this.setState({ pickerVisible: false })
						} else {
							console.log(parseInt(ids[buttonIndex]))
							this.setState({ pickerVisible: false, event_kind: options[buttonIndex], event_kind_id: parseInt(ids[buttonIndex]) })
						}
					})
			})
	}

	_handlePickerANDROID() {
		if (!this.state.pickerVisible) {
			var kinds = this.state.kinds;
			var options = [];
			for (var i in kinds) {
				options.push(<Picker.Item key={kinds[i].id} label={kinds[i].name} value={kinds[i].name} />)
			}
			return (
				<Picker
					selectedValue={this.state.event_kind}
					style={Styles.picker}
					onValueChange={(itemValue, itemIndex) => this.setState({ event_kind: itemValue, event_kind_id: parseInt(this.state.kinds[itemIndex].id), pickerVisible: false })}
					mode={"dropdown"}>
					{options}
				</Picker>
			)
		}
	}

	validateName() {
		return this.state.event_name.length <= 0;
	}

	validateKind() {
		this.state.event_kind.length <= 0
	}

	validateDate() {
		return this.state.event_date.length <= 0;
	}

	validateTime() {
		return this.state.event_time.length <= 0;
	}

	validate() {
		var isFormValid = true;
		// Event name validation
		if (this.validateName()) {
			this.setState({ err_name: true })
			isFormValid = false;
		}

		// Event type validation
		if (this.validateKind()) {
			this.setState({ err_kind: true })
			isFormValid = false;
		}

		// Event date validation
		let date = this.state.event_date.split('/');
		let day = parseInt(date[0]);
		let month = parseInt(date[1]);
		let year = parseInt(date[2]);

		if (this.validateDate()) {
			// Alert.alert(I18n.t("create_event_title"), I18n.t("input_event_date_error"));
			this.setState({ err_date: true })
			isFormValid = false;
		} else if (day <= 0 || day > 31) {
			this.setState({ err_date: true })
			isFormValid = false;
		} else if (month <= 0 || month > 12) {
			this.setState({ err_date: true })
			isFormValid = false;
		} else if (year <= 2017 /* ? */ || year > 5000) {
			this.setState({ err_date: true })
			isFormValid = false;
		}

		// Event time validation

		let time = this.state.event_time.split(':');
		let hour = parseInt(time[0]);
		let minute = parseInt(time[1]);

		if (this.validateTime()) {
			// Alert.alert(I18n.t("create_event_title"), I18n.t("input_event_time_error"));
			this.setState({ err_time: true })
			isFormValid = false;
		} else if (hour > 24) {
			this.setState({ err_time: true })
			isFormValid = false;
		} else if (minute > 59) {
			this.setState({ err_time: true })
			isFormValid = false;
		}

		// if (this.state.event_photo.length === 0) {
		//     Alert.alert(I18n.t("create_event_title"), I18n.t("no_photo_event"));
		//     isFormValid = false;
		// }

		return isFormValid;
	}

	handleCreateEvent() {
		if (this.validate()) {
			this.setState({ disabled: true });
			Api.createEvent({
				name: this.state.event_name.trim(),
				kind: this.state.event_kind_id,
				date: this.state.event_date,
				time: this.state.event_time,
				photo: this.state.event_photo,
				evg: this.state.bachelorParty,
				evjf: this.state.bacheloretteParty,
				address: this.state.event_place,
			}).then(response => {
				switch (response.status) {
					case "success":
						console.log("Event successfully created");
						let currentUser = this.navigation.state.params.currentUser;
						if(currentUser !== null) currentUser.events.push(response.content);
						if(this.isUserLoggedIn()){
							this.props.navigation.replace("EventSuccess", { currentEvent: response.content, currentUser })
						}else{
							this.props.navigation.replace("Register", { currentEvent: response.content, is_creating_event: true })
						}
						AsyncStorage.setItem("@savedEvent:id", response.content.id);
						break;
					case "error":
						this.setState({ disabled: false });
						Alert.alert(I18n.t("create_event_title"), I18n.t(response.message))
						break;
					default:
						this.setState({ disabled: false });
						Alert.alert(I18n.t("create_event_title"), I18n.t("unknown_error"));
						break;
				}
			})
		}
	}

	isUserLoggedIn() {
		return this.navigation.state.params.currentUser !== null ? true : false;
	}

	handleAddPhoto() {
		if (this.state.event_photo === "") {
			ImagePicker.openPicker({
				width: 1125,
				height: 731,
				includeBase64: true,
				cropperToolbarColor: "#547FFA",
				cropping: true
			}).then(response => {
				if (response.data) {
					this.setState({ event_photo: response.data })
				}
			});
		} else {
			this.setState({ event_photo: "", err_photo: true });
		}
	}

	formatImageUrl(imageUrl) {
		if (imageUrl == "") {
			return (imageUrl);
		}
		return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
	}

	formatAddressToDisplay(place){
		let result = "";
		if(place.address !== null){
			result += place.address + ", ";
		}
		if(place.city !== null){
			result += place.city + ", ";
		}
		if(place.country !== null){
			result += place.country;
		}
		return result;
	}

	render() {
		return (
			<View style={Styles.container}>
				<Header title={I18n.t("header_create_event")} onBackPressed={() => { this.navigation.goBack() }} />
				{this.isUserLoggedIn() && [
					<Advert
						key={"1"}
						adType={"banner"}
						onClose={() => { this.setState({ advertOpen: false }) }}
						isOpen={this.state.advertOpen}
						screenLocation={"create_event"}
						eventType={null} />,
					<Advert
						key={"2"}
						adType={"popup"}
						onClose={() => { this.setState({ advertOpen: false }) }}
						isOpen={this.state.advertOpen}
						screenLocation={"create_event"}
						eventType={null} />
				]}
				<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} keyboardDismissMode="on-drag" style={Styles.scrollView}>
					<View style={Styles.form}>
						<Text style={Styles.textInputLabel}>{I18n.t("create_event_name_label")}</Text>
						<View
							style={Styles.textInputContainer}>
							<TextInput
								ref={"inputEventName"}
								autoCapitalize={"sentences"}
								autoCorrect={false}
								underlineColorAndroid={"transparent"}
								returnKeyType={"next"}
								placeholder={this.state.err_name ? I18n.t("input_event_name_error") : I18n.t("create_event_name")}
								placeholderTextColor={this.state.err_name ? "#ed4949" : "#8a91a1"}
								onChangeText={value => { this.setState({ event_name: value }) }}
								style={this.validateName() ? this.state.err_name ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput} />
							<Image style={Styles.validateImg} source={this.validateName() ? this.state.err_name ? Images.icons.invalid : null : Images.icons.valid} />
						</View>
						<Text style={Styles.textInputLabel}>{I18n.t("create_event_kind_label")}</Text>
						<View
							style={Styles.textInputContainer}>
							{Platform.OS === "ios" ?
								<TouchableOpacity
									onPress={() => {
										this.setPickerVisible(true),
											this._handlePickerIOS()
									}}>
									<Text style={Styles.modalToggle}>{this.state.event_kind}</Text>
								</TouchableOpacity>
								: this._handlePickerANDROID()}
						</View>
						{this.state.event_kind === "Mariage" &&
							<View style={Styles.bachelorsButtons}>
								<View style={Styles.bachelorButton}>
									<Text style={Styles.bachelorPartyLabels}>{I18n.t("bachelor_party")}</Text>
									<Switch value={this.state.bachelorParty} onValueChange={() => this.setState({ bachelorParty: !this.state.bachelorParty })} tintColor={"#CFD3D7"} thumbTintColor={"#FFFFFF"} onTintColor={"#527afe"}></Switch>
								</View>
								<View style={Styles.bachelorButton}>
									<Text style={Styles.bachelorPartyLabels}>{I18n.t("bachelorette_party")}</Text>
									<Switch value={this.state.bacheloretteParty} onValueChange={() => this.setState({ bacheloretteParty: !this.state.bacheloretteParty })} tintColor={"#CFD3D7"} thumbTintColor={"#FFFFFF"} onTintColor={"#527afe"}></Switch>
								</View>
							</View>
						}
						<Text style={Styles.textInputLabel}>{I18n.t("create_event_date_label")}</Text>
						<View
							style={this.validateDate() ? this.state.err_date ? [Styles.textInputContainer, Styles.errorTextInput] : Styles.textInputContainer : Styles.textInputContainer}>
							<TouchableOpacity onPress={this._showDatePicker} style={Styles.pickers}>
								<View containerStyle={this.validateDate() ? this.state.err_date ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput}>
									<Text style={this.validateDate() ? this.state.err_date ? Styles.errorTextInputText : null : null}>{this.state.event_date.length <= 0 ? "Choisissez une date" : this.state.event_date}</Text>
								</View>
								<Image source={Images.icons.date_picker_icon} style={Styles.pickers_icons} resizeMode={"contain"} />
							</TouchableOpacity>
							<DateTimePicker
								isVisible={this.state.isDatePickerVisible}
								onConfirm={this._handleDatePicked}
								onCancel={this._hideDatePicker}
								minimumDate={new Date()}
								mode={"date"}
								cancelTextIOS={I18n.t("datetime_picker_cancel_text")}
								confirmTextIOS={I18n.t("datetime_picker_confirm_text")}
								titleIOS={I18n.t("modal_title_date_picker")} />
						</View>
						<Text style={Styles.textInputLabel}>{I18n.t("create_event_hour_label")}</Text>
						<View
							style={this.validateTime() ? this.state.err_time ? [Styles.textInputContainer, Styles.errorTextInput] : Styles.textInputContainer : Styles.textInputContainer}>
							<TouchableOpacity onPress={this._showTimePicker} style={Styles.pickers}>
								<View containerStyle={this.validateTime() ? this.state.err_time ? [Styles.textInput, Styles.errorTextInput] : Styles.textInput : Styles.textInput}>
									<Text style={this.validateTime() ? this.state.err_time ? Styles.errorTextInputText : null : null}>{this.state.event_time.length <= 0 ? "Choisissez une heure" : this.state.event_time}</Text>
								</View>
								<Image source={Images.icons.time_picker_icon} style={Styles.pickers_icons} resizeMode={"contain"} />
							</TouchableOpacity>
							<DateTimePicker
								isVisible={this.state.isTimePickerVisible}
								onConfirm={this._handleTimePicked}
								onCancel={this._hideTimePicker}
								mode={"time"}
								cancelTextIOS={I18n.t("datetime_picker_cancel_text")}
								confirmTextIOS={I18n.t("datetime_picker_confirm_text")}
								titleIOS={I18n.t("modal_title_time_picker")} />
						</View>
						<Text style={Styles.textInputLabel}>{I18n.t("create_event_place_label")}</Text>
						<View style={Styles.textInputContainer}>
							<TouchableOpacity style={Styles.pickers} onPress={() => {
								this.props.navigation.navigate("PickRestaurant", { event_type: this.state.event_kind, route: "CreateEvent" })
							}}>
								<Text numberOfLines={1} containerStyle={Styles.textInput}>{this.state.event_place !== null ? this.formatAddressToDisplay(this.state.event_place): I18n.t("choose_place_placeholder")}</Text>
								<Image source={Images.icons.location} style={Styles.pickers_icons} resizeMode={"contain"} />
							</TouchableOpacity>
						</View>
						{this.state.event_place !== null &&
							<TouchableOpacity
								style={Styles.clearAdressButtonContainer}
								onPress={()=>{
									this.props.navigation.state.params.event_place = undefined;
									this.setState({event_place: null}, () => console.log(this.state));
								}}>
								<Text style={Styles.clearAdressButtonText}>{I18n.t("clear_adress_label")}</Text>
							</TouchableOpacity>}
						<View style={Styles.addPhotoContainer}>
							{this.state.event_photo.length > 0 ?
								<View style={Styles.eventPhotoPreview}>
									<Image source={{ uri: this.formatImageUrl("data:image/jpeg;base64," + this.state.event_photo) }} style={Styles.eventPhotoPreviewImg} resizeMode={"cover"} />
									<TouchableOpacity
										onPress={() => { this.setState({ event_photo: "" }) }}
										style={Styles.removeImageButtonContainer}>
										<Image source={Images.icons.cancel} style={Styles.removeImageButtonIcon} />
									</TouchableOpacity>
								</View>
								:
								<View style={Styles.buttonContainer}>
									<TouchableOpacity
										onPress={this.handleAddPhoto}
										style={Styles.addPhotoButton}>
										<Image source={Images.icons.plus_icon} style={Styles.addPhotoImg} />
									</TouchableOpacity>
									<Text style={Styles.addPhotoText}>{I18n.t("add_photo_event")}</Text>
								</View>
							}
						</View>
						<TouchableOpacity
							ref={"buttonSubmit"}
							onPress={this.handleCreateEvent}
							disabled={this.state.disabled}>
							<LinearGradient
								colors={["#527afe", "#7fa8fe"]}
								start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
								style={Styles.buttonSubmit}>
								<Text style={Styles.buttonText}>{I18n.t("create_event_button")}</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

export default CreateEventContainer;
