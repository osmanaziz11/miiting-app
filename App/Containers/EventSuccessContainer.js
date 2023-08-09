import React, { Component } from "react";
import { View, Text, AsyncStorage, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Images from "../Themes/Images";
import Styles from "./Styles/EventSuccessStyles";
import { I18n } from "../Lib";
import LoginLink from "../Components/LoginLink";

class EventSuccessContainer extends Component {
    constructor (props) {
        super(props);

        this.handleAddGuests = this.handleAddGuests.bind(this);
        this.navigation = this.props.navigation;
    }

    handleAddGuests () {
        var currentEvent = this.navigation.state.params.currentEvent;
        this.navigation.replace("Dashboard", {content: this.navigation.state.params.currentUser, currentEvent: currentEvent});
    }

    render () {
        return (
            <View style={Styles.container}>
                <Image source={Images.icons.event_success} style={Styles.successIcon} resizeMode={"contain"}/>
                <Text style={Styles.eventSuccessTitle}>{I18n.t("event_success_title")}</Text>
                <Text style={Styles.manageInvitation}>{I18n.t("manage_invitations_text")}</Text>
                <Text style={Styles.eventQrCode}>{I18n.t("your_qrcode")}{this.navigation.getParam("currentEvent", "no qrcode").qrcode}</Text>
                <TouchableOpacity
                    ref={"buttonSubmit"}
                    onPress={this.handleAddGuests}>
                    <LinearGradient
                        colors={["#527afe", "#7fa8fe"]}
                        start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                        style={Styles.manageButton}>
                        <Text style={Styles.manageButtonText}>{I18n.t("manage_invitations_button")}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

export default EventSuccessContainer;
