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

    formContainer: {
        flex: 1,
        marginTop: 15,
    },

    textInputContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        borderRadius: 7,
        marginHorizontal: 20,
        backgroundColor: "#FFFFFF",
        marginVertical: Metrics.textInputMarginVertical,
    },

    buttonSubmit: {
        backgroundColor: "#33f05c",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        marginTop: 20,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18
    },

    textInput: {
        width: Metrics.screenWidth - 40,
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
    },

    editPasswordStepsText: {
        color: "#777D8C",
        textAlign: "center",
        margin: 15,
        fontSize: 15,
        lineHeight: 25,
    },
});