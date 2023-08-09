import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    header: {
        backgroundColor: "#FFF",
        height: Metrics.headerHeight,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Metrics.headerPaddingHorizontal,
        justifyContent: "center",
        width: Metrics.screenWidth,
    },

    icon: {
        position: "absolute",
        left: 25,
    },

    icon_right: {
        position: "absolute",
        right: 25,
    },

    header_title: {
        color: "#717787",
        textAlign: "center",
        width: Metrics.screenWidth * 0.7948,
        fontSize: 21
    },

    header_title_white: {
        color: "#FFF",
        textAlign: "center",
        width: Metrics.screenWidth * 0.7948,
        fontSize: 21
    },

    icon_img: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
        overflow: "visible",
    },
    
    icon_add: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
    },
})
