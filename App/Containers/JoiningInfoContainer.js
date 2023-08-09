import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Alert, AsyncStorage, ScrollView, Switch } from "react-native";
import Styles from "./Styles/JoiningInfoStyles.js";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import LinearGradient from "react-native-linear-gradient";
import Images from "../Themes/Images";
import Avatar from "../Components/Avatar";
import ElevatedView from "react-native-elevated-view";
import Metrics from "../Themes/Metrics"

class JoiningInfoContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_coming: true,
      single: false,
    }

    this.confirmJoiningEvent = this.confirmJoiningEvent.bind(this);
  }

  componentDidMount(){
    this.setState({single: this.props.navigation.state.params.currentUser.single});
  }

  isUserLoggedIn() {
    return this.props.navigation.state.params.currentUser  ? true : false;
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

  confirmJoiningEvent(){
    let qrcode = this.props.navigation.state.params.qrcode;
    let is_coming = this.state.is_coming ? 1 : 0;
    if(this.isUserLoggedIn()){
      Api.addUserInEvent({qrcode, is_coming}).then(response => {
        console.log(response)
        switch (response.status) {
          case "success":
            this.props.navigation.replace("JoinInvitation", { content: response.content })
            break;
          case "error":
            if(response.message === "already_registered"){
              this.props.navigation.replace("Dashboard", {content: this.props.navigation.state.params.currentUser});
            }else{
              Alert.alert(I18n.t("header_join_event"), I18n.t(response.message));
            }
            break;
          default:
            Alert.alert(I18n.t("header_join_event"), I18n.t("unknown_error"));
        }
      });
    }else{
      this.props.navigation.replace("Login", { is_joining: true, qrcode, is_coming: this.state.is_coming })
    }
  }

  render() {
    let event = this.props.navigation.state.params.event;
    let owner = event.owners.length > 0 ? event.owners[0] : null;
    return (
      <View style={Styles.container}>
        <Header title={I18n.t("header_join_event")} onLogoutPressed={this.isUserLoggedIn() ? this.handleLogout : undefined} onBackPressed={() => { this.props.navigation.goBack() }} />
        <ScrollView contentContainerStyle={Styles.contentContainer} style={Styles.scrollContainer}>
          <Text style={Styles.joiningExplainText}>{I18n.t("joining_info_explain")}</Text>
          <ElevatedView
            elevation={9}
            style={Styles.eventInfoContainer}>
            <View style={Styles.eventNameContainer}>
              <Text style={Styles.eventNameText}>{event.name}</Text>
            </View>
            <View style={Styles.datetimeContainer}>
              <View style={Styles.dateContainer}>
                <Image resizeMode={"contain"} source={Images.icons.dash_date} style={Styles.dateIcon}/>
                <View style={Styles.infoTimeContainer}>
                  <Text style={Styles.infoTimeLabel}>{I18n.t("create_event_date_label")}</Text>
                  <Text style={Styles.infoTimeText}>{event.date}</Text>
                </View>
              </View>
              <View style={Styles.timeContainer}>
                <Image resizeMode={"contain"} source={Images.icons.dash_hour} style={Styles.dateIcon}/>
                <View style={Styles.infoTimeContainer}>
                  <Text style={Styles.infoTimeLabel}>{I18n.t("create_event_hour_label")}</Text>
                  <Text style={Styles.infoTimeText}>{event.time}</Text>
                </View>
              </View>
            </View>
            <View style={Styles.addressContainer}>
              <Image resizeMode={"contain"} source={Images.icons.dash_location} style={Styles.dateIcon}/>
              <View>
                <Text style={Styles.localizationLabel}>{I18n.t("create_event_place_label")}</Text>
                <Text>{this.formatAddressToDisplay(event.address)}</Text>
              </View>
            </View>
            {owner !== null &&
              <View style={Styles.eventOwnerContainer}>
                <Avatar
                  touchable
                  style={Styles.avatar}
                  source={owner.picture}
                  initials={owner.initials}
                  height={Metrics.screenWidth * 0.1}
                  width={Metrics.screenWidth * 0.1} />
                <View style={Styles.ownerInfoContainer}>
                  <Text style={Styles.ownerNameLabelText}>{I18n.t("event_owner_title")}</Text>
                  <Text style={Styles.ownerNameText}>{owner.name}</Text>
                </View>
              </View>}
          </ElevatedView>
          <View style={Styles.buttonsContainer}>
            <TouchableOpacity
              onPress={()=>{this.setState({is_coming: true})}}
              disabled={this.state.is_coming}
              style={this.state.is_coming ? [Styles.buttons, Styles.toggledButton, Styles.button1] : [Styles.buttons, Styles.button1]}>
              <Text style={this.state.is_coming ? [Styles.buttonTextUntoggled, Styles.toggledText] : Styles.buttonTextUntoggled}>{I18n.t("attending")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{this.setState({is_coming: false})}}
              disabled={!this.state.is_coming}
              style={!this.state.is_coming ? [Styles.buttons, Styles.toggledButton, Styles.button2] : [Styles.buttons, Styles.button2]}>
              <Text style={!this.state.is_coming ? [Styles.buttonTextUntoggled, Styles.toggledText] : Styles.buttonTextUntoggled}>{I18n.t("not_attending")}</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.singleInputContainer}>
            <Text style={Styles.singleInputLabel}>{I18n.t("edit_user_single_input_label")}</Text>
            <Switch value={this.state.single} onValueChange={single => this.setState({ single })} trackColor={"#527afe"} thumbColor={"#FFFFFF"}></Switch>
          </View>
          <TouchableOpacity
              onPress={this.confirmJoiningEvent}>
              <LinearGradient
                  colors={["#527afe", "#7fa8fe"]}
                  start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                  style={Styles.buttonSubmit}>
                  <Text style={Styles.buttonText}>{I18n.t("join_event_submit_button")}</Text>
              </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

export default JoiningInfoContainer;
