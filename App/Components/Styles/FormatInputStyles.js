import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  textinput: {
    width: "100%",
    height: Metrics.screenHeight * 0.07,
    fontSize: 17,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "transparent"
  },

  textinputMultiline: {
    height: Metrics.screenHeight * 0.14
  }
});
