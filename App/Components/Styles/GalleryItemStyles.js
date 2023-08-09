import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

const diff = Metrics.screenWidth - (Metrics.screenWidth * 0.325 * 3);
const margin = diff / 6;

export default StyleSheet.create({
    show: {
        width: Metrics.screenWidth * 0.325,
        height: Metrics.screenWidth * 0.325,
        margin: margin,
        alignItems: "center",
        justifyContent: "center",
    },

    hide: {
        width: Metrics.screenWidth * 0.325,
        height: Metrics.screenWidth * 0.325,
        margin: margin,
        position: "absolute",
    },

    playvid: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    },

    videoPlayButtonContainer: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      position: "absolute",
      zIndex: 19,
      justifyContent: "center"
    },

    playButton: {
      height: "50%",
      width: "50%"
    }
})
