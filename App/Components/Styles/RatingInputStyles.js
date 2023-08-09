import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
     width: "100%",
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "center",
   },

   starIcon: {
     height: Metrics.screenHeight * 0.05,
     width: Metrics.screenHeight * 0.05,
     marginHorizontal: Metrics.screenWidth * 0.01,
   },

})
