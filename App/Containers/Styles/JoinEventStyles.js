import { StyleSheet, Platform } from "react-native";
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

    scrollView: {
        flex: 1,
    },

    scrollViewContainer: {
        paddingBottom: Metrics.statusBarHeight,
        alignItems: "center",
    },

    howToJoinBlock: {
        width: Metrics.screenWidth - 50,
        marginVertical: 25,
    },

    formContainer: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.15,
    },

    howToJoinText: {
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize,
        color: "#727888",
    },

    textInputContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "#FFFFFF",
    },

    textInput: {
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        color: "#1a2d4d",
        fontSize: 15,
        borderRadius: 100,
    },

    codeInput: {
        color: "#000",
        borderColor: "#6091FC",
        fontSize: 18,
        fontWeight: "800",
    },

    eventCodeTitle: {
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize + 2,
        color: "#000",
    },

    qrCodeContainer: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    qrCodeImg: {
        width: Metrics.screenWidth * 0.4,
        height: Metrics.screenWidth * 0.4,
    },

    eventQrCodeTitle: {
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize + 2,
        color: "#000",
        marginBottom: Metrics.screenHeight * 0.04,
    },

    buttonSubmit: {
        backgroundColor: "#33f05c",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18
    },

    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        height: Metrics.screenHeight * 0.1,
        width: Metrics.screenWidth,
        marginBottom: 25
    },

    buttons: {
        backgroundColor: "#FFF",
        width: Metrics.screenWidth * 0.375,
        height: Metrics.textInputHeight,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#547FFA",
        alignItems: "center",
        justifyContent: "center",
    },

    button1: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    button2: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    buttonTextUntoggled: {
        fontSize: 15,
        color: "#547FFA",
    },

    toggledButton: {
        backgroundColor: "#547FFA",
    },

    toggledText: {
        color: "#FFF",
    },
})
