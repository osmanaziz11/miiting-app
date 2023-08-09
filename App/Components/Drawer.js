import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, FlatList, AsyncStorage, Keyboard } from "react-native";
import { I18n } from "../Lib";
import Images from "../Themes/Images.js";
import Styles from "./Styles/DrawerStyles"
import GestureRecognizer from 'react-native-swipe-gestures';
import Swiper from "react-native-swiper";
import LinearGradient from "react-native-linear-gradient";
import AppConfig from "../Config/Appconfig";
import Api from "../Config/Apiconfig";
import EraseButton from "../Components/EraseButton";
import moment from "moment";
import ViewOverflow from "react-native-view-overflow";
import socket from "../Config/SocketConfig";

class Drawer extends Component {

	constructor(props) {
		super(props);
		this.closeModal = this.closeModal.bind(this);
		this.navigate = this.navigate.bind(this);
		this.state = {
			events: [],
			index: 0,
			user: "",
			currentEvent: {
				id: null,
				date: "",
				name: "",
			},
			currentUser: null,
			isActive: false,
			selectedEvent: 0,
			refreshList: false,
		}
		this.handleJoinOrCreate = this.handleJoinOrCreate.bind(this);
		this.renderEvent = this.renderEvent.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.swipeLeft = this.swipeLeft.bind(this);
		this.onLeavePress = this.onLeavePress.bind(this);
		this.checkActive = this.checkActive.bind(this);
		this.isTablePlanAccessible = this.isTablePlanAccessible.bind(this);
	}

	componentDidMount() {
		let params = this.props.bind.props.navigation.state.params;
		var currentUser = params.content ? params.content : params.user;
		var events = params.content.user ? params.content.user.events : params.content.events;
		var firstname = params.content.user ? params.content.user.firstname : params.content.firstname;
		var lastname = params.content.user ? params.content.user.lastname : params.content.lastname;
		var user = `${firstname} ${lastname}`;
		const currentEvent = this.props.bind.state.currentEvent;
		console.log(currentEvent)
		socket.on("message", payload => {
			for(var i in events){
				for(var y in events[i].conversations){
					if(events[i].conversations[y].includes(payload.conversation)){
						events[i].unread = true;
						continue;
					}
				}
				this.setState({events, refreshList: !this.state.refreshList})
			}
		})
		this.setState({ user, events, currentUser, currentEvent });
	}

	closeModal() {
		this.props.bind.setState({ drawerIsOpen: false });
	}

	navigate(route, type, isCurrentPage) {
		if (route != "") {
			let navigator = this.props.bind.props.navigation;
			this.props.bind.setState({ drawerIsOpen: false }, () => {
				if (!isCurrentPage) navigator.replace(route, { content: this.props.bind.props.navigation.getParam("content", {}), currentEvent: this.props.bind.state.currentEvent, chat_type: type });
			});
		} else if (route == "Launch") {
			navigator.popToTop();
		} else {
			Alert.alert(I18n.t("linking_error_title"), I18n.t("coming_soon"));
		}
	}

	putID(id) {
		AsyncStorage.setItem("@savedEvent:id", id, (error) => {
			console.log(error)
		})
	}

	renderEvent({ item, key }) {
		let endDate = moment(item.date, "DD/MM/YYYY");
		let today = moment();
		let eventEndedRecently = endDate.diff(today, 'days') <= 7;
		return (
			<ViewOverflow
				key={key}>
				{item.unread &&
					<View style={Styles.floatingUnreadBubble} />
				}
				<TouchableOpacity
					onPress={() => {
						this.setState({ currentEvent: item }, () => {
							this.closeModal()
							this.putID(item.id)
							this.props.onChangeEvent(item)
						})
					}}
					style={Styles.eventContainer}>
					<Image source={
						(item.picture !== null && item.picture !== undefined) ? { uri: this.formatImageUrl(item.picture) } : Images.default_event_pic
					} style={Styles.event_pic} resizeMode={"cover"} />
					<View style={Styles.eventDescription}>
						<Text style={[Styles.eventText, this.props.bind.state.currentEvent.id == item.id ? Styles.eventTextSelected : null, eventEndedRecently && Styles.eventTextReduced]} numberOfLines={2}>{item.name}</Text>
						<Text style={Styles.eventDate}>{item.date}</Text>
					</View>
					{(eventEndedRecently && item.role !== "owner") &&
						<EraseButton style={Styles.leaveEventButton} isActive={this.state.selectedEvent == item.id} onPress={() => this.onLeavePress(item.id)} />
					}
				</TouchableOpacity>
			</ViewOverflow>
		)
	}

