import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Linking, Alert } from "react-native";
import Styles from "./Styles/ProviderStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import SearchBar from "../Components/SearchBar";
import Images from "../Themes/Images";
import Filters from "../Components/Filters";
import Api from "../Config/Apiconfig";
import MiitingLoader from "../Components/MiitingLoader";
import LinearGradient from "react-native-linear-gradient";
import AppConfig from "../Config/Appconfig";
import ImageGalleryModal from "../Components/ImageGalleryModal";
import ProviderDescription from "../Components/ProviderDescription";
import GuestItem from "../Components/GuestItem";
import FormatInput from "../Components/FormatInput";
import RatingInput from "../Components/RatingInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class ProviderDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProvider: null,
      provider: null,
      isLoading: true,
      isPictureGalleryVisible: false,
      inputComment: "",
      inputRating: 0,
      isLoadingRating: false
    };
    this.callProvider = this.callProvider.bind(this);
    this.renderFeedbackItem = this.renderFeedbackItem.bind(this);
    this.handleFeedbackSubmit = this.handleFeedbackSubmit.bind(this);
  }

  componentWillMount() {
		var selectedProvider = this.props.navigation.getParam("selectedProvider", null);
    this.state.selectedProvider = selectedProvider;
	}

  componentDidMount(){
    Api.getDirectoryProviderDetail(this.state.selectedProvider.id).then(response => {
      if(response.status && response.status == "success"){
        let provider = response.content;
        provider.pictures = provider.pictures ? provider.pictures : [];
        console.log("Provider details", provider)
        this.setState({provider, isLoading: false});
      }else{
        Alert.alert(I18n.t("drawer_providers_title"), I18n.t("unknown_error"));
      }
    });
  }

  formatImageAddress(imageUrl){
    return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
  }

	formatAddressToDisplay(localization){
		if(localization == null){
			return I18n.t("provider_unknown_address");
		}else{
			return localization.label;
		}
	}

  formatShortAddressToDisplay(localization){
		if(localization == null){
			return I18n.t("provider_unknown_address");
		}else{
			return localization.city;
		}
	}

  callProvider(){
    if(this.state.provider && this.state.provider.phone){
      let formattedNumber = this.state.provider.phone.replace(" ", "");
      let url = "tel:"+formattedNumber;
      Linking.canOpenURL(url).then(isCapable => {
        if(isCapable){
          Linking.openURL(url);
        }else{
          console.warn("Not capable to handle link:", url);
          Alert.alert(I18n.t("linking_error_title"), I18n.t("linking_error_text"))
        }
      })
    }
  }

  handleFeedbackSubmit(){
    if(this.state.inputRating){
      this.setState({isLoadingRating: true});
      Api.addProviderFeedback(this.state.provider.id, {
        rating: this.state.inputRating,
        ratingComment: this.state.inputComment
      }).then(response => {
        if(response.status && response.status === "success"){
          this.setState({provider: response.content, isLoadingRating: false, inputRating: 0}, () => {
            Alert.alert(I18n.t("drawer_providers_title"), I18n.t("provider_feedback_success_alert"));
          });
        }else{
          Alert.alert(I18n.t("drawer_providers_title"), I18n.t(response.message));
        }
      });
    }
  }

  renderFeedbackItem({item}){
    return(
      <View style={Styles.feedbackItem}>
        <GuestItem
          disabled={true}
          chat={true}
          rating={item.rating}
          guest={item.userClient}/>
        {item.ratingComment && <Text style={Styles.feedbackContent}>{item.ratingComment}</Text>}
      </View>
    );
  }

  render() {
    let provider = this.state.provider;
    return (
      <View style={[Styles.container, Styles.containerList]}>
        <Header title={this.state.selectedProvider ? this.state.selectedProvider.name : I18n.t("drawer_providers_title")} onBackPressed={() => { this.props.navigation.goBack() }} />
        {this.state.isLoading && <MiitingLoader />}
        {provider !== null &&
          <KeyboardAwareScrollView
            keyboardDismissMode="on-drag"
            style={Styles.mainContainer}
            contentContainerStyle={Styles.mainContentContainer}>
            {provider.pictures.length > 0 && <View style={Styles.picturesPreviewContainer}>
              <TouchableOpacity
                onPress={()=>{this.setState({isPictureGalleryVisible: true})}}>
                <Image source={{uri: this.formatImageAddress(provider.pictures[0])}} resizeMode={"cover"} style={Styles.mainPicture}/>
                {provider.pictures.length > 1 && <View style={Styles.imageCountContainer}>
                  <Text style={Styles.imageCountText}>{"1 / " + provider.pictures.length}</Text>
                </View>}
              </TouchableOpacity>
            </View>}
            <View style={Styles.basicInfoContainer}>
              <Text style={Styles.mainTitleText}>{provider.name}</Text>
              <Text style={Styles.addressText}>{this.formatShortAddressToDisplay(provider.localization)}</Text>
              <Text style={Styles.addressText}>{provider.countRating > 0 ? I18n.t("rating_show_provider").replace("%VALUE%", provider.averageRating.toFixed(1)).replace("%COUNT%", provider.countRating) : I18n.t("rating_show_provider_empty")}</Text>
              <View style={Styles.actionButtons}>
                <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate("ProviderContact", {provider})}}
                  style={[Styles.orderProviderButton]}>
                  <LinearGradient
        							colors={["#547FFA", "#82ABFB"]}
        							start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
        							style={Styles.orderProviderButtonInner}>
        							<Text style={Styles.orderProviderButtonText}>{I18n.t("provider_details_order")}</Text>
        					</LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.callProvider}
                  disabled={!provider.phone}
                  style={[Styles.callProviderButton, provider.phone !== null ? null: Styles.disabled]}>
                  <Image source={Images.icons.phone} resizeMode={"contain"} style={Styles.callProviderIcon}/>
                </TouchableOpacity>
              </View>
              {provider.discount && provider.discount.length > 0 &&
                <View style={Styles.discountContainer}>
                  <Text style={Styles.discountText}>{I18n.t("provider_details_discount").replace("%%DISCOUNT%%", provider.discount)}</Text>
                </View>}
            </View>
            <View style={Styles.statsContainer}>
              <Text style={Styles.statsTitle}>{I18n.t("provider_details_stats_title")}</Text>
              <View style={Styles.stats}>
                {provider.attendeesMin && provider.attendeesMax && <View style={Styles.stat}>
                  <Image source={Images.icons.group} resizeMode={"contain"} style={Styles.statIcon}/>
                  <View style={Styles.statsLabels}>
                    <Text style={Styles.statLabelText}>{I18n.t("provider_details_stat_label_guests")}</Text>
                    <Text style={Styles.statContentText}>{provider.attendeesMin + " - " + provider.attendeesMax}</Text>
                  </View>
                </View>}
                {provider.priceMin && <View style={Styles.stat}>
                  <Image source={Images.icons.coins} resizeMode={"contain"} style={Styles.statIcon}/>
                  <View style={Styles.statsLabels}>
                    <Text style={Styles.statLabelText}>{I18n.t("provider_details_stat_label_price")}</Text>
                    <Text style={Styles.statContentText}>{I18n.t("provider_stat_label_price_inline") + " " + provider.priceMin + "€"}</Text>
                  </View>
                </View>}
              </View>
            </View>
            {provider.faq && <View style={[Styles.descriptionContainer, Styles.faqContainer]}>
              <ProviderDescription
                content={provider.faq} />
              </View>}
            {provider.content && <View style={Styles.descriptionContainer}>
              <Text style={Styles.descriptionTitle}>{I18n.t("provider_details_description_title")}</Text>
              <ProviderDescription
                content={provider.content} />
            </View>}
            {provider.localization && <View style={Styles.localizationContainer}>
              <Text style={Styles.descriptionTitle}>{I18n.t("provider_details_localization_title")}</Text>
              <Text numberOfLines={3} style={Styles.localizationText}>{this.formatShortAddressToDisplay(provider.localization)}</Text>
              {provider.map !== null && <Image source={{uri: provider.map}} style={Styles.mapImage} resizeMode={"contain"}/>}
            </View>}
            <View style={Styles.feedbacksContainer}>
              <FlatList
                ListHeaderComponent={
                  <View style={Styles.titleFeedbacksContainer}>
                    <Text style={Styles.titleFeedbacksText}>{I18n.t("provider_title_feedbacks")}</Text>
                  </View>
                }
                ListEmptyComponent={
                  <View style={Styles.emptyFeedbacksContainer}>
                    <Text style={Styles.emptyFeedbacksText}>{I18n.t("provider_empty_feedbacks")}</Text>
                  </View>
                }
                ListFooterComponent={
                  !provider.userAlreadyRated ? <View style={Styles.feedbackInput}>
                    <Text style={Styles.feedbackInputLabel}>{I18n.t("provider_input_label")}</Text>
                    <RatingInput
                      style={Styles.ratingInput}
                      onChange={value => this.setState({inputRating: value})}/>
                    {this.state.inputRating > 0 && <FormatInput
                      placeholder={I18n.t("provider_feedback_input_placeholder")}
                      onChangeText={inputComment => this.state.inputComment = inputComment}
                      multiline={true}/>}
                    <TouchableOpacity
                      disabled={this.state.inputRating === 0 && !this.state.isLoadingRating}
                      onPress={this.handleFeedbackSubmit}
                      style={[Styles.orderProviderButton, Styles.commentButton, this.state.inputRating === 0 ? Styles.disabled : null]}>
                      <LinearGradient
            							colors={["#547FFA", "#82ABFB"]}
            							start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
            							style={Styles.orderProviderButtonInner}>
            							<Text style={Styles.orderProviderButtonText}>{I18n.t("provider_details_comment")}</Text>
            					</LinearGradient>
                    </TouchableOpacity>
                  </View> : null
                }
                renderItem={this.renderFeedbackItem}
                data={provider.directoryProviderFeedbacks}/>
            </View>
            <View style={Styles.descriptionContainer}>
              <TouchableOpacity
                onPress={()=>{this.props.navigation.goBack()}}
                style={Styles.returnToListButton}>
                <Text style={Styles.returnToListButtonText}>{I18n.t("provider_details_return")}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>}
          {provider !== null &&
            <ImageGalleryModal
              images={provider.pictures}
              onClose={()=>{this.setState({isPictureGalleryVisible: false})}}
              isVisible={this.state.isPictureGalleryVisible}/>}
      </View>
    );
  }
}

export default ProviderDetailContainer;
