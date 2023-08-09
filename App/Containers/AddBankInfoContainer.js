import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from "react-native";
import Header from "../Components/Header";
import MiitingLoader from "../Components/MiitingLoader";
import Styles from "./Styles/AddBankInfoStyles";
import { I18n } from "../Lib";
import ImagePicker from "react-native-image-crop-picker";
import Images from "../Themes/Images";
import LinearGradient from "react-native-linear-gradient";
import Api from "../Config/Apiconfig";
import GooglePlacesInput from "../Components/GooglePlacesInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class AddBankInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {
        front: {
          file: null,
          mime: null,
        },
        back: {
          file: null,
          mime: null,
        },
      },
      iban: "",
      errorMessages: {
        iban: "",
        file: "",
        address: "",
      },
      type: "front",
      resultLocalization: null,
      is_loading: false,
    };
    this.handleAddFile = this.handleAddFile.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.openGallery = this.openGallery.bind(this);
    this.canConfirm = this.canConfirm.bind(this);
    this._handlePlacePicked = this._handlePlacePicked.bind(this);
  }

  handleAddFile() {
    Alert.alert(
      I18n.t("add_bank_info_title"),
      I18n.t("add_bank_info_file_pick"),
      [
        { text: I18n.t("picker_open_gallery"), onPress: this.openGallery },
        { text: I18n.t("picker_open_camera"), onPress: this.openCamera },
        { text: I18n.t("cancel"), onPress: () => { }, style: "cancel" },
      ],
    );
  }

  openGallery() {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      mediaType: "photo",
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(response => {
      if (response.data) {
        let { errorMessages, files, type } = this.state;
        errorMessages.file = "";
        files[type].file = `data:${response.mime};base64,${response.data}`;
        files[type].mime = response.mime;
        this.setState({ files, errorMessages });
      }
    });
  }

  openCamera() {
    ImagePicker.openCamera({
      includeBase64: true,
      mediaType: "photo",
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(response => {
      if (response.data) {
        let { errorMessages, files, type } = this.state;
        errorMessages.file = "";
        files[type].file = `data:${response.mime};base64,${response.data}`;
        files[type].mime = response.mime;
        this.setState({ files, errorMessages });
      }
    });
  }

  isIbanValid(iban) {
    return iban.length >= 20;
  }


  handleConfirm() {
    if (this.canConfirm()) {
      this.setState({ is_loading: true });
      let { iban, files, resultLocalization } = this.state;
      let data = {
        imgfront: files.front.file,
        imgback: files.back.file,
        iban,
        zip: resultLocalization.zip,
        city: resultLocalization.city,
        line1: resultLocalization.address,
        id: this.props.navigation.getParam("pot", {}).id,
      };
      Api.pot.addBankInfo(data).then(response => {
        switch (response.status) {
          case "success":
            this.setState({ is_loading: false });
            this.props.navigation.goBack();
            break;
          case "error":
              this.setState({ is_loading: false });
            Alert.alert(I18n.t("add_bank_info_title"), response.message);
            break;
          default:
            Alert.alert(I18n.t("add_bank_info_title"), I18n.t("unknown_error"));
            break;
        }
      });
      this.setState({
        errorMessages: {
          file: "",
          iban: "",
          address: "",
        }
      });
    }
  }

  canConfirm() {
    let { files, iban, errorMessages, resultLocalization } = this.state;
    let canConfirm = true;

    if (iban.length < 20) {
      canConfirm = false;
      errorMessages.iban = I18n.t("add_bank_info_iban_invalid");
    }

    if (files.front.file === null) {
      canConfirm = false;
      errorMessages.file = I18n.t("add_bank_info_need_file");
    }

    if (resultLocalization === null) {
      canConfirm = false;
      errorMessages.address = I18n.t("add_bank_info_need_address");
    }

    this.setState({ errorMessages });
    return canConfirm;
  }

  _handlePlacePicked(data, details) {
    let resultLocalization = {
      address: null,
      city: null,
      zip: null,
      country: null,
      latitude: null,
      longitude: null
    }

    if (details != null && details.geometry !== undefined) {
      resultLocalization.latitude = details.geometry.location.lat;
      resultLocalization.longitude = details.geometry.location.lng;
    }

    if (details !== null && details.address_components !== undefined) {
      if (details.address_components.filter(component => component.types.indexOf("postal_code") > -1).length > 0) {
        resultLocalization.zip = details.address_components
          .filter(component => component.types.indexOf("postal_code") > -1)[0].long_name;
      }
      if (details.address_components.filter(component => component.types.indexOf("locality") > -1).length > 0) {
        resultLocalization.city = details.address_components
          .filter(component => component.types.indexOf("locality") > -1)[0].long_name;
      }
      if (details.address_components.filter(component => component.types.indexOf("country") > -1).length > 0) {
        resultLocalization.country = details.address_components
          .filter(component => component.types.indexOf("country") > -1)[0].long_name;
      }

      if (details.name !== resultLocalization.city && details.name !== resultLocalization.country) {
        resultLocalization.address = details.name;
      }
    }
    if (data.types.indexOf("establishment") > -1) {
      let streetAddress = details.address_components
        .filter(component => component.types.indexOf("route") > -1)[0].long_name;
      resultLocalization.address = details.name + " - " + streetAddress;
    }
    this.setState({ resultLocalization });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Header onBackPressed={() => this.props.navigation.goBack()} title={I18n.t("add_bank_info_title")} />
        <KeyboardAwareScrollView style={Styles.content} contentContainerStyle={Styles.scrollView} keyboardShouldPersistTaps={"never"} keyboardDismissMode={"on-drag"}>
          {(this.state.errorMessages.iban !== "" || this.state.errorMessages.file !== "") &&
            <Text style={Styles.error}>{I18n.t("register_errors")}</Text>
          }
          <Text style={Styles.label}>{I18n.t("add_bank_info_id_front_label")}</Text>
          {this.state.files.front.file !== null ?
            <View style={Styles.previewContainer}>
              <Image source={{ uri: this.state.files.front.file }} style={Styles.previewImage} />
            </View>
            :
            <View style={Styles.addFileContainer}>
              <TouchableOpacity onPress={() => this.setState({ type: "front" }, this.handleAddFile)} style={Styles.addFileButton}>
                <Image source={Images.icons.plus_icon} style={Styles.addFileIcon} />
              </TouchableOpacity>
              <Text>{I18n.t("add_bank_info_add_file_front")}</Text>
            </View>
          }
          {this.state.errorMessages.file !== "" &&
            <Text style={Styles.errorMessage}>{this.state.errorMessages.file}</Text>
          }
          <Text style={Styles.label}>{I18n.t("add_bank_info_id_back_label")}</Text>
          {this.state.files.back.file !== null ?
            <View style={Styles.previewContainer}>
              <Image source={{ uri: this.state.files.back.file }} style={Styles.previewImage} />
            </View>
            :
            <View style={Styles.addFileContainer}>
              <TouchableOpacity onPress={() => this.setState({ type: "back" }, this.handleAddFile)} style={Styles.addFileButton}>
                <Image source={Images.icons.plus_icon} style={Styles.addFileIcon} />
              </TouchableOpacity>
              <Text>{I18n.t("add_bank_info_add_file_back")}</Text>
            </View>
          }
          <Text style={Styles.label}>{I18n.t("add_bank_info_iban_label")}</Text>
          <View style={[Styles.textInputContainer, this.state.errorMessages.iban !== "" && Styles.textInputContainerError]}>
            <TextInput
              style={Styles.textInput}
              returnKeyType={"next"}
              placeholder={this.state.errorMessages.iban ? this.state.errorMessages.iban : I18n.t("add_bank_info_iban_placeholder")}
              placeholderTextColor={this.state.errorMessages.iban ? "red" : "#939399"}
              underlineColorAndroid={"transparent"}
              onSubmitEditing={() => this.refs["inputAddress"]}
              onChangeText={iban => this.setState({ iban })}
            />
            {this.state.iban.length > 0 &&
              <Image source={this.isIbanValid(this.state.iban) === true ? Images.icons.valid : Images.icons.invalid} style={Styles.textInputIcon} />
            }
          </View>
          <Text style={Styles.label}>{I18n.t("add_bank_info_address_label")}</Text>
          <GooglePlacesInput
            textInputProps={{
              placeholder: this.state.errorMessages.address ? this.state.errorMessages.address : I18n.t("add_bank_info_address_placeholder"),
              placeholderTextColor: this.state.errorMessages.address ? "red" : "#939399",
              ref: ref => this.refs["inputAddress"] = ref,
            }}
            onPlaceChosen={this._handlePlacePicked}
            icon={false}
            style={{
              textInputContainer: this.state.errorMessages.address ? Styles.textInputContainerError : Styles.textInputContainer,
              row: {
                padding: 0,
                paddingVertical: 13,
              },
              textInput: Styles.textInput,
            }} />
          {this.state.is_loading &&
            <MiitingLoader />
          }
          <TouchableOpacity
            onPress={this.handleConfirm}
            style={Styles.buttonContainer}>
            <LinearGradient
              colors={["#547FFA", "#82ABFB"]}
              start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
              style={Styles.buttonParticipate}>
              <Text style={Styles.buttonText}>{I18n.t("add_bank_info_confirm_informations")}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AddBankInfoContainer;
