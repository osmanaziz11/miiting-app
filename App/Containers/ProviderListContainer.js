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
import ProviderDirectoryItem from "../Components/ProviderDirectoryItem";

class ProviderListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerType: null,
      isLoading: true,
      addressFilter: null,
      currentLocationFilter: false,
      providerName: null,
    };
    this.renderProvider = this.renderProvider.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    let filterAddress = this.props.navigation.getParam("filterAddress", null);
    let providerType = this.props.navigation.getParam("providerType", null);
    let providerName = this.props.navigation.getParam("providerName", null);
    this.state.filterAddress = filterAddress;
    this.state.providerType = providerType;
    this.state.providerName = providerName;
	}

  componentDidMount(){
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState){
    let filterAddress = this.props.navigation.getParam("filterAddress", null);
    let providerType = this.props.navigation.getParam("providerType", null);
    let providerName = this.props.navigation.getParam("providerName", null);
    let newData = false;
    if(filterAddress && prevState.filterAddress === null){
      this.state.filterAddress = filterAddress;
      newData = true;
    }
    if(providerType && (prevState.providerType ? prevState.providerType.id : null) !== providerType.id){
      this.state.providerType = providerType;
      newData = true;
    }
    if(providerName && prevState.providerName === providerName){
      this.state.providerName = providerName;
      newData = true;
    }
    if(newData){
      this.fetchData();
    }
  }

  fetchData(){
    if(!this.state.isLoading) this.setState({isLoading: true});
    Api.getDirectoryProviders({
      providerTypeId: this.state.providerType ? this.state.providerType.id : null,
      location: this.state.addressFilter,
      providerName: this.state.providerName
    }).then(response => {
      if(response.status && response.status == "success"){
        let providers = response.content;
        this.setState({providers, isLoading: false});
      }else{
        Alert.alert(I18n.t("drawer_providers_title"), I18n.t("unknown_error"));
      }
    });
  }

  formatAddressToDisplay(localization){
		if(localization == null){
			return I18n.t("provider_unknown_address");
		}else{
			return localization.label ? localization.label : (localization.address + ", " + localization.city);
		}
	}

  renderProvider({item}){
    return(
      <ProviderDirectoryItem
        onPress={()=>{this.props.navigation.navigate("ProviderDetail", {selectedProvider: item})}}
        provider={item}/>
    );
  }

  render() {
    let {providerName, providerType, filterAddress} = this.state;
    return (
      <View style={[Styles.container, Styles.containerList]}>
        <Header title={this.state.providerType ? this.state.providerType.name : I18n.t("drawer_providers_title")} onBackPressed={() => { this.props.navigation.goBack() }} />
        {this.state.isLoading && <MiitingLoader />}
        {!this.state.isLoading && <FlatList
          data={this.state.providers}
          style={Styles.mainContainer}
          contentContainerStyle={Styles.mainContentContainer}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View style={Styles.listHeader}>
              <TouchableOpacity
                style={Styles.listHeaderInput}
                onPress={()=>{this.props.navigation.navigate("PickRestaurant", { event_type: null, route: "ProviderList", providerName, providerType, filterAddress})}}>
                <Text numberOfLines={1} style={[Styles.listHeaderInputText, this.state.filterAddress === null ? Styles.listHeaderInputPlaceholder : null]}>{this.state.filterAddress !== null ? this.formatAddressToDisplay(this.state.filterAddress) : I18n.t("address_filter_providers_placeholder")}</Text>
              </TouchableOpacity>
              <Text style={Styles.listHeaderText}>{this.state.providers.length + " " + I18n.t("provider_list_count_label" + (this.state.providers.length > 1 ? "_plural" : ""))}</Text>
            </View>
          }
          renderItem={this.renderProvider}/>}
      </View>
    );
  }
}

export default ProviderListContainer;
