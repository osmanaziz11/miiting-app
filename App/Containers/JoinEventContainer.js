import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Alert, AsyncStorage, ScrollView } from "react-native";
import Styles from "./Styles/JoinEventStyles.js";
import Header from "../Components/Header";
import QRScan from "../Components/QRScan";
import CodeInput from "../Components/CodeInput";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import LinearGradient from "react-native-linear-gradient";
import Advert from "../Components/Advert";
// import CodeInput from "react-native-confirmation-code-input";
import Images from "../Themes/Images";

class JoinEventContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputCode: "",
            isQRScanEnabled: false,
            advertOpen: true
        }

        this.confirmCode = this.confirmCode.bind(this);
        this.handleCodeScan = this.handleCodeScan.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.navigation = this.props.navigation;
    }

    componentWillUnmount() {
        this.refs.codeInput.codeInputRefs.map(item => {
            item.setNativeProps({ text: "" });
        });
    }

    isUserLoggedIn() {
        return this.props.navigation.state.params.currentUser ? true : false;
    }

    confirmCode() {
      Api.getEventJoiningDetails(this.state.inputCode).then(response =>{
        console.log(response)
        switch (response.status) {
          case "success":
          this.props.navigation.navigate("JoiningInfo", {event: response.content, qrcode: this.state.inputCode, currentUser: this.props.navigation.state.params.currentUser});
          break;
          case "error":
            Alert.alert(I18n.t("header_join_event"), I18n.t(response.message));
          break;
          default:
            Alert.alert(I18n.t("header_join_event"), I18n.t("unknown_error"));
        }
      });
    }

    handleCodeScan(scanResult) {
        console.log(scanResult)
        if (scanResult.data != null && scanResult.type.toLowerCase().includes("qr")) {
            let dataElements = scanResult.data.split("/");
            if (dataElements.length > 2 && dataElements[dataElements.length - 2] == "qrcode") {
                let joincode = dataElements[dataElements.length - 1];
                if (joincode != undefined && joincode.length > 0) {
                  console.log(joincode)
                    this.setState({ isQRScanEnabled: false, inputCode: joincode }, this.confirmCode);
                }
            } else {
                Alert.alert(I18n.t("header_join_event"), I18n.t("unknown_code"))
            }
        } else {
            Alert.alert(I18n.t("header_join_event"), I18n.t("unknown_code"))
        }
    }


    handleLogout(){
      Api.userLogout().then(response => {
  		  switch (response.status) {
  			case "success":
  			  AsyncStorage.multiRemove([
  				"@login:email",
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

    render() {
        return (
            <View style={Styles.container}>
                <Header title={I18n.t("header_join_event")} onLogoutPressed={this.isUserLoggedIn() ? this.handleLogout : undefined} onBackPressed={() => { this.navigation.goBack() }} />
                {this.isUserLoggedIn() && [
                    <Advert
                        key={"1"}
                        adType={"banner"}
                        onClose={() => { this.setState({ advertOpen: false }) }}
                        isOpen={this.state.advertOpen}
                        screenLocation={"join_event"}
                        eventType={null} />,
                    <Advert
                        key={"2"}
                        adType={"popup"}
                        onClose={() => { this.setState({ advertOpen: false }) }}
                        isOpen={this.state.advertOpen}
                        screenLocation={"join_event"}
                        eventType={null} />
                ]}
                <ScrollView style={Styles.scrollView} contentContainerStyle={Styles.scrollViewContainer}>
                    <View style={Styles.howToJoinBlock}>
                        <Text style={Styles.howToJoinText}>{I18n.t("how_to_join")}</Text>
                    </View>
                    <View style={Styles.formContainer}>
                        <Text style={Styles.eventCodeTitle}>{I18n.t("event_code_input")}</Text>
                        <CodeInput
                            ref="codeInput"
                            keyboardType="numeric"
                            codeLength={6}
                            className='border-circle'
                            autoFocus={false}
                            codeInputStyle={Styles.codeInput}
                            cellBorderWidth={2}
                            activeColor={"black"}
                            onFulfill={(code, isValid) => this.setState({ inputCode: code })}
                        />
                    </View>
                    <View style={Styles.qrCodeContainer}>
                        <Text style={Styles.eventQrCodeTitle}>{I18n.t("event_qr_code_text")}</Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ isQRScanEnabled: true }) }}>
                            <Image style={Styles.qrCodeImg} source={Images.icons.qr_code} resizeMode={"contain"} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        ref={"buttonSubmit"}
                        onPress={this.confirmCode} disabled={this.state.inputCode.length == 0}>
                        <LinearGradient
                            colors={["#527afe", "#7fa8fe"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.buttonSubmit}>
                            <Text style={Styles.buttonText}>{I18n.t("join_event_submit_button")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <QRScan
                        onRead={this.handleCodeScan}
                        onClose={() => { this.setState({ isQRScanEnabled: false }) }}
                        enabled={this.state.isQRScanEnabled} />
                </ScrollView>
            </View>
        )
    }
}

export default JoinEventContainer;
