import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image} from "react-native";
import { I18n } from "../Lib";
import Images from "../Themes/Images.js";
import Styles from "./Styles/NavigationTabStyles"
import LinearGradient from "react-native-linear-gradient";
import AppConfig from "../Config/Appconfig";
import Api from "../Config/Apiconfig";
import Metrics from "../Themes/Metrics.js";

class NavigationTab extends Component {

	constructor(props) {
		super(props);
    this.state = {
      routes: [
        {
          icon: "dashboard",
          route: "Dashboard",
          text: I18n.t("tab_dashboard_title"),
					roles: []
        },
        {
          icon: "chat",
          route: "ChatGuests",
          type: "guests",
          text: I18n.t("tab_chat_title"),
					roles: ["owner", "guest", "evg_org", "evjf_org", "evg_member", "evjf_member"]
        },
        {
          icon: "media",
          route: "MediaFlow",
          text: I18n.t("tab_media_title"),
					roles: ["owner", "guest", "evg_org", "evjf_org", "evg_member", "evjf_member"]
        },
        {
          icon: "provider",
          route: "Provider",
          type: "providers",
          text: I18n.t("tab_providers_title"),
					roles: ["owner"]
        },
      ]
    }

    this.renderButton = this.renderButton.bind(this);
    this.navigate = this.navigate.bind(this);
	}

  navigate(route, type, isCurrentPage) {
		if (route != "") {
			let navigator = this.props.bind.props.navigation;
			this.props.bind.setState({ drawerIsOpen: false }, () => {
				if (!isCurrentPage) navigator.replace(route, { content: this.props.bind.props.navigation.getParam("content", {}), currentEvent: this.props.bind.state.currentEvent, chat_type: type });
			});
		} else {
			Alert.alert(I18n.t("linking_error_title"), I18n.t("coming_soon"));
		}
	}

  renderButton(item, key){
    let isCurrentPage = this.props.bind.props.navigation.state.routeName == item.route;
    return (
      <TouchableOpacity
        key={key}
        style={[Styles.button, {width: (Metrics.screenWidth - 20) / this.state.routes.length}]}
        onPress={()=>{this.navigate(item.route, item.type, isCurrentPage)}}>
        <Image style={Styles.icon} resizeMode={"contain"} source={isCurrentPage ? Images.icons[item.icon + "_actif"] : Images.icons[item.icon]}/>
        <Text numberOfLines={1} style={[Styles.buttonText, isCurrentPage ? Styles.buttonTextActive : null]}>{item.text}</Text>
      </TouchableOpacity>
    )
  }

	render() {
		let role = this.props.bind.state.currentEvent.role;
    return (
      <View style={Styles.overContainer}>
        <LinearGradient
          style={Styles.gradient}
          start={{ x: 0.5, y: 0.0}}
          end={{ x: 0.5, y: 1.0}}
          colors={["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0.16)"]}>
        </LinearGradient>
        <View style={Styles.container}>
          {this.state.routes.filter(route => route.roles.length <= 0 || (route.roles.length > 0 && route.roles.indexOf(role) != -1)).map(this.renderButton)}
        </View>
      </View>
    )
  }
}

export default NavigationTab;
