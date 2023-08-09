import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, AsyncStorage } from "react-native";
import Styles from "./Styles/SelectEventStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import AppConfig from "../Config/Appconfig";
import PushConfig from "../Config/PushConfig";

class SelectEventContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: this.props.navigation.getParam("content", []).events,
		};
		this.renderItem = this.renderItem.bind(this);
	}

	componentWillMount() {
		let { content } = this.props.navigation.state.params;
		this.PushConfig = new PushConfig();
		AsyncStorage.getItem("@notification:read", (error, value) => {
			if (value == "" || value == null) {
				this.PushConfig.getInitialNotification(resultNavigation => {
					resultNavigation.event_id = 187;
					resultNavigation.route = "TablePlan";
					if (resultNavigation.route != null) {
						let currentEvent = content.events.filter(el => el.id == resultNavigation.event_id)[0];
						if (currentEvent) {
							AsyncStorage.setItem("@notification:read", "true");
							resultNavigation.content = content;
							resultNavigation.currentEvent = currentEvent;
							this.props.navigation.navigate(resultNavigation.route, resultNavigation)
						}
					}
				});
			}
		})
	}

	renderItem({ item, index }) {
		let eventPicture = item.picture ? { uri: AppConfig.cdnUrl + item.picture } : Images.default_event_pic;
		return (
			<View>
				{item.unread &&
					<View style={Styles.floatingUnreadBubble} />
				}
				<TouchableOpacity style={Styles.eventItem} onPress={() => this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", []), id: item.id })}>
					<Image source={eventPicture} resizeMode={"cover"} style={Styles.eventPicture} />
					<View style={Styles.eventInfo}>
						<Text style={Styles.eventName}>{item.name}</Text>
						<Text style={Styles.eventDate}>{item.date}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		return (
			<View style={Styles.container}>
				<Header title={I18n.t("header_select_event")} />
				<View style={Styles.instructions}>
					<Text style={Styles.instructionsText}>{I18n.t("select_event_instructions")}</Text>
				</View>
				<FlatList
					data={this.state.events}
					renderItem={this.renderItem}
					style={Styles.eventsList}
					contentContainerStyle={Styles.eventsListContent}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}
}

export default SelectEventContainer;
