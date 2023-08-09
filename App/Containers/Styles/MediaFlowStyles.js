import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
    },

    noMediaFeedContainer: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.79,
        justifyContent: "center",
        alignItems: "center",
    },

    noMediaFeedText: {
        color: "grey",
        fontSize: Metrics.loginSentenceFontSize,
    },

    contentContainer: {
        backgroundColor: "#f3f5f9",
        width: Metrics.screenWidth,
        minHeight: Metrics.screenHeight
    },

    scrollViewContent: {
        width: Metrics.screenWidth,
        height: "auto",
        maxHeight: "auto",
        minHeight: Metrics.screenHeight * 0.79,
    },

    buttonsContainer: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#547FFA",
        borderRadius: 7,
        flexDirection: "row",
        marginHorizontal: 20,
        height: Metrics.screenHeight * 0.06,
        margin: Metrics.screenWidth * 0.05,
        overflow: "hidden"
    },

    labelStyle: {
        color: "#000",
        fontSize: Metrics.loginSentenceFontSize,
    },

    indicator: {
        height: 6,
        width: 6,
        borderRadius: 6,
        alignSelf: "center",
        backgroundColor: "blue",
        left: Metrics.screenWidth * 0.16,
        bottom: Metrics.screenWidth * 0.024
    },

    mediaFeedList: {
        width: Metrics.screenWidth,
        height: "auto",
        maxHeight: "auto",
        minHeight: Metrics.screenHeight * 0.79,
        paddingBottom: Metrics.screenHeight * 0.245,
    },

    galleryRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    sectionHeader: {
    },

    button: {
        width: "33%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        textAlign: "center",
        color: "#547FFA",
    },

    borderButton: {
        borderStyle: "solid",
        borderLeftWidth: 1,
        borderLeftColor: "#547FFA",
        borderRightWidth: 1,
        borderRightColor: "#547FFA",
    },

    buttonActive: {
        backgroundColor: "#547FFA",
    },

    buttonTextActive: {
        color: "#FFF",
    },
})
