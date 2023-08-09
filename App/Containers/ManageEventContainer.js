import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, Picker, Image, ActionSheetIOS, Platform, ScrollView, Switch, Keyboard, Alert, Share } from "react-native";
import Styles from "./Styles/ManageEventStyles";
import Header from "../Components/Header";
import Drawer from "../Components/Drawer";
import Images from "../Themes/Images";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from "react-native-image-crop-picker";
import AppConfig from "../Config/Appconfig";
import ProvidersList from "../Components/ProvidersList";
import QRCode from "react-native-qrcode-svg";
import GooglePlacesInput from "../Components/GooglePlacesInput";
import ViewOverflow from "react-native-view-overflow";
import Metrics from "../Themes/Metrics";

class ManageEventContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerIsOpen: false,
			event_name: "",
			event_kind: "",
			event_date: "",
			event_time: "",
			event_file: "",
			event_place: null,
			event_desc: "",
			isEvg: true,
			isEvjf: true,
			kinds: [],
			pickerVisible: false,
			optionsPickerVisible: false,
			isDatePickerVisible: false,
			isTimePickerVisible: false,
			options: [],
			currentSetting: {},
		};

		this.handleAddPhoto = this.handleAddPhoto.bind(this);
		this.focus = this.focus.bind(this);
		this.handleOptionsPickerIOS = this.handleOptionsPickerIOS.bind(this);
		this.handleEditEvent = this.handleEditEvent.bind(this);
		this.navigation = this.props.navigation;
		this.deleteImg = this.deleteImg.bind(this);
		this.addEvgOption = this.addEvgOption.bind(this);
		this.handleTrigger = this.handleTrigger.bind(this);
		this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
		this.confirmedDeleteEvent = this.confirmedDeleteEvent.bind(this);
		this.handleShareCodeMessage = this.handleShareCodeMessage.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.navigation.getParam("content", {});
		var currentEvent = this.props.navigation.getParam("currentEvent", {});
		console.log(currentEvent)
		this.state.currentUser = currentUser;
		this.state.currentEvent = currentEvent;
		this.state.event_kind = currentEvent.kind.name;
		this.state.event_name = currentEvent.name;
		this.state.event_kind_id = currentEvent.kind.id;
		this.state.event_date = currentEvent.date;
		this.state.event_time = currentEvent.time;
		this.state.event_place = currentEvent.address.latitude !== null ? currentEvent.address : null;
		this.state.event_desc = currentEvent.description;
		this.state.event_file = currentEvent.picture;
		this.state.isEvg = currentEvent.evg;
		this.state.isEvjf = currentEvent.evjf;
	}

	componentDidMount() {
		const options = [
			{
				id: 0,
				name: "Général"
			},
			{
				id: 1,
				name: "Prestataires"
			},
			{
				id: 3,
				name: "Code de l'évènement"
			},
			{
				id: 4,
				name: "Description"
			}
		];
		let currentSetting = {};
		if (this.props.navigation.state.params.settingId) {
			currentSetting = {
				id: this.props.navigation.state.params.settingId,
				name: options.filter(option => option.id == this.props.navigation.state.params.settingId)[0].name,
			}
		} else {
			currentSetting = {
				id: 0,
				name: "Général"
			}
		}
		Api.getEventKinds()
			.then(response => {
				this.setState({ kinds: response.content, currentSetting: currentSetting })
			})

		Api.getProvidersKinds()
			.then(response => {
				switch (response.status) {
					case "success":
						this.setState({ providers_kinds: response.content });
						break;
					case "error":
						break;
					default:
						break;
				}
			});



		this.state.options = options;
		this.state.currentEvent.kind.name === "Mariage" ? this.addEvgOption() : null;
	}

	componentDidUpdate() {
		const place = this.props.navigation.state.params.event_place;
		if (place !== undefined) {
			if (this.state.event_place == null || this.state.event_place !== place) {
				this.state.event_place = place;
				this.forceUpdate();
			}
		}
	}

	addEvgOption() {
		this.state.options.push({
			id: 2,
			name: "EVG / EVJF",
		})
	}

	focus(e) {
		this.refs[e].focus();
	}

	setPickerVisible(bool) {
		this.setState({ pickerVisible: bool })
	}

	setOptionPickerVisible(bool) {
		this.setState({ optionsPickerVisible: bool })
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

	handleOptionsPickerIOS() {
		var options = [];
		var ids = [];
		for (var i in this.state.options) {
			options.push(this.state.options[i].name)
			ids.push(this.state.options[i].id)
		}
		options.unshift('Cancel');
		ids.unshift('Cancel');
		ActionSheetIOS.showActionSheetWithOptions({
			options: options,
			cancelButtonIndex: 0,
		},
			(buttonIndex) => {
				if (buttonIndex == 0) {
					this.setState({ optionsPickerVisible: false })
				} else {
					var currentSetting = {
						id: ids[buttonIndex],
						name: options[buttonIndex]
					}
					this.setState({ optionsPickerVisible: false, currentSetting })
				}
			})
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
					selectedValue={this.state.event_kind.length > 0 ? this.state.event_kind : this.state.currentEvent.kind.name}
					style={Styles.picker}
					onValueChange={(itemValue, itemIndex) => this.setState({ event_kind: itemValue, event_kind_id: parseInt(this.state.kinds[itemIndex].id), pickerVisible: false })}
					mode={"dropdown"}>
					{options}
				</Picker>
			)
		}
	}

	_handleOptionsPickerANDROID() {
		if (!this.state.optionsPickerVisible) {
			var options = this.state.options;
			var settings = [];
			for (var i in options) {
				settings.push(<Picker.Item key={options[i].id} label={options[i].name} value={options[i].name} />)
			}
			return (
				<Picker
					selectedValue={this.state.currentSetting.name}
					style={Styles.picker}
					onValueChange={(itemValue, itemIndex) => this.setState({ currentSetting: { id: this.state.options[itemIndex].id, name: itemValue }, optionsPickerVisible: false })}
					mode={"dropdown"}>
					{settings}
				</Picker>
			)
		}
	}

	handleAddPhoto () {
        if (this.state.event_file === "") {
            ImagePicker.openPicker({
							width: 1125,
							height: 731,
              includeBase64: true,
              cropperToolbarColor: "#547FFA",
              cropping: true
            }).then(response => {
              if (response.data) {
                      this.setState({ event_file: response.data })
                  }
}           );
        } else {
            this.setState({ event_file: "" });
        }
    }

	formatImageUrl(imageUrl) {
		if (imageUrl == "") {
			return (imageUrl);
		}
		return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : "data:image/jpeg;base64," + imageUrl;
	}

	handleEditEvent() {
		Api.editEvent({
			name: this.state.event_name,
			kind: this.state.event_kind_id,
			date: this.state.event_date,
			time: this.state.event_time,
			photo: this.state.event_file,
			address: this.state.event_place,
			description: this.state.event_desc,
			evg: this.state.isEvg,
			evjf: this.state.isEvjf,
		}, this.state.currentEvent.id)
			.then(response => {
				switch (response.status) {
					case "success":
						var old_event_index = this.state.currentUser.events.findIndex((el) => el.id == response.content.id);
						this.state.currentUser.events.splice(old_event_index, 1, response.content);
						Alert.alert(I18n.t("manage_event_title"), I18n.t("edit_event_success"));
						this.props.navigation.state.params.currentEvent = response.content;
						this.setState({ currentEvent: response.content });
						break;
					case "error":
						console.log(response)
						break;
					default:
						console.log(response)
						break;
				}
			})
	}

	handleDeleteEvent(){
		Alert.alert(I18n.t("delete_event_button"), I18n.t("delete_event_confirmation"),
		[
			{text: I18n.t("confirm"), onPress: this.confirmedDeleteEvent, style: "OK"},
			{text: I18n.t("cancel"), onPress: () => {}, style:"cancel"},
		]);
	}

	confirmedDeleteEvent(){
		Api.deleteEvent(this.state.currentEvent.id).then(response => {
			switch (response.status) {
				case "success":
					Alert.alert(I18n.t("delete_event_button"), I18n.t("success_delete_event"))
					this.state.currentUser.events = this.state.currentUser.events.filter(event => event.id != this.state.currentEvent.id);
					if(this.state.currentUser.events.length <=0){
						this.props.navigation.replace("NoEvent", {currentUser: this.state.currentUser, id: null})
					}else{
						this.props.navigation.replace("Dashboard", {content: this.state.currentUser});
					}
					break;
				case "error":
					Alert.alert(I18n.t("delete_event_button"), I18n.t(response.message));
					break;
				default:
					Alert.alert(I18n.t("delete_event_button"), I18n.t("unknown_error"));
			}
		})
	}

	handleTrigger() {
		Api.editEvent({
			name: this.state.event_name,
			kind: this.state.event_kind_id,
			date: this.state.event_date,
			time: this.state.event_time,
			photo: this.state.event_file,
			address: this.state.event_place,
			description: this.state.event_desc,
			evg: this.state.isEvg,
			evjf: this.state.isEvjf
		}, this.state.currentEvent.id)
		.then(response => {
			switch (response.status) {
				case "success":
					var old_event_index = this.state.currentUser.events.findIndex((el) => el.id == response.content.id);
					this.state.currentUser.events.splice(old_event_index, 1, response.content);
					this.props.navigation.state.params.currentEvent.evg = response.content.evg;
					this.props.navigation.state.params.currentEvent.evjf = response.content.evjf;
					break;
				case "error":
					console.log(response)
					break;
				default:
					console.log(response)
					break;
			}
		})
	}

	deleteImg() {
		this.setState({ event_file: "" });
	}

	handleShareCodeMessage(){
		const url = AppConfig.cdnUrl + "/qrcode/" + this.state.currentEvent.qrcode;
		let message = I18n.t("share_code_message")
			.replace("#CODE#", this.state.currentEvent.qrcode)
			.replace("#APP_STORE_URL#", AppConfig.app_store_url)
			.replace("#PLAY_STORE_URL#", AppConfig.play_store_url)
			.replace("#NAME#", this.state.currentUser.firstname)
			.replace("#EVENT#", this.state.currentEvent.name);
		console.log(message)
		Share.share({
			"title" : I18n.t("title_share_code_id"),
			"message" : message,
		});
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
				<Header
					title={I18n.t("manage_event_title")}
					onMenuPressed={() => { this.setState({ drawerIsOpen: !this.state.drawerIsOpen }) }}
					onAddPressed={this.state.currentSetting.id == 1 ? () => { this.props.navigation.navigate("AddProviders", { content: this.state.currentUser, currentEvent: this.state.currentEvent }) } : null}
				/>
				<Drawer onChangeEvent={(item) => {
					this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
				}}
					isOpen={this.state.drawerIsOpen} bind={this} />
				<ScrollView style={Styles.scrollView}>
					<View style={Styles.form}>
						<View style={Styles.textInputContainer}>
							{Platform.OS === "ios" ?
								<TouchableOpacity
									onPress={() => {
										this.setOptionPickerVisible(true),
											this.handleOptionsPickerIOS()
									}}>
									<Text style={Styles.modalToggle}>{this.state.currentSetting.name}</Text>
									<Image source={Images.icons.picker_icon} style={Styles.options_picker_icon} />
								</TouchableOpacity>
								: this._handleOptionsPickerANDROID()}
						</View>
						{this.state.currentSetting.id == 0 &&
							<View style={Styles.form}>
								<View style={Styles.addPhotoContainer}>
									{(this.state.event_file !== null && this.state.event_file.length > 0) ?
										<View style={Styles.eventPhotoPreview}>
											<Image source={{ uri: this.formatImageUrl(this.state.event_file) }} style={Styles.eventPhotoPreviewImg} />
											<TouchableOpacity onPress={this.deleteImg}
												style={Styles.removeImageButtonContainer}>
												<Image source={Images.icons.cancel} style={Styles.removeImageButtonIcon} />
											</TouchableOpacity>
										</View>
										:
											<View style={Styles.buttonContainer}>
												<TouchableOpacity
													onPress={this.handleAddPhoto}
													style={Styles.addPhotoButton}>
													<Image source={Images.icons.plus_icon} style={Styles.addPhotoImg} resizeMode={"cover"} />
												</TouchableOpacity>
												<Text style={Styles.addPhotoText}>{I18n.t("add_photo_event")}</Text>
											</View>
									}
								</View>
								<Text style={Styles.textInputLabel}>{I18n.t("create_event_name_label")}</Text>
								<View
									style={Styles.textInputContainer}>
									<TextInput
										ref={"inputEventName"}
										autoCapitalize={"sentences"}
										autoCorrect={false}
										underlineColorAndroid={"transparent"}
										returnKeyType={"next"}
										placeholder={I18n.t("create_event_name")}
										value={this.state.event_name}
										placeholderTextColor={this.state.err_name ? "#ed4949" : "#8a91a1"}
										onChangeText={value => { this.setState({ event_name: value }) }}
										style={Styles.textInput} />
								</View>
								<Text style={Styles.textInputLabel}>{I18n.t("create_event_kind_label")}</Text>
								<View style={Styles.textInputContainer}>
									{Platform.OS === "ios" ?
										<TouchableOpacity
											onPress={() => {
												this.setPickerVisible(true),
													this._handlePickerIOS()
											}}>
											<Text style={Styles.modalToggle}>{this.state.event_kind}</Text>
											<Image source={Images.icons.picker_icon} style={Styles.options_picker_icon} />
										</TouchableOpacity>
										: this._handlePickerANDROID()}
								</View>
								<Text style={Styles.textInputLabel}>{I18n.t("create_event_date_label")}</Text>
								<View
									style={Styles.textInputContainer}>
									<TouchableOpacity onPress={this._showDatePicker} style={Styles.pickers}>
										<Text containerStyle={Styles.textInput}>{this.state.event_date}</Text>
										<Image source={Images.icons.date_picker_icon} style={Styles.pickers_icons} />
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
									style={Styles.textInputContainer}>
									<TouchableOpacity onPress={this._showTimePicker} style={Styles.pickers}>
										<Text containerStyle={Styles.textInput}>{this.state.event_time}</Text>
										<Image source={Images.icons.time_picker_icon} style={Styles.pickers_icons} />
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
										this.props.navigation.navigate("PickRestaurant", { event_type: this.state.event_kind, route: "ManageEvent" })
									}}>
										<Text containerStyle={Styles.textInput}>{(this.state.event_place !== null) ? this.formatAddressToDisplay(this.state.event_place) : I18n.t("choose_place_placeholder")}</Text>
										<Image source={Images.icons.location} style={Styles.pickers_icons} resizeMode={"contain"}/>
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
								<TouchableOpacity
									ref={"buttonSubmit"}
									onPress={() => {
										this.handleEditEvent()
									}}
									disabled={this.state.disabled}>
									<LinearGradient
										colors={["#527afe", "#7fa8fe"]}
										start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
										style={Styles.buttonSubmit}>
										<Text style={Styles.buttonText}>{I18n.t("save_changes")}</Text>
									</LinearGradient>
								</TouchableOpacity>
								<TouchableOpacity
									style={[Styles.buttonSubmit, Styles.buttonDeleteEvent]}
									ref={"buttonDelete"}
									onPress={this.handleDeleteEvent}
									disabled={this.state.disabled}>
										<Text style={[Styles.buttonText, Styles.buttonDeleteText]}>{I18n.t("delete_event_button")}</Text>
								</TouchableOpacity>
							</View>
						}
						{this.state.currentSetting.id == 1 &&
							<ProvidersList event={this.state.currentEvent} bind={this} />
						}
						{this.state.currentSetting.id == 2 &&
							<View style={Styles.bachelorsButtons}>
								<View style={Styles.bachelorButton}>
									<Text style={Styles.bachelorPartyLabels}>{I18n.t("bachelor_party")}</Text>
									<Switch value={this.state.isEvg} onValueChange={() => this.setState({ isEvg: !this.state.isEvg }, () => this.handleTrigger())} tintColor={"#CFD3D7"} thumbTintColor={"#FFFFFF"} onTintColor={"#527afe"}></Switch>
								</View>
								<View style={Styles.bachelorButton}>
									<Text style={Styles.bachelorPartyLabels}>{I18n.t("bachelorette_party")}</Text>
									<Switch value={this.state.isEvjf} onValueChange={() => this.setState({ isEvjf: !this.state.isEvjf }, () => this.handleTrigger())} tintColor={"#CFD3D7"} thumbTintColor={"#FFFFFF"} onTintColor={"#527afe"}></Switch>
								</View>
							</View>
						}
						{this.state.currentSetting.id == 3 &&
							<View style={Styles.eventCodeContainer}>
								<View style={Styles.cardHeader}>
									<Text style={Styles.cardEventName}>{this.state.currentEvent.name}</Text>
								</View>
								<Text style={Styles.detailsTitle}>QR Code</Text>
								<View style={Styles.qrcodeImg}>
									<TouchableOpacity
										hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
										style={Styles.shareButtonContainer}
										onPress={this.handleShareCodeMessage}>
										<Image style={Styles.shareIcon} resizeMode={"contain"} source={Images.icons.chat_actif}/>
									</TouchableOpacity>
									<QRCode
										value={this.state.currentEvent.qrcodeUrl}
										size={200} />
								</View>
								<ViewOverflow style={Styles.middleBar}>
									<View style={[Styles.circle, Styles.leftCircle]} />
									<View style={[Styles.circle, Styles.rightCircle]} />
								</ViewOverflow>
								<View style={{width: "100%", alignItems: "center", justifyContent: "center"}}>
									<TouchableOpacity
										hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
										style={Styles.shareButtonContainer}
										onPress={this.handleShareCodeMessage}>
										<Image style={Styles.shareIcon} resizeMode={"contain"} source={Images.icons.chat_actif}/>
									</TouchableOpacity>
									<Text style={Styles.detailsTitle}>ID Code</Text>
									<Text style={Styles.IDCode}>{this.state.currentEvent.qrcode}</Text>
								</View>
							</View>
						}
						{this.state.currentSetting.id == 4 &&
							<View style={Styles.eventDescriptionContainer}>
								<View style={Styles.eventDescInputContainer}>
									<TextInput
										ref={"inputEventDesc"}
										autoCapitalize={"sentences"}
										autoCorrect={false}
										multiline
										maxLength={1024}
										value={this.state.event_desc}
										underlineColorAndroid={"transparent"}
										placeholder={I18n.t("change_description")}
										onChangeText={value => { this.setState({ event_desc: value }) }}
										style={Styles.eventDescInput} />
								</View>
								<TouchableOpacity
									ref={"buttonSubmit"}
									onPress={() => {
										this.handleEditEvent()
									}}
									disabled={this.state.disabled}>
									<LinearGradient
										colors={["#527afe", "#7fa8fe"]}
										start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
										style={Styles.buttonSubmit}>
										<Text style={Styles.buttonText}>{I18n.t("save_changes")}</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
						}
					</View>
				</ScrollView>
			</View>
		)
	}
}

export default ManageEventContainer;
