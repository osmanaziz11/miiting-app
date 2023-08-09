import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      height: "auto",
      maxHeight: "auto",
      minHeight: Metrics.screenHeight,
      width: Metrics.screenWidth,
      paddingTop: Metrics.statusBarHeight,
      backgroundColor: "#f3f5f9",
  },

  contentContainer: {
    width: Metrics.screenWidth,
    paddingHorizontal: Metrics.screenWidth * 0.05
  },

})
