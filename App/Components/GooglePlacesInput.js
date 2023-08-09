import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AppConfig from "../Config/Appconfig";
import Styles from "./Styles/GooglePlacesInputStyles";
import Images from "../Themes/Images";

class GooglePlacesInput extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<GooglePlacesAutocomplete
				placeholder="Rechercher"
				minLength={2}
				autoFocus={false}
				returnKeyType={"search"}
				listViewDisplayed="true"
				textInputProps={{
					clearButtonMode: "never",
					...this.props.textInputProps
				}}
				predefinedPlacesAlwaysVisible={true}
				fetchDetails={true}
				renderDescription={row => row.description || row.vicinity + " " + row.name}
				onPress={this.props.onPlaceChosen}

				getDefaultValue={() => ""}

				query={{
					key: AppConfig.GAKey,
					language: "fr",
				}}

				styles={this.props.style ? {...Styles, ...this.props.style} : Styles} // since the `styles` prop is an object, we recreate one by destructuring StyleSheet and custom style if exists
				enableEmptySections={false}
				currentLocation={true}
				currentLocationLabel="Ma position actuelle"
				nearbyPlacesAPI="GooglePlacesSearch"
				GoogleReverseGeocodingQuery={{

				}}
				GooglePlacesSearchQuery={{
					rankby: "distance",
					types: "food"
				}}

				suppressDefaultStyles
				filterReverseGeocodingByTypes={["locality", "administrative_area_level_3"]}
				debounce={200}>
					{this.props.icon && <Image source={Images.icons.location} style={Styles.location_picker} resizeMode={"contain"}/>}
				</GooglePlacesAutocomplete>
		);
	}
}

export default GooglePlacesInput;
