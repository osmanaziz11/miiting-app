import { StyleSheet} from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({

  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },

  mainTableContainer: {
    height: Metrics.screenWidth * 0.53,
    width: Metrics.screenWidth * 0.53,
    borderRadius: Metrics.screenWidth * 0.53,
    backgroundColor: "#D1DCFF",
    justifyContent: "center",
    alignItems: "center"
  },

  overflowView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },

  mainTableName: {
    color: "#FFFFFF",
    fontSize: 23,
    padding: "20%"
  },

  seatContainer: {
    position: "absolute",
    height: (Metrics.screenWidth * 0.53 + Metrics.screenWidth * 0.133*2),
  },

  seat: {
    backgroundColor: "#D1DCFF",
    width: Metrics.screenWidth * 0.133,
    height: Metrics.screenWidth * 0.133,
    borderRadius: Metrics.screenWidth * 0.133,
    alignItems: "center",
    justifyContent: "center"
  },

  seatOwnUser: {
    backgroundColor: "#527afe",
  },

  guestNameText: {
    position: "absolute",
    color: "#939399",
    width: Metrics.screenWidth * 0.2,
    height: Metrics.screenWidth * 0.1,
    textAlign: "center"
  },

  guestNameUpper: {
    top: - Metrics.screenWidth * 0.1
  },

  guestNameLower: {
    bottom: - Metrics.screenWidth * 0.1
  }
})
