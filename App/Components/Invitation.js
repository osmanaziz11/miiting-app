import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Alert, Platform, ActionSheetIOS, Picker } from "react-native";
import Styles from "./Styles/InvitationStyles";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Api from "../Config/Apiconfig";
import DateTimePicker from "react-native-modal-datetime-picker";

class Invitation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kinds: [],
            button1: true,
            button2: false,
            guest: {
                firstname: "",
                lastname: "",
                email: "",
                function: "",
                function_name: "",
                birthdate: "",
                phone: "",
            },
            isDatePickerVisible: false,
            picked_type: "",
            pickerVisible: false,
        };
        this._handleDatePicked = this._handleDatePicked.bind(this);
        this._hideDatePicker = this._hideDatePicker.bind(this);
        this._showDatePicker = this._showDatePicker.bind(this);
    }

    componentDidMount() {
        this.getProvidersKinds();
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }


    setPickerVisible(bool) {
        this.setState({ pickerVisible: bool })
    }

    _handlePickerIOS() {
        var options = [];
        var ids = [];
        Api.getProvidersKinds()
            .then(response => {
                var content = response.content;
                for (var i in content) {
                    options.push(content[i].name);
                    ids.push(content[i].id)
                }
                options.unshift('Cancel');
                ids.unshift('Cancel');
                ActionSheetIOS.showActionSheetWithOptions({
                    options: options,
                    cancelButtonIndex: 0,
                },
                    (buttonIndex) => {
                        if (buttonIndex === 0) {
                            this.setState({ pickerVisible: false })
                        } else {
                            this.state.guest.function = ids[buttonIndex];
                            this.state.guest.function_name = options[buttonIndex];
                            this.setState({ pickerVisible: false, picked_type: options[buttonIndex], picked_type_id: parseInt(ids[buttonIndex]), guest: this.state.guest }, () => { this.props.onChange(this.state.guest) })
                        }
                    })
            })
    }

    getProvidersKinds() {
        Api.getProvidersKinds()
            .then(response => {
                switch (response.status) {
                    case "success":
                        this.state.guest.function = response.content[0].id;
                        this.state.guest.function_name = response.content[0].name;
                        this.setState({ kinds: response.content, picked_type: response.content[0].name, picked_type_id: response.content[0].id });
                        break;
                    case "error":
                        break;
                    default:
                        break;
                }
            })
    }

    _handlePickerANDROID() {
        if (!this.state.pickerVisible) {
            var options = [];
            for (var i in this.state.kinds) {
                options.push(<Picker.Item key={this.state.kinds[i].id} label={this.state.kinds[i].name} value={this.state.kinds[i].name} />)
            }
            return (
                <Picker
                    selectedValue={this.props.guest.function_name}
                    style={Styles.picker}
                    onValueChange={(itemValue, itemIndex) => {
                        this.state.guest.function = this.state.kinds[itemIndex].id;
                        this.state.guest.function_name = this.state.kinds[itemIndex].name;
                        this.setState({ picked_type: itemValue, picked_type_id: parseInt(this.state.kinds[itemIndex].id), pickerVisible: false, guest: this.state.guest }, () => { this.props.onChange(this.state.guest) })
                    }}
                    mode={"dropdown"}>
                    {options}
                </Picker>
            )
        }
    }

    _showDatePicker() {
        this.setState({ isDatePickerVisible: true });
    }

    _hideDatePicker() {
        this.setState({ isDatePickerVisible: false });
    }

    _handleDatePicked(date) {
        var day = this.addZero(date.getDate());
        var month = this.addZero(date.getMonth() + 1);
        var year = this.addZero(date.getFullYear());
        var datePicked = `${day}/${month}/${year}`;
        this.state.guest.birthdate = datePicked;
        this._hideDatePicker();
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <Text style={Styles.headerTitle}>{(this.props.provider ? "Prestataire " : "Invité ") + (this.props.invit_key + 1)}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onCrossPressed()
                        }}
                        style={Styles.deleteInvitationButton}>
                        <Image source={Images.icons.delete_invite_icon} style={Styles.deleteInvitationImg} />
                    </TouchableOpacity>
                </View>
                <View style={Styles.formContainer}>
                    <View>
                        <Text style={Styles.textInputLabel}>{I18n.t("input_firstname_label")}</Text>
                        <View
                            style={Styles.textInputContainer}>
                            <TextInput
                                ref={"inputFirstName"}
                                autoCapitalize={"sentences"}
                                keyboardType={"default"}
                                autoCorrect={false}
                                returnKeyType={"next"}
                                underlineColorAndroid={"transparent"}
                                placeholder={I18n.t("register_firstname_placeholder")}
                                placeholderTextColor={"#8a91a1"}
                                value={this.props.guest.firstname}
                                onChangeText={value => {
                                    this.state.guest.firstname = value;
                                    this.setState({ guest: this.state.guest }, () => { this.props.onChange(this.state.guest) })
                                }}
                                style={Styles.textInput} />
                        </View>
                        <Text style={Styles.textInputLabel}>{I18n.t("input_lastname_label")}</Text>
                        <View
                            style={Styles.textInputContainer}>
                            <TextInput
                                ref={"inputLastName"}
                                autoCapitalize={"sentences"}
                                keyboardType={"default"}
                                autoCorrect={false}
                                value={this.props.guest.lastname}
                                returnKeyType={"next"}
                                underlineColorAndroid={"transparent"}
                                placeholder={I18n.t("register_lastname_placeholder")}
                                placeholderTextColor={"#8a91a1"}
                                onChangeText={value => {
                                    this.state.guest.lastname = value;
                                    this.setState({ guest: this.state.guest }, () => { this.props.onChange(this.state.guest) })
                                }}
                                style={Styles.textInput} />
                        </View>
                        <Text style={Styles.textInputLabel}>{I18n.t("input_email_label")}</Text>
                        <View
                            style={Styles.textInputContainer}>
                            <TextInput
                                ref={"inputEmail"}
                                autoCapitalize={"none"}
                                keyboardType={"email-address"}
                                value={this.props.guest.email}
                                autoCorrect={false}
                                returnKeyType={"next"}
                                underlineColorAndroid={"transparent"}
                                placeholder={I18n.t("input_email_placeholder")}
                                placeholderTextColor={"#8a91a1"}
                                onChangeText={value => {
                                    this.state.guest.email = value;
                                    this.setState({ guest: this.state.guest }, () => { this.props.onChange(this.state.guest) })
                                }}
                                style={Styles.textInput} />
                        </View>
                        {!this.props.provider &&
                            <View>
                                <Text style={Styles.textInputLabel}>{I18n.t("input_phone_label")}</Text>
                                <View
                                    style={Styles.textInputContainer}>
                                    <TextInput
                                        ref={"inputPhone"}
                                        underlineColorAndroid={"transparent"}
                                        autoCapitalize={"none"}
                                        autoCorrect={false}
                                        value={this.props.guest.phone}
                                        returnKeyType={"next"}
                                        placeholder={I18n.t("register_phone_placeholder")}
                                        onChangeText={value => {
                                            this.state.guest.phone = value;
                                            this.setState({ guest: this.state.guest }, () => { this.props.onChange(this.state.guest) })
                                        }}
                                        style={Styles.textInput} />
                                </View>
                                <View><Text style={Styles.textInputLabel}>{I18n.t("input_birthdate_label")}</Text>
                                    <View
                                        style={Styles.textInputContainer}>
                                        <TouchableOpacity onPress={this._showDatePicker} style={Styles.pickers}>
                                            <Text containerStyle={Styles.textInput}>{this.props.guest.birthdate.length <= 0 ? "Choisissez une date" : this.props.guest.birthdate}</Text>
                                            <Image source={Images.icons.date_picker_icon} style={Styles.pickers_icons} />
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isDatePickerVisible}
                                            onConfirm={this._handleDatePicked}
                                            onCancel={this._hideDatePicker}
                                            mode={"date"}
                                            cancelTextIOS={I18n.t("datetime_picker_cancel_text")}
                                            confirmTextIOS={I18n.t("datetime_picker_confirm_text")}
                                            titleIOS={I18n.t("modal_title_date_picker")} />
                                    </View></View>
                            </View>
                        }
                        {this.props.provider ?
                            <View>
                                {Platform.OS === "ios" ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setPickerVisible(true),
                                                this._handlePickerIOS()
                                        }}
                                        style={Styles.picker}>
                                        <Text style={Styles.modalToggle}>{this.props.guest.function_name}</Text>
                                        <Image source={Images.icons.picker_icon} style={Styles.options_picker_icon} />
                                    </TouchableOpacity>
                                    : this._handlePickerANDROID()}
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default Invitation;