import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Styles from "./Styles/LoginLinkStyles";
import { I18n } from "../Lib";

class LoginLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.loginLinkContainer}>
                <Text style={Styles.loginSentence}>{this.props.text}</Text>
                <TouchableOpacity
                    onPress={this.props.goTo}
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Text style={Styles.loginLink}>{I18n.t(`${this.props.route}_link`)}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginLink;