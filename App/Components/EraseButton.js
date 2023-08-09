import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import Styles from "./Styles/EraseButtonStyles";

class EraseButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.isActive ? [this.props.style, Styles.button, Styles.buttonActive] : [this.props.style, Styles.button]}>
                <View style={this.props.isActive ? [Styles.middleBar, Styles.middleBarActive] : Styles.middleBar} />
            </TouchableOpacity>
        );
    }
}

export default EraseButton;