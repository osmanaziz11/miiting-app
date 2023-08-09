import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Alert, ScrollView } from "react-native";
import Styles from "./Styles/JoinInvitationStyles";
import { I18n } from "../Lib";
import Header from "../Components/Header";
import Invitation from "../Components/Invitation";
import Images from "../Themes/Images";
import LinearGradient from "react-native-linear-gradient";
import Api from "../Config/Apiconfig";

class JoinInvitationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: [],
        }

        this.renderInvitations = this.renderInvitations.bind(this);
        this.handleAddGuests = this.handleAddGuests.bind(this);
        this.addGuest = this.addGuest.bind(this);
        this.navigation = this.props.navigation;
    }

    addGuest() {
        this.state.guests.push({ 
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            birthdate: "",
        });
        this.forceUpdate();
    }

    removeGuest(key) {
        this.state.guests.splice(key, 1)
        this.forceUpdate();
    }

    renderInvitations() {
        return this.state.guests.map((guest, key) => (
            <Invitation onCrossPressed={() => { this.removeGuest(key) }} invit_key={key} guest={guest} key={key} onChange={(value) => { this.state.guests[key] = value, this.forceUpdate() }} />
        ))
    }


    handleAddGuests() {
        var companions = [];
        for (var i in this.state.guests) {
            companions.push({
                firstname: this.state.guests[i].firstname,
                lastname: this.state.guests[i].lastname,
                phone: this.state.guests[i].phone,
                birthdate: this.state.guests[i].birthdate,
                is_coming: true,
            })
        }
        Api.addCompanions({
            companions
        }, this.navigation.getParam("content", {}).events[this.navigation.getParam("content", {}).events.length - 1].id)
            .then(response => {
                switch (response.status) {
                    case "success":
                        console.log("Companion added", response);
                        this.navigation.replace("Dashboard", { content: this.navigation.getParam("content", {}) })
                        break;
                    case "error":
                        console.log(response.message)
                        break;
                    default:
                        Alert.alert(I18n.t("login_title"), I18n.t("unknown_error"));
                }
            })
    }

    render() {
        return (
            <View style={Styles.container}>
                <Header title={I18n.t("header_join_event")} onBackPressed={() => { this.navigation.replace("JoinEvent") }} />
                <ScrollView contentContainerStyle={Styles.scrollView}>
                    <View style={Styles.inviteOthersBlock}>
                        <Text style={Styles.inviteOthersText}>{I18n.t("invite_others")}</Text>
                    </View>
                    {this.renderInvitations()}
                    <TouchableOpacity
                        onPress={this.addGuest}
                        style={Styles.addGuestButton}>
                        <Image source={Images.icons.plus_icon} style={Styles.addGuestImg} />
                    </TouchableOpacity>
                    <Text style={Styles.addGuestText}>{I18n.t("add_guest")}</Text>
                    <TouchableOpacity
                        ref={"buttonSubmit"}
                        onPress={this.handleAddGuests}>
                        <LinearGradient
                            colors={["#527afe", "#7fa8fe"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.buttonSubmit}>
                            <Text style={Styles.buttonText}>{this.state.guests.length > 0 ? this.state.guests.length === 1 ? I18n.t("validate_1_guest") : "Valider avec " + this.state.guests.length + " accompagnants" : I18n.t("validate_without_guest")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default JoinInvitationContainer;