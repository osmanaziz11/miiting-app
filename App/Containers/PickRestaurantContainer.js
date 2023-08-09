import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Linking } from "react-native";
import Styles from "./Styles/PickRestaurantStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import SearchBar from "../Components/SearchBar";
import Images from "../Themes/Images";
import Filters from "../Components/Filters";
import Api from "../Config/Apiconfig";
import MiitingLoader from "../Components/MiitingLoader";
import GooglePlacesInput from "../Components/GooglePlacesInput";
import LinearGradient from "react-native-linear-gradient";

class PickRestaurantContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place_pick: "",
            place_details: "",
            selected_place: "",
            event_place: null,
            is_loading: true,
            restaurants: [],
            filter_open: false,
            savedFilters: {
                minCapacity: 10,
                privateRoom: false,
                foodPreferences: [],
                foodTypes: [],
            },
            filters: {
                location: {
                    latitude: "1.310930139",
                    longitude : "13.3131837427"
                },
                capacity: {
                    min: 0,
                    max: 200,
                    selected: 10,
                },
                private_room: false,
                food_types: [],
                food_tags: []
            },
        };
        this._handlePlacePicked = this._handlePlacePicked.bind(this);
        this.renderRestaurant = this.renderRestaurant.bind(this);
        this.params = this.props.navigation.state.params;
    }

    componentDidMount() {
        if (this.params.event_type === "Anniversaire") {
            Api.getFoodTypes()
            .then(response => {
                switch(response.status) {
                    case "success":
                        this.state.filters.food_types = response.content;
                        break;
                    case "error":
                        console.log(response);
                        break;
                    default:
                        console.log(response);
                        break;
                }
            });
            Api.getFoodTags()
            .then(response => {
                switch(response.status) {
                    case "success":
                        let food_tags = [];
                        response.content.map((item, index) => {
                            food_tags.push({
                                label: item.name,
                                id: item.id,
                            });
                        });
                        this.state.filters.food_tags = food_tags;
                        break;
                    case "error":
                        console.log(response);
                        break;
                    default:
                        console.log(response);
                        break;
                }
            });
            this.getRestaurants();
        }
    }

    getRestaurants() {
        var infos = {
                location: {
                    latitude: this.state.event_place !== null ? this.state.event_place.latitude : this.state.filters.location.latitude,
                    longitude : this.state.event_place !== null ? this.state.event_place.longitude : this.state.filters.location.longitude
                },
                foodTypes: [...this.state.savedFilters.foodTypes],
                foodPreferences: this.state.savedFilters.foodPreferences,
                minCapacity: this.state.savedFilters.minCapacity,
                privateRoom : this.state.savedFilters.privateRoom,
        }
        Api.getRestaurants(infos)
        .then(response => {
            switch (response.status) {
                case "success":
                    this.setState({ is_loading: false, restaurants: response.content })
                    break;
                case "error":
                    console.log(response);
                    break;
                default:
                    break;
            }
        })
    }

    handleCallRestaurant(phone) {
      let formattedNumber = phone.replace(" ", "");
      if(formattedNumber[0] == "0") formattedNumber = "+33" + formattedNumber.substr(1, formattedNumber.length - 1);
      Linking.canOpenURL("tel:"+formattedNumber).then(isCapable=> {
        if(isCapable){
          Linking.openURL("tel:"+formattedNumber);
        }else{
          console.warn("Not capable to open link:", "tel:" + formattedNumber);
          Alert.alert(I18n.t("linking_error_title"), I18n.t("device_unable"));
        }
      });
    }

    renderRestaurant({ item, index }) {
        return (
            <TouchableOpacity
              disabled={item.phone == undefined && item.phone == null}
              onPress={() => {this.handleCallRestaurant(item.phone)}}>
                <View style={Styles.restaurantItem}>
                    <View style={Styles.restaurantIconContainer}>
                        <Image source={Images.icons.restaurant_icon} style={Styles.restaurantIcon} />
                    </View>
                    <View style={Styles.restaurantItemContent}>
                        <View style={Styles.row}>
                            <Text style={Styles.restaurantName}>{item.name}</Text>
                        </View>
                        <View style={Styles.row}>
                            <Text style={Styles.restaurantAddress}>{item.localization.address+ (item.phone != undefined && item.phone != null? " - "+item.phone : "")}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    selectRestaurant(index) {
        this.setState({ selected_place: this.state.place_pick });
    }

    _handlePlacePicked(data, details) {
      console.log("Data", data)
      console.log("Details", details)
      let resultLocalization = {
        address: null,
        city: null,
        zip: null,
        country: null,
        latitude: null,
        longitude: null
      }

      if(details != null && details.geometry !== undefined){
        resultLocalization.latitude = details.geometry.location.lat;
        resultLocalization.longitude = details.geometry.location.lng;
      }

      if(details !== null && details.address_components !== undefined){
        if(details.address_components.filter(component => component.types.indexOf("postal_code") > -1).length > 0){
          resultLocalization.zip = details.address_components
            .filter(component => component.types.indexOf("postal_code") > -1)[0].long_name;
        }
        if(details.address_components.filter(component => component.types.indexOf("locality") > -1).length > 0){
          resultLocalization.city = details.address_components
            .filter(component => component.types.indexOf("locality") > -1)[0].long_name;
        }
        if(details.address_components.filter(component => component.types.indexOf("country") > -1).length > 0){
          resultLocalization.country = details.address_components
            .filter(component => component.types.indexOf("country") > -1)[0].long_name;
        }

        if(details.name !== resultLocalization.city && details.name !== resultLocalization.country){
          resultLocalization.address = details.name;
        }
      }
      if(data.types.indexOf("establishment") > -1){
        let streetAddress = "";
        let streetAddressArray = details.address_components
          .filter(component => component.types.indexOf("route") > -1);
          if(streetAddressArray.length > 0){
            streetAddress = " - " + streetAddressArray[0].long_name
          }
        resultLocalization.address = details.name + streetAddress;
      }
      this.setState({ place_details: details, place_pick: data, event_place: resultLocalization }, () => this.getRestaurants());
    }

    render() {
        return (
            <View style={Styles.container}>
                <Header title={I18n.t("place_title")}
                    onBackPressed={() => { this.props.navigation.goBack() }}
                    onFilterPressed={this.params.event_type === "Anniversaire" ? () => this.setState({ filter_open: true }) : null} />
                {this.params.event_type === "Anniversaire" &&
                    <Filters onSave={(filters) => {
                        this.setState({
                            savedFilters: filters,
                            filter_open: false,
                            is_loading: true
                        }, this.getRestaurants)}} onClose={() => this.setState({ filter_open: false })} isOpen={this.state.filter_open} filters={this.state.filters} />
                }
                <ScrollView style={Styles.scrollView}>
                    <View style={Styles.gGPAContainer}>
                        <GooglePlacesInput textInputProps={{autoFocus: true}} onPlaceChosen={this._handlePlacePicked} icon={false}/>
                    </View>
                    <View style={Styles.separator} />
                    {(this.state.place_pick.length !== 0 && this.params.event_type === "Anniversaire") &&
                        <View>
                            <View style={Styles.placePickedContainer}>
                                <Image source={Images.icons.loc_grey} style={Styles.locationIcon} />
                                <Text style={Styles.placePickedText}>{this.state.place_details.formatted_address}</Text>
                            </View>
                            {this.state.is_loading &&
                                <MiitingLoader />
                            }
                            {this.state.restaurants.length == 0 &&
                                <View style={Styles.noRestaurants}>
                                    <Text>{I18n.t("no_restaurants")}</Text>
                                </View>
                            }
                            <View style={Styles.restaurantList}>
                                <FlatList
                                    data={this.state.restaurants}
                                    renderItem={this.renderRestaurant}
                                    keyExtractor={(item, index) => index.toString()} />
                            </View>
                        </View>
                    }
                    <TouchableOpacity
                        ref={"buttonSubmit"}
                        disabled={this.state.event_place === null}
                        onPress={() => { this.props.navigation.navigate(this.props.navigation.state.params.route, {...this.props.navigation.state.params, event_place: this.state.event_place, filterAddress: this.state.event_place }) }}>
                        <LinearGradient
                            colors={["#547FFA", "#82ABFB"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.buttonSubmit}>
                            <Text style={Styles.buttonText}>{I18n.t("validate")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default PickRestaurantContainer;