	renderButton(button) {
		let isCurrentPage = this.props.bind.props.navigation.state.routeName == button.route;
		let type = button.type !== undefined ? button.type : "";
		return (
			<TouchableOpacity
				onPress={() => {
					if (button.accessible !== undefined && button.accessible === true) {
						this.navigate(button.route, type);
					} else {
						Alert.alert(button.title, button.message);
					}
				}}
				style={Styles.buttonContainer}>
				<View style={Styles.buttonIconContainer}>
					<Image style={Styles.buttonIcon} resizeMode={"contain"} source={isCurrentPage ? Images.icons[button.icon + "_actif"] : Images.icons[button.icon]} />
				</View>
				<Text numberOfLines={1} style={[Styles.buttonText, isCurrentPage ? Styles.buttonTextActive : null]}>{button.text.toUpperCase()}</Text>
			</TouchableOpacity>
		);
	}

	handleLogout() {
		Api.userLogout().then(response => {
			switch (response.status) {
				case "success":
					AsyncStorage.multiRemove([
						"@login:password",
						"@login:token",
						"@savedEvent:id"
					], (error) => {
						if (error != null) console.error("Error while removing savedLogin", error);
						AsyncStorage.getItem("@push:token", (error, result) => {
							if (!error) Api.tokenRemove(result);
						});
						this.props.bind.props.navigation.replace("Launch");
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

	handleJoinOrCreate() {
		Alert.alert(
			I18n.t("create_or_join"),
			I18n.t("ask_create_or_join"),
			[
				{ text: I18n.t("cancel"), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: I18n.t("header_create_event"), onPress: () => this.props.bind.props.navigation.navigate("CreateEvent", { currentUser: this.props.bind.props.navigation.state.params.content }) },
				{ text: I18n.t("header_join_event"), onPress: () => this.props.bind.props.navigation.navigate("JoinEvent", { currentUser: this.props.bind.props.navigation.state.params.content }) },
			],
			{ cancelable: false }
		)
	}

	formatImageUrl(imageUrl) {
		if (imageUrl == "") {
			return (imageUrl);
		}
		return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
	}

	swipeLeft() {
		this.refs.drawerSwiper.scrollBy(-1, true);
	}

	async checkActive() {
		setTimeout(() => {
			this.setState({ selectedEvent: 0, isActive: false });
		}, 5000);
	}

	onLeavePress(id) {
		id = parseInt(id);
		this.setState({ isActive: true }, this.checkActive);
		this.state.selectedEvent === id ? this.leaveEvent(id) : this.setState({ selectedEvent: id });
	}

	leaveEvent(id) {
		this.setState({ isActive: false, selectedEvent: 0 });
		Api.leaveEvent(id)
			.then(response => {
				switch (response.status) {
					case "success":
						this.state.currentUser.events = this.state.currentUser.events.filter(event => event.id != id);
						if (this.state.currentUser.events.length <= 0) {
							this.props.bind.props.navigation.replace("NoEvent", { currentUser: this.state.currentUser, id: null })
						} else {
							this.props.bind.props.navigation.replace("Dashboard", { content: this.state.currentUser });
						}
						break;
					case "error":
						Alert.alert(I18n.t("leave_event_title"), I18n.t(response.message));
						break;
					default:
						Alert.alert(I18n.t("leave_event_title"), I18n.t("unknown_error"));
						break;
				}
			})
	}

	isTablePlanAccessible() {
		let now = moment();
		const { currentEvent } = this.state;
		const { time, date } =  currentEvent;
		const then = moment(`${date.split("/").reverse().join("-")} ${time}`);
		let diffHours = then.diff(now, "hours");
		return diffHours <= 3;
	}

	render() {
		if (!this.props.isOpen) return null;
		console.log(this.state.currentUser)
		Keyboard.dismiss();
		return (
			<View style={Styles.drawerContainer}>
				<Swiper ref={"drawerSwiper"} containerStyle={Styles.swiper} activeDotStyle={Styles.activeDotStyle} dotStyle={Styles.dotStyle} index={1} scrollEnabled={true} paginationStyle={Styles.pagination} loop={false}>
					<View style={[Styles.container, Styles.firstSlide]}>
						<View style={Styles.drawerHeader}>
							<Text style={Styles.drawerTitle}>{I18n.t("drawer_header_title")}</Text>
						</View>
						<View style={Styles.othersEvents}>
							<Text style={Styles.title}>{I18n.t("events_list").toUpperCase()}</Text>
							<ScrollView style={Styles.flatListScrollView}>
								<FlatList
									inverted
									extraData={this.state.refreshList}
									refreshing={this.state.isActive}
									data={this.state.events}
									renderItem={this.renderEvent}
									keyExtractor={(item, index) => item.id}
									style={Styles.listContainer} />
							</ScrollView>
						</View>
						<View style={Styles.separator}></View>
						<View style={Styles.options}>
							<TouchableOpacity onPress={this.handleJoinOrCreate}>
								<LinearGradient
									colors={["#527afe", "#7fa8fe"]}
									start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
									style={Styles.createOrJoinButton}>
									<Image style={Styles.createOrJoinButtonImage} resizeMode={"contain"} source={Images.icons.plus_icon} />
								</LinearGradient>
							</TouchableOpacity>
							<Text style={Styles.createOrJoinText}>{I18n.t("create_or_join")}</Text>
						</View>
						<View style={Styles.appVersionContainer}><Text style={Styles.appVersionText}>Version {AppConfig.version}</Text></View>
					</View>
					<View style={Styles.container}>
						<View style={Styles.header}>
							<TouchableOpacity onPress={this.swipeLeft} style={Styles.backArrowButton}>
								<Image style={Styles.backArrow} source={Images.icons.icon_back_drawer} />
							</TouchableOpacity>
							{this.props.bind.state.currentEvent.role === "owner" &&
								<TouchableOpacity onPress={() => { this.navigate("ManageEvent", null) }} style={Styles.manageButton}>
									<Image style={Styles.manageIcon} source={Images.icons.manage_event} />
								</TouchableOpacity>
							}
							<Image style={Styles.backgroundEventPic} source={(this.props.bind.state.currentEvent.picture && this.props.bind.state.currentEvent.picture !== null) ? { uri: this.formatImageUrl(this.props.bind.state.currentEvent.picture) } : Images.default_event_pic} />
							<View style={Styles.headerContent}>
								<Text numberOfLines={2} style={Styles.currentEventName}>{this.props.bind.state.currentEvent.name}</Text>
								<Text style={Styles.currentEventDate}>{this.props.bind.state.currentEvent.date}</Text>
							</View>
						</View>
						<ScrollView style={Styles.menu}>
							{this.renderButton({
								icon: "dashboard",
								text: I18n.t("drawer_dashboard_title"),
								route: "Dashboard",
								accessible: true,
							})}
							{["owner", "guest", "evg_org", "evjf_org", "evg_member", "evjf_member"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
									icon: "chat",
									text: I18n.t("drawer_chat_title"),
									route: "ChatGuests",
									type: "guests",
									accessible: true,
								})
							}
							{["owner", "guest", "evg_org", "evjf_org", "evg_member", "evjf_member"].includes(this.props.bind.state.currentEvent.role) && this.state.currentUser.single &&
								this.renderButton({
									icon: "chat",
									text: I18n.t("drawer_chat_single_title"),
									route: "ChatSingle",
									type: "single",
									accessible: true,
								})
							}
							{["owner", "guest", "evg_org", "evjf_org", "evg_member", "evjf_member"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
									icon: "media",
									text: I18n.t("drawer_media_title"),
									route: "MediaFlow",
									accessible: true,
								})}
							{["owner", "guest", "evg_org", "evjf_org", "evg_member", "evjf_member"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
									icon: "provider",
									text: I18n.t("drawer_providers_title"),
									route: "Provider",
									accessible: true,
								})
							}
							{(["mariage", "soirée corporate"].indexOf(this.props.bind.state.currentEvent.kind.name.toLowerCase()) != -1 && this.props.bind.state.currentEvent.role !== "provider") &&
								this.renderButton({
									icon: "seating_plan",
									text: I18n.t("drawer_seating_plan_title"),
									route: "TablePlan",
									accessible: this.isTablePlanAccessible(),
									message: I18n.t("drawer_seating_plan_not_accessible"),
								})
							}
							{!["provider"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
								icon: "pot",
								text: I18n.t("drawer_pot_title"),
								route: "Pot",
								accessible: true,
							})}
							{["owner", "provider"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
									icon: "chat",
									text: I18n.t("drawer_chat_providers_title"),
									route: "ChatProviders",
									type: "providers",
									accessible: true,
								})
							}
							{["evg_org", "evg_member"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
									icon: "chat",
									text: I18n.t("chat_title_evg"),
									route: "ChatProviders",
									type: "evg",
									accessible: true,
								})
							}
							{["evjf_org", "evjf_member"].includes(this.props.bind.state.currentEvent.role) &&
								this.renderButton({
									icon: "chat",
									text: I18n.t("chat_title_evjf"),
									route: "ChatProviders",
									type: "evjf",
									accessible: true,
								})
							}

						</ScrollView>
					</View>
				</Swiper>
				<View style={Styles.footer}>
					<TouchableOpacity onPress={() => { this.props.bind.props.navigation.navigate("EditUser", { content: this.state.currentUser, currentEvent: this.props.bind.state.currentEvent }) }} style={Styles.editUserButton}>
						<Image source={Images.icons.edit_user} style={Styles.footerIcon} />
					</TouchableOpacity>
					<Text style={Styles.userName} numberOfLines={1}>{this.state.user}</Text>
				</View>
				<GestureRecognizer onSwipeLeft={this.closeModal}>
					<TouchableOpacity
						onPress={this.closeModal}
						style={Styles.background}>
					</TouchableOpacity>
				</GestureRecognizer>
			</View>
		)
	}
}

export default Drawer;
