import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: Metrics.screenHeight * 0.06,
    borderColor: "#bbb",
    borderWidth: 0.5,
    alignSelf: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: Metrics.screenWidth * 0.8666,
    height: Metrics.screenHeight * 0.06
  },

  mainInput: {
    width: "90%",
  },

  searchIcon: {
    height: Metrics.screenHeight * 0.0164,
    width: Metrics.screenWidth * 0.0293,
    marginHorizontal: Metrics.screenWidth * 0.0266
  },
  
  clearButton: {
    position: "absolute",
    right: 15,
  },

  clearButtonImg: {
    width: Metrics.screenWidth * 0.04,
    height: Metrics.screenWidth * 0.04,
  },
})
