import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        alignItems: "center",
        width: Metrics.screenWidth * 0.8,
        height: "auto",
        backgroundColor: "#FFF",
        margin: 20,
        borderRadius: 5,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#D3DEFE",
        width: Metrics.screenWidth * 0.8,
        height: Metrics.screenHeight * 0.065,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    headerTitle: {
        color: "#547FFA",
        fontSize: Metrics.loginSentenceFontSize + 2,
        fontWeight: "500",
    },

    textInputContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Metrics.screenWidth * 0.75,
        height: Metrics.textInputHeight,
        borderRadius: 7,
        borderColor: "#E7E9EB",
        borderStyle: "solid",
        borderWidth: 1,
        marginHorizontal: 20,
        backgroundColor: "#FFFFFF",
        marginVertical: Metrics.textInputMarginVertical,
    },

    textInput: {
        width: Metrics.screenWidth * 0.75,
        height: Metrics.textInputHeight,
        paddingHorizontal: 10,
        color: "#1a2d4d",
        fontSize: 15,
    },

    textInputLabel: {
        marginHorizontal: 20,
        color: "#717787",
        marginBottom: -5,
        marginTop: 5,
        fontSize: Metrics.loginSentenceFontSize,
    },

    deleteInvitationButton: {
        position: "absolute",
        right: 20,
    },

    deleteInvitationImg: {
        height: Metrics.screenWidth * 0.04,
        width: Metrics.screenWidth * 0.04,
    },

    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 10,
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

    buttonText: {
        color: "#547FFA",
        fontSize: Metrics.loginSentenceFontSize
    },

    button1: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },

    button2: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    toggledButton: {
        backgroundColor: "#547FFA",
    },

    toggledText: {
        color: "#FFF",
    },

    picker: {
        width: Metrics.screenWidth * 0.75,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
    },

    options_picker_icon: {
        position: "absolute",
        right: 5,
        height: Metrics.screenWidth * 0.050,
        width: Metrics.screenWidth * 0.050
    },

    pickers: {
        width: Metrics.screenWidth * 0.75,
        height: Metrics.textInputHeight,
        paddingHorizontal: 10,
        justifyContent: "center",

    },

    pickers_button: {
        position: "absolute",
        right: 10,
        overflow: "visible",
    },

    pickers_icons: {
        height: Metrics.screenWidth * 0.050,
        width: Metrics.screenWidth * 0.050,
        position: "absolute",
        right: 10,
        overflow: "visible",
    },
})