import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import Styles from "./Styles/ForgottenPasswordStyles";
import { I18n } from "../Lib";
import Header from "../Components/Header";
import LoginLink from "../Components/LoginLink";
import LinearGradient from "react-native-linear-gradient";
import Api from "../Config/Apiconfig";

class ForgottenPasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
        this.handleSendEmail = this.handleSendEmail.bind(this);
    }

    handleSendEmail() {
        const email = this.state.email;
        Api.userForgotPassword(email).then(response => {
          switch (response.status) {
            case "success":
              Alert.alert(
                  I18n.t("forgotten_password_title"),
                  `${I18n.t("email_sent")} ${email}`,
                  [
                      { text: "OK", onPress: () => this.props.navigation.goBack() },
                  ],
                  { cancelable: false }
              )
              break;
            case "error":
              Alert.alert(I18n.t("forgotten_password_title"), I18n.t(response.message));
              break;
            default:
              Alert.alert(I18n.t("forgotten_password_title"), I18n.t("unknown_error"));
          }
        });
    }

    render() {
        return (
            <View style={Styles.container}>
                <Header onBackPressed={() => this.props.navigation.goBack()} title={I18n.t("forgotten_password_title")} />
                <Text style={Styles.editPasswordStepsText}>{I18n.t("edit_password_steps")}</Text>
                <View style={Styles.formContainer}>
                    <View>
                        <Text style={Styles.textInputLabel}>{I18n.t("input_email_label")}</Text>
                        <View
                            style={Styles.textInputContainer}>
                            <TextInput
                                ref={"inputEmail"}
                                autoCapitalize={"none"}
                                keyboardType={"email-address"}
                                autoCorrect={false}
                                returnKeyType={"done"}
                                underlineColorAndroid={"transparent"}
                                placeholder={I18n.t("input_email_placeholder")}
                                onChangeText={value => { this.setState({ email: value }) }}
                                onSubmitEditing={this.handleSendEmail}
                                style={Styles.textInput} />
                        </View>
                    </View>
                    <TouchableOpacity
                        ref={"buttonSubmit"}
                        onPress={this.handleSendEmail}
                        disabled={this.state.email.length <= 2}>
                        <LinearGradient
                            colors={["#547FFA", "#82ABFB"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.buttonSubmit}>
                            <Text style={Styles.buttonText}>{I18n.t("edit_password")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <LoginLink route={"login"} text={I18n.t("have_an_account_question")} goTo={() => { this.props.navigation.replace("Login") }} />
            </View>
        )
    }
}

export default ForgottenPasswordContainer;
