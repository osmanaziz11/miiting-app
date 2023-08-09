import React, { Component } from "react";
import AppConfig from "../Config/Appconfig";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text } from "react-native";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import QRCodeScanner from "react-native-qrcode-scanner";
import { I18n } from "../Lib";
import LinearGradient from "react-native-linear-gradient";

import Styles from "./Styles/QRScanStyles";

class QRScan extends Component {

  constructor(props){
    super(props);
  }

  render(){
    if(this.props.enabled){
      return(
        <View style={Styles.container}>
          <QRCodeScanner
            onRead={this.props.onRead}
            reactivate={true}
            showMarker={true}
            customMarker={
              <View style={Styles.markerContainer}></View>
            }
            bottomContent={
              <TouchableOpacity
                  ref={"buttonSubmit"}
                  onPress={this.props.onClose}>
                  <LinearGradient
                      colors={["#527afe", "#7fa8fe"]}
                      start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                      style={Styles.buttonCancel}>
                      <Text style={Styles.buttonText}>{I18n.t("cancel")}</Text>
                  </LinearGradient>
              </TouchableOpacity>
            }
            topContent={
              <Text style={Styles.topText}>{I18n.t("scanner_help_text")}</Text>
            }/>
        </View>
      )
    }else{
      return(<View></View>)
    }

  }
}

export default QRScan;
