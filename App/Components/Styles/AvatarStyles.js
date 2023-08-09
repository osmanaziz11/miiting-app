import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },

  overlay: {
    backgroundColor: "transparent",
  },

  gradient: {
    borderRadius: 1000
  },

  cardContainer: {
    width: Metrics.screenWidth * 0.6,
    height: Metrics.screenHeight * 0.4,
    alignSelf: "center",
    padding: 0,
  },

  cardImg: {
    width: "100%",
    height: "100%",
  },
})
