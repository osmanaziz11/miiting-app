import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Linking, Alert } from "react-native";
import Styles from "./Styles/ProviderStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Api from "../Config/Apiconfig";
import MiitingLoader from "../Components/MiitingLoader";
import LinearGradient from "react-native-linear-gradient";
import FormatInput from "../Components/FormatInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class ProviderContactContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      content: ""
    };
    this.handleContactSubmit = this.handleContactSubmit.bind(this);
  }

  handleContactSubmit(){
    if(this.state.content.trim().length <= 0){
      Alert.alert(I18n.t("provider_contact_label"), I18n.t("provider_contact_empty"));
    }else{
      this.setState({isLoading: true})
      let provider = this.props.navigation.getParam("provider", {});
      Api.addProviderContact(provider.id, {
        content: this.state.content,
      }).then(response => {
        if(response.status && response.status === "success"){
          Alert.alert(I18n.t("provider_contact_label"), I18n.t("provider_contact_success"));
          this.props.navigation.goBack();
        }else{
          Alert.alert(I18n.t("provider_contact_label"), I18n.t(response.message));
          this.setState({isLoading: false});
        }
      });
    }
  }

  render() {
    let provider = this.props.navigation.getParam("provider", {});
    return (
      <View style={[Styles.container, Styles.containerList]}>
        <Header title={I18n.t("provider_contact_title").replace("%NAME%", provider.name)} onBackPressed={() => { this.props.navigation.goBack();}} />
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          style={Styles.mainContainer}
          contentContainerStyle={Styles.mainContentContainer}>
          <Text style={Styles.contactTextExplain}>{I18n.t("provider_contact_explain").replace("%NAME%", provider.name)}</Text>
          <View style={Styles.formContainer}>
            <Text style={Styles.contactMessageLabel}>{I18n.t("provider_contact_label")}</Text>
            <FormatInput
              placeholder={I18n.t("provider_contact_input_placeholder")}
              onChangeText={content => this.state.content = content}
              multiline={true}/>
          </View>
          {this.state.isLoading && <MiitingLoader />}
          <TouchableOpacity
            disabled={this.state.isLoading}
            onPress={this.handleContactSubmit}
            style={[Styles.orderProviderButton, Styles.contactButton]}>
            <LinearGradient
                colors={["#547FFA", "#82ABFB"]}
                start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                style={Styles.orderProviderButtonInner}>
                <Text style={Styles.orderProviderButtonText}>{I18n.t("provider_contact_send")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ProviderContactContainer;
