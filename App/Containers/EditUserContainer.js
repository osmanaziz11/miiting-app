import React, { Component } from "react";
import { Text, View, TextInput, Alert, TouchableOpacity, Image, AsyncStorage, Keyboard, Platform, Picker, ActionSheetIOS, Switch} from "react-native";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Api from "../Config/Apiconfig";
import AppConfig from "../Config/Appconfig";
import Header from "../Components/Header";
import LinearGradient from "react-native-linear-gradient";
import GestureRecognizer from 'react-native-swipe-gestures';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MiitingLoader from "../Components/MiitingLoader";
import Styles from "./Styles/EditUserStyles";
import ImagePicker from "react-native-image-crop-picker";
import AddButton from "../Components/AddButton";
import Metrics from "../Themes/Metrics";
import DateTimePicker from 'react-native-modal-datetime-picker';

class EditUserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            photo: "",
            passwordVisible: false,
            birthday: "",
            single: false,
            err_date: false,
            selectedLanguage: null,
            languagesOptions: [
              {
                locale: "en",
                label: "English"
              },
              {
                locale: "fr",
                label: "Français"
              },
              {
                locale: "es",
                label: "Español"
              }
            ]
        };
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleAddPhoto = this.handleAddPhoto.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.replaceOwnerPic = this.replaceOwnerPic.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this._showDatePicker = this._showDatePicker.bind(this);
        this._hideDatePicker = this._hideDatePicker.bind(this);
        this._handleDatePicked = this._handleDatePicked.bind(this);
        this.openLanguagePicker = this.openLanguagePicker.bind(this);
        this.selectedLanguage = this.selectedLanguage.bind(this);
    }

    componentDidMount(){
        let currentLocale = I18n.getCurrentLocale();
        let selectedLanguage = this.state.languagesOptions.findIndex(item => item.locale == currentLocale);
        this.setState({
          single: this.props.navigation.state.params.content.single,
          photo: this.props.navigation.state.params.content.picture ? this.props.navigation.state.params.content.picture : "",
          selectedLanguage: selectedLanguage !== -1 ? selectedLanguage : null,
        });
    }

    togglePassword() {
        this.setState({ passwordVisible: !this.state.passwordVisible });
    }

    validateDate() {
  		return this.state.birthday.length <= 0;
  	}

    _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  	_hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  	_handleDatePicked = (date) => {
  		var day = this.addZero(date.getDate());
  		var month = this.addZero(date.getMonth() + 1);
  		var year = this.addZero(date.getFullYear());
  		var datePicked = `${day}/${month}/${year}`;
  		this.setState({ birthday: datePicked });
  		this._hideDatePicker();
  	};

    addZero(i) {
  		if (i < 10) {
  			i = "0" + i;
  		}
  		return i;
  	}

    handleAddPhoto () {
        if (this.state.photo === "") {
            ImagePicker.openPicker({
              width: 600,
              height: 600,
              includeBase64: true,
              cropperToolbarColor: "#547FFA",
              cropping: true
            }).then(response => {
              if (response.data) {
                      this.setState({ photo: response.data })
                  }
}           );
        } else {
            this.setState({ photo: "" });
        }
    }

    handleLogout() {
      Api.userLogout().then(response => {
        switch (response.status) {
          case "success":
            AsyncStorage.multiRemove([
              "@login:password",
              "@login:token",
              "@savedEvent:id"
            ], (error) => {
              if (error != null) console.error("Error while removing savedLogin", error);
              AsyncStorage.getItem("@push:token", (error, result) =>{
                if(!error) Api.tokenRemove(result);
              });
              this.props.navigation.replace("Launch");
            });
            break;
          case "error":
            Alert.alert(I18n.t("logout_title"), I18n.t(response.message));
            break;
          default:
            Alert.alert(I18n.t("logout_title"), I18n.t("unknown_error"));
        }
      });
    }

    handleEditUser() {
        Api.editUser({
            email: this.state.email.length == 0 ? this.props.navigation.state.params.content.email : this.state.email,
            firstname: this.state.firstname.length == 0 ? this.props.navigation.state.params.content.firstname : this.state.firstname,
            lastname: this.state.lastname.length == 0 ? this.props.navigation.state.params.content.lastname : this.state.lastname,
            password: this.state.password,
            photo: this.state.photo,
            birthday: this.state.birthday.length == 0 ? this.props.navigation.state.params.content.birthday : this.state.birthday,
            single: this.state.single
        }).then(response => {
            switch (response.status) {
                case "success":
                    AsyncStorage.multiSet([
                        ["@login:firstname", response.content.firstname],
                        ["@login:lastname", response.content.lastname],
                        ["@login:token", response.PHPSESSID]
                    ], error => {
                        if (error == null) {
                            if(this.state.password != "") AsyncStorage.setItem("@login:password", this.state.password)
                            response.content.events = this.props.navigation.state.params.content.events;
                            response.content.picture = this.state.photo;
                            response.content.name = `${response.content.firstname} ${response.content.lastname}`;
                            this.replaceOwnerPic(this.state.photo);
                            if(this.state.email.length == 0){
                              this.props.navigation.replace("Dashboard", { content: response.content, currentEvent: this.props.navigation.state.params.currentEvent });
                            }else{
                              AsyncStorage.setItem("@login:email", this.state.email).then(()=>{
                                this.props.navigation.replace("Login");
                              });
                            }
                        } else {
                            console.log(error)
                        }
                    })
                    break;
                case "error":
                  if(response.message && response.message == "mail_already_used"){
                    Alert.alert(I18n.t("edit_user_title"), I18n.t("edit_user_mail_already_used"))
                  }
                    break;
                default:
                    break;
            }
        })

    }

    replaceOwnerPic(pic) {
        let owners = this.props.navigation.state.params.currentEvent.owners;
        let user = this.props.navigation.state.params.content;
        owners.map((item, index) => {
            if (item.id == user.id) {
                item.picture = pic;
            }
        });
    }

    formatImageUrl(imageUrl) {
		if (imageUrl == "") {
			return (imageUrl);
        }
		return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : "data:image/jpeg;base64," + imageUrl;
	}

  openLanguagePicker(){
    if(Platform.OS == "ios"){
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [I18n.t("picker_cancel_option"), ...this.state.languagesOptions.map(item => item.label)],
          cancelButtonIndex: 0,
        },
        index => {
          if(index !== 0){
            this.selectedLanguage(index -1);
          }
        }
      )
    }
  }

  selectedLanguage(index){
    I18n.locale = this.state.languagesOptions[index].locale;
    this.setState({selectedLanguage: index});
  }

    render() {
        return (
            <View
                style={Styles.container}
                onSwipeDown={() => { Keyboard.dismiss() }}>
                <Header title={I18n.t("edit_user_title")}
                    onBackPressed={() => { this.props.navigation.goBack() }}/>
                <KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} keyboardDismissMode="on-drag">
                    <View style={Styles.languagePickerContainer}>
                      <Text style={Styles.textInputLabel}>{I18n.t("input_language_label")}</Text>
                      {this.state.selectedLanguage !== null && <TouchableOpacity
                        style={Styles.picker}
                        disabled={Platform.OS === "android"}
                        onPress={this.openLanguagePicker}>
                        <Image resizeMode={"contain"} source={Images.icons["flag_" + this.state.languagesOptions[this.state.selectedLanguage].locale]} style={Styles.pickerFlagIcon}/>
                        {Platform.OS == "ios" && <Text style={Styles.pickerValueText}>{this.state.languagesOptions[this.state.selectedLanguage].label}</Text>}
                        {Platform.OS == "android" && this.state.languagesOptions.length > 0 &&
                          <Picker
                            selectedValue={this.state.languagesOptions[this.state.selectedLanguage].locale}
                            style={Styles.languagePickerAndroid}
                            mode={"dropdown"}
                            onValueChange={(value, index) => {this.selectedLanguage(index)}}>
                            {this.state.languagesOptions.map((item) => <Picker.Item label={item.label} value={item.locale}/>)}
                          </Picker>}
                      </TouchableOpacity>}
                    </View>
                    <View style={Styles.formContainer}>
                        <View>
                            <Text style={Styles.textInputLabel}>{I18n.t("input_email_label")}</Text>
                            <View
                                style={Styles.textInputContainer}>
                                <TextInput
                                    ref={"inputEmail"}
                                    underlineColorAndroid={"transparent"}
                                    autoCapitalize={"none"}
                                    keyboardType={"email-address"}
                                    autoCorrect={false}
                                    returnKeyType={"next"}
                                    placeholder={this.props.navigation.state.params.content.email}
                                    onChangeText={value => { this.setState({ email: value }) }}
                                    onSubmitEditing={() => { this.focus("inputFirstName") }}
                                    style={Styles.textInput} />
                            </View>
                            <Text style={Styles.textInputLabel}>{I18n.t("input_firstname_label")}</Text>
                            <View
                                style={Styles.textInputContainer}>
                                <TextInput
                                    ref={"inputFirstName"}
                                    underlineColorAndroid={"transparent"}
                                    autoCapitalize={"sentences"}
                                    autoCorrect={false}
                                    returnKeyType={"next"}
                                    placeholder={this.props.navigation.state.params.content.firstname}
                                    onChangeText={value => { this.setState({ firstname: value }) }}
                                    onSubmitEditing={() => { this.focus("inputLastName") }}
                                    style={Styles.textInput} />
                            </View>
                            <Text style={Styles.textInputLabel}>{I18n.t("input_lastname_label")}</Text>
                            <View
                                style={Styles.textInputContainer}>
                                <TextInput
                                    ref={"inputLastName"}
                                    underlineColorAndroid={"transparent"}
                                    autoCorrect={false}
                                    autoCapitalize={"sentences"}
                                    returnKeyType={"next"}
                                    placeholder={this.props.navigation.state.params.content.lastname}
                                    onChangeText={value => { this.setState({ lastname: value }) }}
                                    onSubmitEditing={() => { this.focus("inputPassword") }}
                                    style={Styles.textInput} />
                            </View>
                            <Text style={Styles.textInputLabel}>{I18n.t("input_password_label")}</Text>
                            <View
                                style={Styles.textInputContainer}>
                                <TextInput
                                    ref={"inputPassword"}
                                    autoCapitalize={"none"}
                                    secureTextEntry={!this.state.passwordVisible}
                                    underlineColorAndroid={"transparent"}
                                    returnKeyType={"done"}
                                    autoCorrect={false}
                                    placeholder={I18n.t("register_password_placeholder")}
                                    onChangeText={value => { this.setState({ password: value }) }}
                                    onSubmitEditing={this.handleEditUser}
                                    style={Styles.textInput} />
                                <TouchableOpacity style={Styles.showPassword}
                                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                                    onPress={this.togglePassword}>
                                    <Image resizeMode={"contain"} style={Styles.showPasswordImg} source={Images.icons.eye} />
                                </TouchableOpacity>
                            </View>
                            <Text style={Styles.textInputLabel}>{I18n.t("input_birthdate_label")}</Text>
                						<View
                							style={Styles.textInputContainer}>
                							<TouchableOpacity onPress={this._showDatePicker} style={Styles.pickers}>
                								<View containerStyle={Styles.textInput}>
                									<Text style={Styles.errorTextInputText}>{
                                    this.state.birthday.length <= 0 ? (
                                      this.props.navigation.state.params.content.birthday ? this.props.navigation.state.params.content.birthday :  "Choisissez une date"
                                    ) : this.state.birthday}</Text>
                								</View>
                								<Image source={Images.icons.date_picker_icon} style={Styles.pickers_icons} resizeMode={"contain"} />
                							</TouchableOpacity>
                							<DateTimePicker
                								isVisible={this.state.isDatePickerVisible}
                								onConfirm={this._handleDatePicked}
                								onCancel={this._hideDatePicker}
                								maximumDate={new Date()}
                								mode={"date"}
                								cancelTextIOS={I18n.t("datetime_picker_cancel_text")}
                								confirmTextIOS={I18n.t("datetime_picker_confirm_text")}
                								titleIOS={I18n.t("modal_title_date_picker")} />
                						</View>
                        </View>
                        <View style={Styles.singleInputContainer}>
                          <Text style={Styles.singleInputLabel}>{I18n.t("edit_user_single_input_label")}</Text>
                          <Switch value={this.state.single} onValueChange={single => this.setState({ single })} trackColor={"#527afe"} thumbColor={"#FFFFFF"}></Switch>
                        </View>
                        <View style={Styles.previewContainer}>
                            <View style={Styles.addPhotoContainer}>
                                {(this.state.photo !== null && this.state.photo.length > 0) ?
                                    <View style={Styles.eventPhotoPreview}>
                                        <Image source={{ uri: this.formatImageUrl(this.state.photo) }} style={Styles.eventPhotoPreviewImg} resizeMode={"cover"} />
                                    </View>
                                    :
                                    <AddButton onPress={this.handleAddPhoto} textStyles={Styles.addButtonText} text={I18n.t("add_profile_picture")}/>
                                }
                            </View>
                            {(this.state.photo !== null && this.state.photo.length > 0) && <TouchableOpacity
                              onPress={()=>{this.setState({photo : ""})}}>
                              <Text style={Styles.removePictureButtonText}>{I18n.t("remove_profile_picture")}</Text>
                            </TouchableOpacity>}
                        </View>

                        {this.state.is_loading &&
                            <MiitingLoader />
                        }
                        <TouchableOpacity
                            ref={"buttonSubmit"}
                            onPress={this.handleEditUser}
                            disabled={this.state.is_loading}>
                            <LinearGradient
                                colors={["#547FFA", "#82ABFB"]}
                                start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                                style={Styles.buttonSubmit}>
                                <Text style={Styles.buttonText}>{I18n.t("save_changes")}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
        									style={[Styles.buttonSubmit, Styles.buttonLogout]}
        									ref={"buttonDelete"}
        									onPress={this.handleLogout}
        									disabled={this.state.disabled}>
        										<Text style={[Styles.buttonText, Styles.buttonLogoutText]}>{I18n.t("logout")}</Text>
        								</TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default EditUserContainer;
