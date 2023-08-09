import React, { Component } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, Image, AsyncStorage, Keyboard, Platform } from "react-native";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Api from "../Config/Apiconfig";
import AppConfig from "../Config/Appconfig";
import Header from "../Components/Header";
import LinearGradient from "react-native-linear-gradient";
import Styles from "./Styles/NoEventStyles";
import ElevatedView from "react-native-elevated-view";

class NoEventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentUser: null
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleEventCreate = this.handleEventCreate.bind(this);
        this.handleJoinEvent = this.handleJoinEvent.bind(this);
    }

    componentDidMount(){
      console.log(this.props.navigation.state.params.currentUser)
      this.setState({currentUser: this.props.navigation.state.params.currentUser})
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
              AsyncStorage.getItem("@push:token", (error, result) =>{
                if(!error) Api.tokenRemove(result);
              });
              this.props.navigation.replace("Launch");
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

    handleEventCreate() {
      this.props.navigation.navigate("CreateEvent", { currentUser: this.state.currentUser });
    }

    handleJoinEvent() {
      this.props.navigation.navigate("JoinEvent", { currentUser: this.state.currentUser });
    }

    render() {
        return (
            <View style={Styles.container}>
              <Header title={I18n.t("header_join_event")} onLogoutPressed={this.handleLogout}/>
              <Text style={Styles.explainTitle}>{I18n.t("no_event_explain_title")}</Text>
              <Text style={Styles.explainText}>{I18n.t("no_event_explain")}</Text>

              <View style={Styles.buttonsContainer}>
      					<TouchableOpacity
      						ref={"buttonCreate"}
      						onPress={this.handleEventCreate}>
      						<LinearGradient
      							colors={["#547FFA", "#82ABFB"]}
      							start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
      							style={Styles.buttonCreate}>
      							<Text style={Styles.createButtonText}>{I18n.t("launch_create_event_button")}</Text>
      						</LinearGradient>
      					</TouchableOpacity>
      					<TouchableOpacity
      						onPress={this.handleJoinEvent}>
      						<ElevatedView
      							elevation={Platform.select({ ios: 9, android: 6 })}
      							style={Styles.buttonJoin}>
      							<Text style={Styles.joinButtonText}>{I18n.t("launch_join_event_button")}</Text>
      						</ElevatedView>
      					</TouchableOpacity>
      				</View>
            </View>
        )
    }
}

export default NoEventContainer;
