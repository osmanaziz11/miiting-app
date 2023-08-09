import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, AsyncStorage, Platform, Linking } from "react-native";
import Styles from "./Styles/DashboardStyles";
import { I18n } from "../Lib";
import moment from "moment";
import Images from "../Themes/Images";
import Header from "../Components/Header";
import AppConfig from "../Config/Appconfig";
import Drawer from "../Components/Drawer";
import Avatar from "../Components/Avatar";
import Advert from "../Components/Advert";
import NavigationTab from "../Components/NavigationTab";
import Metrics from "../Themes/Metrics";
import Api from "../Config/Apiconfig";
import TextWithLinks from "../Components/TextWithLinks";
import {EventRegister} from "react-native-event-listeners";
import PushConfig from "../Config/PushConfig";
import LinearGradient from "react-native-linear-gradient";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEvent: {},
            currentUser: {},
            drawerIsOpen: false,
            advertOpen: true,
            tl: "",
            left: {},
            allowedToGetPot: true,
        };
        this.goToGuestsList = this.goToGuestsList.bind(this);
        this.getPotTimeLeft = this.getPotTimeLeft.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.renderPotEnd = this.renderPotEnd.bind(this);
        this.getEventTimeLeft = this.getEventTimeLeft.bind(this);
        this.navigation = this.props.navigation;
        this.goToQrCode = this.goToQrCode.bind(this);
        this.goToManageEvent = this.goToManageEvent.bind(this);
        this.shareEventImage = this.shareEventImage.bind(this);
        this.openMap = this.openMap.bind(this);
    }

    componentWillMount() {
        var currentUser = this.navigation.getParam("content", {});
        if ((this.navigation.state.params.id && this.navigation.state.params.id !== null )) {
            var id = this.navigation.state.params.id;
            var currentEvent = currentUser.events.filter(item => item.id == id)[0];
        } else {
            var currentEvent = this.navigation.getParam("currentEvent", currentUser.events[currentUser.events.length - 1]);
        }

        if (currentEvent === undefined) {
            currentEvent = currentUser.events[currentUser.events.length - 1];
        }

        this.state.currentUser = currentUser;
        this.state.currentEvent = currentEvent;
        this.PushConfig = new PushConfig();
        AsyncStorage.getItem("@notification:read", (error, value) => {
          if(value == "" || value == null){
            this.PushConfig.getInitialNotification(resultNavigation => {
              if(resultNavigation.route != null){
                AsyncStorage.setItem("@notification:read", "true");
                resultNavigation.content = currentUser;
                resultNavigation.currentEvent = currentEvent;
                this.props.navigation.navigate(resultNavigation.route, resultNavigation)
              }
            });
          }
        })
    }

    componentDidMount(){
        this.notificationRoutingListener = EventRegister.addEventListener("notificationRouting", resultNavigation => {
          resultNavigation.content = this.state.currentUser;
          resultNavigation.currentEvent = this.state.currentEvent;
          this.props.navigation.navigate(resultNavigation.route, resultNavigation)
        });
        this.getPotTimeLeft();
        this.getEventTimeLeft();

    }

    getEventTimeLeft() {
        let left = {};
        const end_date = moment(this.state.currentEvent.date, "DD/MM/YYYY");
        end_date.hours(this.state.currentEvent.time.split(":")[0]).minutes(this.state.currentEvent.time.split(":")[1])
        let event_has_ended = end_date.isSameOrBefore(moment());
        left.days = end_date.diff(moment(), "days");
        left.hours = end_date.subtract(left.days, "days").diff(moment(), "hours");
        left.minutes = end_date.subtract(left.hours, "hours").diff(moment(), "minutes");
        this.setState({ left, event_has_ended });
    }

    formatImageUrl(imageUrl) {
        if (imageUrl == "") {
            return (imageUrl);
        }
        return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
    }

    renderCard({ icon, title, content, size }) {
        return (
            <View style={[Styles.card, size == "half" ? Styles.halfCard : null]}>
                <View style={Styles.cardHeader}>
                    <Image source={icon} style={Styles.cardIcon} resizeMode={"contain"} />
                    <View style={Styles.cardContentContainer}>
                        <Text style={Styles.cardTitle}>{title}</Text>
                        <Text style={Styles.cardContent}>{content}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderMap() {
        if (this.state.currentEvent.address.map !== null && this.state.currentEvent.address.address !== null && this.state.currentEvent.address.address.length > 0) {
            return (
                <View style={Styles.mapPreview}>
                    <TouchableOpacity onPress={this.openMap} style={Styles.openMapButton}>
                        <LinearGradient
                            colors={["#547FFA", "#82ABFB"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.openMapButtonInner}>
                            <Text style={Styles.openMapText}>{I18n.t("open_map")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Image source={{ uri: this.state.currentEvent.address.map }} resizeMode={"cover"} style={Styles.mapPreviewImg} />
                </View>
            )
        }
    }

    goToGuestsList() {
        this.props.navigation.replace("GuestsList", { content: this.state.currentUser, currentEvent: this.state.currentEvent })
    }

    getPotTimeLeft() {
        Api.pot.getDetails(this.state.currentEvent.id)
            .then(response => {
                switch (response.status) {
                    case "success":
                        let dateDiff = moment(this.state.currentEvent.potEnd.date).diff(moment(), "days");
                        this.setState({ tl: `${dateDiff} jours`, allowedToGetPot: true });
                        break;
                    case "error":
                        this.setState({ allowedToGetPot: false });
                        break;
                    default:
                        break;
                }
            })
    }

    renderPotEnd() {
        const tl = parseInt(this.state.tl);
        if (tl <= 0) {
            return (
                <Text style={Styles.potDesc}>{I18n.t("pot_ended")}</Text>
            )
        }

        return (
            <Text style={Styles.potDesc}>{I18n.t("pot_desc")}<Text style={Styles.daysLeft}>{this.state.tl}</Text>{I18n.t("to_participate")}</Text>
        )
    }

    goToQrCode() {
        this.props.navigation.replace("ManageEvent", {content: this.state.currentUser, currentEvent: this.state.currentEvent, settingId: 3})
    }

    goToManageEvent() {
        this.props.navigation.replace("ManageEvent", {content: this.state.currentUser, currentEvent: this.state.currentEvent, settingId: 0})
    }

    shareEventImage(){
      let url = AppConfig.apiUrl + "/event/get-countdown-image/" + this.state.currentEvent.id;
      let mime = "image/png";
      let path = `${RNFetchBlob.fs.dirs.DocumentDir}/event-${this.state.currentEvent.id}.${mime.split('/')[1]}`;
      RNFetchBlob
          .config({
              fileCache: true,
              path
          })
          .fetch("GET", url)
          .then((res) => {
              RNFetchBlob.fs.readFile(path, "base64").then(response => {
                dataURI = "data:" + mime + ";base64," + response;
                console.log(dataURI)
                Share.open({message: "Event from Miiting", url: dataURI});
              })
          }).catch(err => {
              console.log(err);
          })
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

    openMap() {
        let location = this.state.currentEvent.address.latitude + "," + this.state.currentEvent.address.longitude;
        let schemeprefix = Platform.select({"android" : "geo:" + location + "?q=", "ios": "https://maps.apple.com/?daddr="});
        Linking.canOpenURL(schemeprefix + location).then(isCapable => {
            if(isCapable){
              Linking.openURL(schemeprefix + location)
            }else{
              console.warn("Not capable to open link:", schemeprefix + geoll);
              Alert.alert(I18n.t("linking_error_title"), I18n.t("linking_error_text"));
            }
          });
    }

    render() {
        const event = this.state.currentEvent;
        const owner = event.owners[0] ? event.owners[0] : this.state.currentUser;
        return (
            <View style={Styles.container}>
                <Header
                    onMenuPressed={() => { this.setState({ drawerIsOpen: true }) }}
                    title={I18n.t("dashboard_title")} />
                <Drawer onChangeEvent={(item) => {
                    this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
                }}
                    isOpen={this.state.drawerIsOpen} bind={this} />
                <Advert
                    adType={"banner"}
                    onClose={() => { this.setState({ advertOpen: false }) }}
                    isOpen={this.state.advertOpen}
                    screenLocation={"dashboard"}
                    eventType={event.kind.id} />
                <Advert
                    adType={"popup"}
                    onClose={() => { this.setState({ advertOpen: false }) }}
                    isOpen={this.state.advertOpen}
                    screenLocation={"dashboard"}
                    eventType={event.kind.id}
                    countdownToShow={15}/>
                <ScrollView style={Styles.scrollView} contentContainerStyle={Styles.scrollViewContent}>
                    {(event.picture !== undefined && event.picture !== null && event.picture.length > 0) ?
                        <Image source={{ uri: this.formatImageUrl(event.picture) }} style={Styles.eventPicture} />
                        :
                        <Image source={Images.default_event_pic} style={Styles.eventPicture} />
                    }
                    {!this.state.event_has_ended &&
                        <View style={Styles.eventTimeLeft}>
                            <View style={Styles.rowUnits}>
                                <Text style={Styles.units}>{I18n.t("days")}</Text>
                                <Text style={Styles.units}>{I18n.t("hours")}</Text>
                                <Text style={Styles.units}>{I18n.t("minutes")}</Text>
                            </View>
                            <View style={Styles.rowValues}>
                                <Text style={Styles.values}>{this.state.left.days}</Text>
                                <Text style={Styles.separators}>:</Text>
                                <Text style={Styles.values}>{this.state.left.hours}</Text>
                                <Text style={Styles.separators}>:</Text>
                                <Text style={Styles.values}>{this.state.left.minutes}</Text>
                            </View>
                        </View>
                    }
                    <View style={Styles.main}>
                        <View style={Styles.eventDetails}>
                            <Text numberOfLines={2} style={Styles.eventTitle}>{event.name}</Text>
                            <TextWithLinks style={Styles.eventDescription} content={(event.description !== undefined && event.description !== null) ? event.description : I18n.t("no_event_description")}/>
                            <View style={Styles.separator} />
                            <View style={Styles.eventOwner}>
                                <Avatar
                                    touchable
                                    style={Styles.avatar}
                                    initials={owner.initials}
                                    source={owner.picture}
                                    height={Metrics.screenWidth * 0.1}
                                    width={Metrics.screenWidth * 0.1} />
                                <View style={Styles.eventOwnerDetails}>
                                    <Text style={Styles.eventOwnerTitle}>{I18n.t("event_owner_title")}</Text>
                                    <Text style={Styles.eventOwnerName}>{owner.name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.potDetailsContainer}>
                            {this.state.allowedToGetPot &&
                                <View style={Styles.potContent}>
                                    {/*<Image source={Images.icons.dash_pot} style={Styles.potIcon} />
                                    <View style={Styles.potTimeLeft}>
                                        <Text style={Styles.potDesc}>
                                            {this.renderPotEnd()}
                                        </Text>
                                    </View>*/}
                                </View>
                            }
                            <Text style={Styles.infoTitle}>{I18n.t("info_title")}</Text>
                        </View>

                        <View style={Styles.cardsContainer}>
                            {event.role !== "provider" &&
                                <TouchableOpacity onPress={this.goToGuestsList}>
                                    {this.renderCard({
                                        icon: Images.icons.dash_guest,
                                        title: I18n.t("card_guests_number"),
                                        content: this.state.currentEvent.nbGuests,
                                        size: "full",
                                    })}
                                    <Image source={Images.icons.dash_goto} style={Styles.goToGuestsListArrow} />
                                </TouchableOpacity>
                            }
                            {event.role == "owner" &&
                                <TouchableOpacity onPress={this.goToQrCode}>
                                    {this.renderCard({
                                        icon: Images.icons.add_guest,
                                        title: I18n.t("card_qrcode"),
                                        content: I18n.t("card_see_qrcode"),
                                        size: "full",
                                    })}
                                    <Image source={Images.icons.dash_goto} style={Styles.goToGuestsListArrow} />
                                </TouchableOpacity>
                            }
                            {event.role == "owner" &&
                                <TouchableOpacity onPress={this.shareEventImage}>
                                    {this.renderCard({
                                        icon: Images.icons.media_actif,
                                        title: I18n.t("card_share_event_image"),
                                        content: I18n.t("card_share_event_image_content"),
                                        size: "full",
                                    })}
                                    <Image source={Images.icons.dash_goto} style={Styles.goToGuestsListArrow} />
                                </TouchableOpacity>
                            }
                            {event.role == "owner" &&
                                <TouchableOpacity onPress={this.goToManageEvent}>
                                    {this.renderCard({
                                        icon: Images.icons.settings_active,
                                        title: I18n.t("card_manage"),
                                        content: I18n.t("card_manage_event"),
                                        size: "full",
                                    })}
                                    <Image source={Images.icons.dash_goto} style={Styles.goToGuestsListArrow} />
                                </TouchableOpacity>
                            }
                            <View style={Styles.halfCardsContainer}>
                                {this.renderCard({
                                    icon: Images.icons.dash_date,
                                    title: I18n.t("create_event_date_label"),
                                    content: event.date,
                                    size: "half",
                                })}
                                <View style={Styles.middleBar} />
                                {this.renderCard({
                                    icon: Images.icons.dash_hour,
                                    title: I18n.t("create_event_hour_label"),
                                    content: event.time,
                                    size: "half",
                                })}
                            </View>
                            {this.state.currentEvent.address.map !== null &&
                                this.renderCard({
                                    icon: Images.icons.dash_location,
                                    title: I18n.t("create_event_place_label"),
                                    content: event.address.latitude !== null ? this.formatAddressToDisplay(event.address) : I18n.t("no_place_provided"),
                                    size: "full",
                                })
                            }
                        </View>
                        {this.renderMap()}
                    </View>
                </ScrollView>
                <NavigationTab bind={this}/>
            </View>
        );
    }
}

export default DashboardContainer;
