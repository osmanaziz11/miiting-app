import React, { Component } from "react";
import { View, Text, Switch, TouchableOpacity, FlatList, Image, ScrollView, Slider } from "react-native";
import Styles from "./Styles/FiltersStyles";
import Header from "../Components/Header";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import LinearGradient from "react-native-linear-gradient";
import AppConfig from "../Config/Appconfig";

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minCapacity: this.props.filters.capacity.selected,
            privateRoom: false,
            foodTypes: [],
            foodPreferences: [],
            refresh_list: true,
        };
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handlePrivateRoomChange = this.handlePrivateRoomChange.bind(this);
        this.handleFoodTypeChange = this.handleFoodTypeChange.bind(this);
        this.renderFoodType = this.renderFoodType.bind(this);
        this.renderFoodTag = this.renderFoodTag.bind(this);
        this.handleSelectFoodTag = this.handleSelectFoodTag.bind(this);
    }

    handleCapacityChange(num) {
        this.setState({ minCapacity: num });
    }

    handlePrivateRoomChange() {
        this.setState({ privateRoom: !this.state.privateRoom });
    }

    handleSelectFoodTag(id) {
        let foodPreferences = this.state.foodPreferences;
        if (this.state.foodPreferences.indexOf(id) !== -1) {
            this.setState({ foodPreferences: foodPreferences.filter(item => item !== id), refresh_list: !this.state.refresh_list });
        } else {
            foodPreferences.push(id);
            this.setState({ foodPreferences, refresh_list: !this.state.refresh_list });
        }
    }

    handleFoodTypeChange(id) {
        let foodTypes = this.state.foodTypes;
        if (this.state.foodTypes.indexOf(id) !== -1) {
            this.setState({ foodTypes: foodTypes.filter(item => item !== id), refresh_list: !this.state.refresh_list });
        } else {
            foodTypes.push(id);
            this.setState({ foodTypes, refresh_list: !this.state.refresh_list });
        }
    }

    formatImageUrl(imageUrl) {
		if (imageUrl == "") {
			return (imageUrl);
        }
		return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : "data:image/jpeg;base64," + imageUrl;
	}

    renderFoodType({ item }) {
        return (
            <TouchableOpacity onPress={() => { this.handleFoodTypeChange(item.id) }} style={[Styles.foodTypeItem, this.state.foodTypes.includes(item.id) ? Styles.selectedFoodTypeItem : null]}>
                {this.state.foodTypes.includes(item.id) &&
                    <Image source={Images.icons.applied_filter} style={Styles.selectedFoodTypeIcon} resizeMode={"center"} />
                }
                <Text style={Styles.foodTypeText}>{item.name}</Text>
                <Image source={{ uri: (item.picture !== null && item.picture !== "") ? this.formatImageUrl(item.picture) : "https://img.freepik.com/free-icon/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle_318-61086.jpg?size=338c&ext=jpg" }} style={Styles.foodTypeIcon} />
            </TouchableOpacity>
        )
    }

    renderFoodTag({ item, index }) {
        return (
            <RadioButton labelHorizontal={true} style={Styles.radioButton} key={index} >
                <RadioButtonLabel
                    obj={item}
                    index={index}
                    labelHorizontal={true}
                    onPress={() => this.handleSelectFoodTag(item.id)}
                    labelStyle={{ fontSize: 15, color: '#000', alignSelf: "flex-start", }}
                    labelWrapStyle={{}}
                />
                <RadioButtonInput
                    obj={item}
                    index={index}
                    isSelected={this.state.foodPreferences.includes(item.id)}
                    onPress={() => this.handleSelectFoodTag(item.id)}
                    borderWidth={2}
                    buttonInnerColor={this.state.foodPreferences.includes(item.id) ? "#547FFA" : "#F5F7FA"}
                    buttonOuterColor={this.state.foodPreferences.includes(item.id) ? "#547FFA" : "#CFD3D7"}
                    buttonSize={15}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                />
            </RadioButton>
        )
    }

    render() {
        const filters = this.props.filters;
        return (
            this.props.isOpen &&
            <View style={Styles.container}>
                <Header title={I18n.t("filter_places")} onCrossPressed={this.props.onClose} />
                <ScrollView contentContainerStyle={Styles.scrollView}>
                    <View style={Styles.filterContainer}>
                        <View style={Styles.row}>
                            <Text style={Styles.titles}>{`${I18n.t("filter_capacity")} ${this.state.minCapacity}`}</Text>
                            <Text style={Styles.capacityMinMax}>{filters.capacity.min}-{filters.capacity.max} {I18n.t("capacity_title")}</Text>
                        </View>
                        <Slider
                            style={Styles.slider}
                            step={1}
                            value={this.state.minCapacity}
                            minimumTrackTintColor={"#547FFA"}
                            maximumTrackTintColor={"#CFD3D7"}
                            thumbTintColor={"#547FFA"}
                            minimumValue={filters.capacity.min}
                            maximumValue={filters.capacity.max}
                            onValueChange={this.handleCapacityChange} />
                        <View style={Styles.row}>
                            <Text style={Styles.minNum}>{filters.capacity.min}</Text>
                            <Text style={Styles.maxNum}>{filters.capacity.max}</Text>
                        </View>
                    </View>
                    <View style={Styles.separator} />
                    <View style={Styles.filterContainer}>
                        <View style={Styles.row}>
                            <Text style={Styles.titles}>{I18n.t("private_room_title")}</Text>
                            <Switch value={this.state.privateRoom} onValueChange={this.handlePrivateRoomChange} tintColor={"#CFD3D7"} thumbTintColor={"#FFFFFF"} onTintColor={"#527afe"}></Switch>
                        </View>
                        <View style={[Styles.row, Styles.overflowDesc]}>
                            <Text style={Styles.descPrivateRoom}>{I18n.t("private_room_desc")}</Text>
                        </View>
                    </View>
                    <View style={Styles.separator} />
                    <View style={Styles.filterContainer}>
                        <View style={Styles.row}>
                            <Text style={Styles.titles}>{I18n.t("food_types_title")}</Text>
                        </View>
                        <FlatList
                            horizontal={false}
                            numColumns={3}
                            contentContainerStyle={Styles.foodTypesList}
                            data={filters.food_types}
                            renderItem={this.renderFoodType}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state.refresh_list} />
                    </View>
                    <View style={Styles.separator} />
                    <View style={Styles.filterContainer}>
                        <View style={Styles.row}>
                            <Text style={Styles.titles}>{I18n.t("food_tags_title")}</Text>
                        </View>
                        <RadioForm
                            formHorizontal={true}
                            animation={true}>
                            <FlatList
                                contentContainerStyle={Styles.foodTagsList}
                                horizontal={false}
                                data={filters.food_tags}
                                renderItem={this.renderFoodTag}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state.refresh_list} />
                        </RadioForm>
                    </View>
                    <TouchableOpacity
                        ref={"buttonSubmit"}
                        onPress={() => { this.props.onSave(this.state)}}>
                        <LinearGradient
                            colors={["#547FFA", "#82ABFB"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.buttonSubmit}>
                            <Text style={Styles.buttonText}>{I18n.t("save_filters_button")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

export default Filters;