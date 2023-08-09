import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform, Alert, Image } from "react-native";
import AppConfig from "../Config/Appconfig";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Styles from "./Styles/ProviderDirectoryItemStyles";
import LinearGradient from "react-native-linear-gradient";

class ProviderDirectoryItem extends Component {

	constructor(props) {
		super(props);
	}

	formatImageAddress(imageUrl){
    return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
  }

	formatAddressToDisplay(localization){
		if(localization == null){
			return I18n.t("provider_unknown_address");
		}else{
			return localization.city;
		}
	}

	render() {
		let provider = this.props.provider;
		return (
			<TouchableOpacity
				{...this.props}
				onPress={this.props.onPress}
				style={Styles.container}>
				{provider.mainPicture && <View style={Styles.pictureContainer}>
					<Image source={{uri: this.formatImageAddress(provider.mainPicture)}} resizeMode={"cover"} style={Styles.picture}/>
				</View>}
				<View style={Styles.infoContainer}>
					<Text numberOfLines={1} style={Styles.nameText}>{provider.name}</Text>
					<Text numberOfLines={2} style={Styles.addressText}>{this.formatAddressToDisplay(provider.localization)}</Text>
					<Text numberOfLines={3} style={Styles.descriptionText}>{provider.shortContent}</Text>
					<View style={Styles.statsContainer}>
						{provider.priceMin && <View style={Styles.stat}>
							<Text style={Styles.statLabelText}>{I18n.t("provider_stat_label_price")}</Text>
							<View style={Styles.statContent}>
								<Image source={Images.icons.coins} style={Styles.statIcon} resizeMode={"contain"}/>
								<Text style={Styles.statContentText}>{provider.priceMin + " €"}</Text>
							</View>
						</View>}
						{provider.attendeesMin && provider.attendeesMax && <View style={Styles.stat}>
							<Text style={Styles.statLabelText}>{I18n.t("provider_stat_label_guests")}</Text>
							<View style={Styles.statContent}>
								<Image source={Images.icons.group} style={Styles.statIcon} resizeMode={"contain"}/>
								<Text style={Styles.statContentText}>{provider.attendeesMin + " - " + provider.attendeesMax}</Text>
							</View>
						</View>}
						{provider.discount && provider.discount.length > 0 && <View style={Styles.stat}>
							<Text style={[Styles.statLabelText, Styles.statLabelDiscount]}>{I18n.t("provider_stat_label_discount")}</Text>
							<View style={Styles.statContent}>
								<Image source={Images.icons.discount} style={Styles.statIcon} resizeMode={"contain"}/>
								<Text style={[Styles.statContentText, Styles.statContentDiscount]}>{I18n.t("provider_stat_content_discount")}</Text>
							</View>
						</View>}
					</View>
					<LinearGradient
							colors={["#547FFA", "#82ABFB"]}
							start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
							style={Styles.buttonSubmit}>
							<Text style={Styles.buttonText}>{I18n.t("provider_view_more")}</Text>
					</LinearGradient>
				</View>
			</TouchableOpacity>
		)
	}
}

export default ProviderDirectoryItem;
