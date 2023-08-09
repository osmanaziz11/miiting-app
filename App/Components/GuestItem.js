import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Picker, ActionSheetIOS, Platform, Alert, Image } from "react-native";
import AppConfig from "../Config/Appconfig";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import Avatar from "./Avatar";
import { I18n } from "../Lib";
import Styles from "./Styles/GuestItemStyles";
import Api from "../Config/Apiconfig";

class GuestItem extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			companionsVisible: false,
			options: [],
		}
		this.renderCompanions = this.renderCompanions.bind(this);
		this._handlePickerIOS = this._handlePickerIOS.bind(this);
		this.getPickerOptions = this.getPickerOptions.bind(this);
		this.removeGuestFromEvent = this.removeGuestFromEvent.bind(this);
		this.toggleRole = this.toggleRole.bind(this);
		this.toggleAttending = this.toggleAttending.bind(this);

	}

	getPickerOptions(){
		let options = [];
		options.push({id: 0, action: ()=>{}, name: I18n.t("cancel")});
		let user_role = this.props.event.role;
		let event_kind = this.props.event.kind.name;
		let isCurrentUser = this.props.userID === this.props.guest.user_id;
		if(user_role == "owner"){
			options.push({
				action: this.removeGuestFromEvent,
				name: I18n.t("guestitem_remove_from_event")
			});
			options.push({
				action: ()=>{this.toggleRole("owner")},
				name: this.props.guest.role === "owner" ? I18n.t("guestitem_demote_guest_option") : I18n.t("guestitem_promote_owner_option")
			});

			if(event_kind == "Mariage"){
				options.push({
					action: ()=>{this.toggleRole("evg_org")},
					name: this.props.guest.role === "evg_org" ? I18n.t("guestitem_demote_from_evg_org_option") : I18n.t("guestitem_promote_evg_org_option")
				});
				options.push({
					action: ()=>{this.toggleRole("evjf_org")},
					name: this.props.guest.role === "evjf_org" ? I18n.t("guestitem_demote_from_evjf_org_option") : I18n.t("guestitem_promote_evjf_org_option")
				});
			}

		}else if(user_role === "evg_org" && event_kind == "Mariage"){
			if(["evg_member", "guest"].includes(this.props.guest.role)){
				options.push({
					action: ()=>{this.toggleRole("evg_member")},
					name: this.props.guest.role === "evg_member" ? I18n.t("guestitem_demote_from_evg_member_option") : I18n.t("guestitem_promote_evg_member_option")
				})
			}

		}else if(user_role === "evjf_org" && event_kind == "Mariage"){
			if(["evjf_member", "guest"].includes(this.props.guest.role)){
				options.push({
					action: ()=>{this.toggleRole("evjf_member")},
					name: this.props.guest.role === "evjf_member" ? I18n.t("guestitem_demote_from_evjf_member_option") : I18n.t("guestitem_promote_evjf_member_option")
				})
			}
		}

		if(isCurrentUser){
			options.push({
				action: this.toggleAttending,
				name: this.props.guest.is_coming? I18n.t("no_longer_attend") : I18n.t("start_attend")
			})
		}

		return options;
	}


	promptConfirm(body, callback){
		Alert.alert(
			I18n.t("guestitem_confirm_title"),
			I18n.t(body).replace("%NAME%", this.props.guest.firstname),
			[
				{
					text: I18n.t("guestitem_confirm_ok"),
					onPress: callback
				},
				{
					text: I18n.t("guestitem_confirm_cancel"),
					onPress: () => { console.log("User canceled action: ", body) },
					style: "cancel"
				},
			],
			{cancelable: true}
		)
	}

	removeGuestFromEvent(){
		this.promptConfirm("guestitem_confirm_message_remove_from_event", () => {
			Api.removeGuestFromEvent(this.props.event.id, this.props.guest.user_id).then(response => {
				switch (response.status) {
					case "success":
						if(this.props.onDeleteGuest) this.props.onDeleteGuest();
						break;
					case "error":
						Alert.alert(I18n.t("guestitem_error_title"), I18n.t(response.message))
						break;
					default:
				}
			})
		});
	}

	toggleRole(role){
		let hasRole = this.props.guest.role == role;
		this.promptConfirm("guestitem_confirm_message_" + role + (hasRole ? "_remove" : ""), () => {
			Api.manageUser(this.props.event.id, this.props.guest.user_id, hasRole ? "demote" : "promote", role).then(response => {
				switch (response.status) {
					case "success":
						this.props.guest.role = hasRole ? "guest" : role;
						this.forceUpdate();
						if(Platform.OS === "android" && this.props.onUpdateGuest){
							this.props.onUpdateGuest();
						}
						break;
					case "error":
						if(response.message && response.message.length > 0){
							Alert.alert(I18n.t("guestitem_error_title"), I18n.t(response.message));
						}else{
							Alert.alert(I18n.t("guestitem_error_title"), I18n.t("unknown_error"));
						}
					default:

				}
			});
		});
	}

	toggleAttending(){
		let isAttending = this.props.guest.is_coming;
		this.promptConfirm("guestitem_confirm_message_is_attending" + (isAttending ? "_remove" : ""), () => {
			Api.changeAttendingStatus(this.props.event.id, !isAttending).then(response => {
				switch (response.status) {
					case "success":
						this.props.guest.is_coming = !isAttending;
						this.forceUpdate();
						break;
					case "error":
						Alert.alert(I18n.t("guestitem_error_title"), I18n.t(response.message))
					default:
				}
			})
		});
	}

	formatImageUrl(imageUrl){
    return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
  }

	_handlePickerIOS() {
		let picker_options = this.getPickerOptions();
		var picker_labels = picker_options.map(item => item.name);
		ActionSheetIOS.showActionSheetWithOptions({
			options: picker_labels,
			cancelButtonIndex: 0,
			title: this.props.guest.name,
			message: I18n.t("role_" + this.props.guest.role)
		}, index => {
			picker_options[index].action();
		});
	}

	renderCompanions() {
		const guest = this.props.guest;
		return guest.companions.map((companion, key) =>
			<View key={key} style={Styles.companion}>
				<Avatar
					style={Styles.avatar}
					initials={companion.initials}
					height={Metrics.screenWidth * 0.08}
					width={Metrics.screenWidth * 0.08} />
				<Text>{companion.name}</Text>
			</View>
		)
	}

	render() {
		const guest = this.props.guest;
		const currentUserRole = this.props.event ? this.props.event.role : null;
		const isOwnEvent = this.props.event ? this.props.event.role == "owner" : null;
		return (
			<View
				style={Styles.container}>
				<TouchableOpacity
					onPress={()=>{
						this.setState({ companionsVisible: !this.state.companionsVisible });
						if(this.props.onPress) this.props.onPress(guest);
					}}
					style={Styles.mainGuestContainer}>
					<Avatar
						touchable
						style={Styles.avatar}
						source={guest.picture}
						initials={guest.initials}
						height={Metrics.screenWidth * 0.106}
						width={Metrics.screenWidth * 0.106} />
					<View style={Styles.mainGuestTextContainer}>
						<View style={Styles.mainGuestNameContainer}>
							<Text style={Styles.mainGuestName} numberOfLines={1}>{guest.name}</Text>
							{!this.props.chat && guest.companions.length > 0 &&
								<Text style={Styles.mainGuestCompanionsText}>{" " + I18n.t("and") + " " + guest.companions.length + " " + (guest.companions.length == 1 ? I18n.t("other_single") : I18n.t("other_several"))}</Text>}

						</View>
						{!this.props.chat && <Text style={Styles.attendingText}>{I18n.t((guest.is_coming ? "" : "not_") + (isOwnEvent ? "attending_yours_text" + (guest.companions.length > 0 ? "_several" : "_single") : "attending_text" + (guest.companions.length > 0 ? "_several" : "_single")))}</Text>}
						{this.props.rating &&
							<Text style={Styles.attendingText}>{I18n.t("rating_item_value").replace("%VALUE%", this.props.rating)}</Text>}
					</View>
				</TouchableOpacity>
				{!this.props.chat && guest.companions.length > 0 && this.state.companionsVisible &&
					<View style={Styles.companionsContainer}>
						{this.renderCompanions()}
					</View>}
				{!this.props.chat && (["owner", "evg_org", "evjf_org"].includes(currentUserRole) || (currentUserRole !== "owner" && this.props.userID == this.props.guest.user_id)) &&
					(Platform.OS === "ios" ?
						<TouchableOpacity onPress={this._handlePickerIOS} style={Styles.showContextMenuButton}>
							<Image source={Images.icons.context_menu} style={Styles.contextMenuIcon} resizeMode={"contain"}/>
						</TouchableOpacity>
						:
						<View style={Styles.showContextMenuButton}>
							<Picker
								style={Styles.picker}
								onValueChange={(value, index) => {value()}}
								mode={"dropdown"}>
								{this.getPickerOptions().map((option, index) => <Picker.Item key={index} label={option.name} value={option.action}/>)}
							</Picker>
						</View>
					)
				}
			</View>
		)
	}
}

export default GuestItem;
