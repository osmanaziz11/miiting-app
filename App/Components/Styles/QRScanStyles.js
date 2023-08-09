import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    paddingTop: Metrics.statusBarHeight,
    backgroundColor: "#FFF",
    position: "absolute",
    zIndex: 10001,
    backgroundColor: "#f3f5f9",
  },

  topText: {
    width: "80%",
    textAlign: "center",
    color: "#6091FC",
    fontSize: 21
  },

  buttonCancel: {
      backgroundColor: "#33f05c",
      width: Metrics.screenWidth - 40,
      height: Metrics.textInputHeight,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center"
  },

  buttonText: {
      color: "#FFF",
      fontSize: 18
  },

  markerContainer: {
    borderColor: "#6091FC",
    borderWidth: 2,
    width: "70%",
    height: "70%",
  }

})
