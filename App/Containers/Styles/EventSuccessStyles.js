import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
        alignItems: 'center',
        justifyContent: 'center',
    },

    successIcon: {
        width: Metrics.screenWidth * 0.35,
        height: Metrics.screenHeight * 0.35,
        overflow: "visible",
    },

    eventSuccessTitle: {
        fontSize: 25,
        marginBottom: 20
    },

    manageInvitation: {
        width: Metrics.screenWidth - 100,
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize,
        color: "#727888",
    },

    manageButton: {
        backgroundColor: "#33f05c",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },

    manageButtonText: {
        color: "#FFF",
        fontSize: 18
    },
    
    eventQrCode: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: Metrics.screenHeight * 0.05,
        textAlign: "center",
    }
})