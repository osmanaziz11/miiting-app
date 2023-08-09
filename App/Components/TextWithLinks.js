import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import Styles from "./Styles/TextWithLinksStyles";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import HyperLink from "react-native-hyperlink";
const linkify = require("linkify-it")();
linkify.tlds(require('tlds'));

class TextWithLinks extends Component {
  /**
  * Transforms text with html links <a href... into
  * react-native elements that allow Linking support or Navigation
  */

  constructor(props){
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate(destination){
    Linking.canOpenURL(destination).then(supported => {
      if(!supported){
        Alert.alert(I18n.t("linking_error_title"), I18n.t("linking_error_unsupported"));
      } else {
        Linking.openURL(destination);
      }
    }).catch(error => console.error("Linking error:", error));
  }

  render(){
    return(
      <HyperLink linkStyle={[Styles.linkText, this.props.linkStyle]} onPress={this.navigate} linkify={linkify}>
        <Text style={[this.props.style]}>{this.props.content}</Text>
      </HyperLink>
    )
  }
}

export default TextWithLinks;
