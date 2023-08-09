import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.statusBarHeight,
    backgroundColor: "#f3f5f9",
  },

  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 30,
  },

  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.screenWidth - 40,
    height: Metrics.textInputHeight,
    borderRadius: 7,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginVertical: Metrics.textInputMarginVertical,
  },

  buttonSubmit: {
    backgroundColor: "#33f05c",
    width: Metrics.screenWidth - 40,
    height: Metrics.textInputHeight,
    marginHorizontal: 20,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18
  },

  textInput: {
    width: Metrics.screenWidth - 40,
    height: Metrics.textInputHeight,
    paddingHorizontal: 10,
    color: "#1a2d4d",
    fontSize: 15,
  },

  textInputLabel: {
    marginHorizontal: 20,
    color: "#717787",
    marginBottom: -5,
    marginTop: 5,
  },

  confidentialInput: {
    marginHorizontal: 20,
    color: "#717787",
    fontSize: Metrics.loginSentenceFontSize * 0.7,
    marginTop: -10,
    marginBottom: 15
  },

  showPassword: {
    position: "absolute",
    right: 10,
  },

  showPasswordImg: {
    height: Metrics.screenWidth * 0.06,
    width: Metrics.screenWidth * 0.06,
    overflow: "visible",
  },

  addPhotoContainer: {
    borderStyle: "solid",
    borderColor: "#CFD3D7",
    borderWidth: 1,
    width: Metrics.screenWidth - 250,
    height: Metrics.screenWidth - 250,
    marginBottom: Metrics.textInputMarginVertical / 2,
    marginHorizontal: 20,
    borderRadius: 10000,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: Metrics.screenWidth * 0.05,
  },

  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  eventPhotoPreviewImg: {
    width: Metrics.screenWidth - 250,
    height: Metrics.screenWidth - 250,
    borderRadius: Platform.select({ android: 10000, ios: 60 })
  },

  eventPhotoPreview: {
    paddingVertical: 25,
  },

  previewContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Metrics.textInputMarginVertical * 3
  },

  addButtonText: {
    fontSize: 10
  },

  removePictureButtonText: {
    color: "#1a2d4d",
    fontSize: 12,
    textDecorationLine: "underline"
  },

  buttonLogoutText: {
    color: "red"
  },

  buttonLogout: {
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 1
  },

  pickers: {
    justifyContent: "space-around",
    paddingHorizontal: 10,
    width: "100%"
  },

  pickers_icons: {
    height: Metrics.screenWidth * 0.050,
    width: Metrics.screenWidth * 0.050,
    position: "absolute",
    right: 10,
    overflow: "visible",
  },

  languagePickerContainer: {
    width: Metrics.screenWidth,
    height: "auto",
    marginTop: 20,
  },

  picker: {
    flexDirection: "row",
    alignItems: "center",
    width: Metrics.screenWidth - 40,
    height: Metrics.textInputHeight,
    borderRadius: 7,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginTop: Metrics.textInputMarginVertical,
    paddingHorizontal: 15,

  },

  pickerFlagIcon: {
    width: 27,
    height: 27,
    marginRight: 10
  },

  singleInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Metrics.screenWidth,
    justifyContent: "space-between",
    paddingHorizontal: 25
  },

  singleInputLabel: {
    color: "#1a2d4d",
    fontSize: 15,
  }
})
