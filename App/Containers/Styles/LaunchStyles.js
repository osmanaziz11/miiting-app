import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        justifyContent: "space-around",
    },

    launchImg: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
    },

    logo: {
        width: Metrics.screenWidth * 0.75,
        marginBottom: - 55,
        alignSelf: "center"
    },

    launch_header: {
        zIndex: 100,
        marginTop: -50,
        alignItems: "center",
        width: "100%"
    },

    swiper: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        position: "absolute",
        top: 0,
        left: 0,
    },

    buttonCreate: {
        width: Metrics.screenWidth -40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: Metrics.screenHeight * 0.010,
    },

    buttonJoin: {
        backgroundColor: "#FFFFFF",
        width: Metrics.screenWidth -40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Metrics.screenHeight * 0.01125,
    },

    createButtonText: {
        color: "#FFFFFF",
        fontSize: 18
    },

    buttonsContainer: {
       marginBottom: Metrics.screenHeight * 0.02
    },

    joinButtonText: {
        color: "#527afe",
        fontSize: 18
    },

    pagination: {
        top: Metrics.screenHeight * 0.3
    },

    launch_description: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1F1F1F"
    },

    providerContainer: {
        width: Metrics.screenWidth - 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: Metrics.statusBarHeight * 0.1,
        marginHorizontal: 15,
        position: "absolute",
        bottom: Metrics.statusBarHeight * 2,
    },

    providerSentence: {
        color: "#1F1F1F",
        fontWeight: "400",
        fontSize: Metrics.loginSentenceFontSize - 5,
    },

    providerButton: {
        marginLeft: 5,
        color: "#527afe",
        fontSize: Metrics.loginSentenceFontSize - 5,
    },
})
