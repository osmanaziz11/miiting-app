import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./Styles/AddButtonStyles";
import Images from "../Themes/Images";

class AddButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={Styles.container}>
                <TouchableOpacity onPress={this.props.onPress} style={Styles.addButton}>
                    <Image source={Images.icons.plus_icon} style={Styles.addButtonImg}/>
                </TouchableOpacity>
                <Text style={[Styles.addButtonText, this.props.textStyles]}>{this.props.text}</Text>
            </View>
        );
    }
}

export default AddButton;