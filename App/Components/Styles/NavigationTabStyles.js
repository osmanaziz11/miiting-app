import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    zIndex: 4000,
    height: Metrics.screenHeight * 0.08,
    backgroundColor: "#FFFFFF",
    width: Metrics.screenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    paddingHorizontal: 10
  },

  overContainer: {
    position: "absolute",
    bottom: 0,
  },

  gradient: {
    height: Metrics.screenHeight * 0.011
  },

  button: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  icon: {
    width: 20,
    height: 20,
    marginBottom: 8
  },

  buttonText: {
    textTransform: "uppercase",
    overflow: "hidden",
    color: "#6d7a8d",
    fontWeight: Platform.select({ios: "600", android: "normal"}),
    fontSize: 12,
  },

  buttonTextActive: {
    color: "#527afe",
  }
})
