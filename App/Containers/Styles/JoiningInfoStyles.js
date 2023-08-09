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

  scrollContainer: {
    width: "100%",
    height: "100%"
  },

  joiningExplainText: {
    textAlign: "center",
    fontSize: 15,
    color: "#727888",
    marginTop: Metrics.screenHeight * 0.04,
    marginBottom: Metrics.screenHeight * 0.02,
    marginHorizontal: Metrics.screenWidth * 0.05
  },

  eventInfoContainer: {
    backgroundColor: "white",
    width: Metrics.screenWidth * 0.90,
    minHeight: Metrics.screenHeight * 0.3,
    alignSelf: "center",
    borderRadius: 6,
    justifyContent: "space-between"
  },

  eventNameContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: Metrics.screenHeight * 0.125,
    maxHeight: "auto",
    borderStyle: "solid",
    borderBottomColor: "#E7E9EB",
    borderBottomWidth: 1
  },

  eventNameText: {
    fontSize: 24,
    fontWeight: Platform.OS == "android" ? "500" : "600",
    color: "#000",
  },

  eventOwnerContainer: {
    alignItems: "center",
    width: "100%",
    minHeight: Metrics.screenHeight * 0.125,
    maxHeight: "auto",
    flexDirection: "row",
    paddingHorizontal: Metrics.screenWidth * 0.05
  },

  avatar: {
    marginRight: Metrics.screenWidth * 0.05
  },

  ownerNameLabelText: {
    color: "#7B7B7B"
  },

  ownerNameText: {
    fontSize: 16
  },

  datetimeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: Metrics.screenHeight * 0.105,
    maxHeight: "auto",
    borderStyle: "solid",
    borderBottomColor: "#E7E9EB",
    borderBottomWidth: 1,
    flexDirection: "row"
  },

  addressContainer: {
    alignItems: "center",
    width: "100%",
    minHeight: Metrics.screenHeight * 0.105,
    maxHeight: "auto",
    borderStyle: "solid",
    borderBottomColor: "#E7E9EB",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: Metrics.screenHeight * 0.025,
    paddingHorizontal: Metrics.screenWidth * 0.05
  },

  dateContainer: {
    width: "50%",
    borderRightColor: "#E7E9EB",
    borderRightWidth: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.screenHeight * 0.025,
    paddingHorizontal: Metrics.screenWidth * 0.05
  },


  timeContainer: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.screenHeight * 0.025,
    paddingHorizontal: Metrics.screenWidth * 0.05
  },

  dateIcon: {
      width: Metrics.screenWidth * 0.055,
      height: Metrics.screenWidth * 0.055,
      marginHorizontal: 10,
      alignSelf: "flex-start"
  },

  infoTimeLabel: {
    color: "#7B7B7B"
  },

  localizationLabel: {
    color: "#7B7B7B"
  },

  buttonsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      height: Metrics.screenHeight * 0.1,
      width: Metrics.screenWidth,
      marginTop: 25,
      marginBottom: 15
  },

  buttons: {
      backgroundColor: "#FFF",
      width: Metrics.screenWidth * 0.375,
      height: Metrics.textInputHeight,
      borderRadius: 5,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#547FFA",
      alignItems: "center",
      justifyContent: "center",
  },

  button1: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
  },

  button2: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
  },

  buttonTextUntoggled: {
      fontSize: 15,
      color: "#547FFA",
  },

  toggledButton: {
      backgroundColor: "#547FFA",
  },

  toggledText: {
      color: "#FFF",
  },

  buttonSubmit: {
      backgroundColor: "#33f05c",
      width: Metrics.screenWidth - 40,
      height: Metrics.textInputHeight,
      marginHorizontal: 20,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
  },

  buttonText: {
      color: "#FFF",
      fontSize: 18
  },

  singleInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Metrics.screenWidth,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: Metrics.screenHeight * 0.01,
    marginBottom: Metrics.screenHeight * 0.03
  },

  singleInputLabel: {
    color: "#717787",
    fontSize: 15,
  },

  contentContainer: {
    paddingBottom: Metrics.screenHeight * 0.08
  }
})
