import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Linking } from "react-native";
import Styles from "./Styles/ProviderStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import SearchBar from "../Components/SearchBar";
import Images from "../Themes/Images";
import Filters from "../Components/Filters";
import Api from "../Config/Apiconfig";
import MiitingLoader from "../Components/MiitingLoader";
import LinearGradient from "react-native-linear-gradient";
import Drawer from "../Components/Drawer";
import NavigationTab from "../Components/NavigationTab";

class ProviderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false,
      providerTypes: [],
      isLoading: true,
    };
    this.renderProviderType = this.renderProviderType.bind(this);
  }

  componentWillMount() {
		var currentUser = this.props.navigation.getParam("content", {});
		var currentEvent = this.props.navigation.getParam("currentEvent", {});
		this.state.currentUser = currentUser;
		this.state.currentEvent = currentEvent;
	}

  componentDidMount(){
    Api.getDirectoryProviderTypes().then(response => {
      if(response.status && response.status == "success"){
        this.setState({providerTypes: response.content, isLoading: false});
      }else{
        Alert.alert(I18n.t("drawer_providers_title"), I18n.t("unknown_error"));
      }
    });
  }

  renderProviderType({item}){
    return(
      <TouchableOpacity
        onPress={() =>{
          this.props.navigation.navigate("ProviderList", {providerType: item});
        }}
        style={Styles.providerTypeButton}>
        {item.picture && <Image source={{uri: item.picture}} style={Styles.providerTypeButtonIcon} resizeMode={"contain"}/>}
        <Text numberOfLines={1} style={Styles.providerTypeButtonText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={Styles.container}>
        <Header title={I18n.t("drawer_providers_title")} onMenuPressed={() => { this.setState({ drawerIsOpen: !this.state.drawerIsOpen }) }} />
        <Drawer
          onChangeEvent={(item) => {
            this.props.navigation.replace("GuestsList", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
          }}
          isOpen={this.state.drawerIsOpen} bind={this} />
        {this.state.isLoading &&
          <MiitingLoader />}
        {this.state.providerTypes.length > 0 &&
          <FlatList
            style={Styles.contentContainer}
            contentContainerStyle={Styles.contentContentContainer}
            data={this.state.providerTypes}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <View style={Styles.providerTypeListHeader}>
                <Text style={Styles.providerTypeListHeaderText}>{I18n.t("provider_type_list_header")}</Text>
              </View>
            }
            renderItem={this.renderProviderType}/>}
        <NavigationTab bind={this}/>
      </View>
    );
  }
}

export default ProviderContainer;
