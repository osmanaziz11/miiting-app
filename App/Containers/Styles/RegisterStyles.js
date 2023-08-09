import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: "#f3f5f9",
    },

    formContainer: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 25,
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
        marginBottom: 10,
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

    errorTextInput: {
        borderColor: "red",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 7,
    },

    textInputLabel: {
        marginHorizontal: 20,
        color: "#717787",
        marginBottom: -5,
        marginTop: 5,
    },

    confidentialInput: {
        marginHorizontal: 20,
        color: "#717787",
        fontSize: Metrics.loginSentenceFontSize * 0.7,
        marginTop: -10,
        marginBottom: 15
    },

    validateImg: {
        height: Metrics.screenWidth * 0.030,
        width: Metrics.screenWidth * 0.030,
        overflow: "visible",
        position: "absolute",
        right: 10,
    },

    validateImgPassword: {
        right: 35,
    },

    showPassword: {
        position: "absolute",
        right: 10,
    },

    showPasswordImg: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
        overflow: "visible",
    },

    global_err: {
        width: Metrics.screenWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize,
        backgroundColor: "#fae1e1",
        color: "#e64545",
        marginVertical: Metrics.screenHeight * 0.03
    },

    facebookButton: {
        backgroundColor: "#3B5B99",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
    },

    facebookButtonText: {
        color: "#FFF",
        fontSize: Metrics.loginSentenceFontSize,
    },

    fb_logo: {
        height: Metrics.screenWidth * 0.075,
        width: Metrics.screenWidth * 0.075,
        overflow: "visible",
        position: "absolute",
        left: 15,
    },

    pickers: {
        width: Metrics.screenWidth - 40,
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

    addPhotoContainer: {
        borderStyle: "solid",
        borderColor: "#CFD3D7",
        borderWidth: 1,
        width: Metrics.screenWidth - 250,
        height: Metrics.screenWidth - 250,
        marginBottom: Metrics.textInputMarginVertical /2,
        marginHorizontal: 20,
        borderRadius: 10000,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: Metrics.screenWidth * 0.05,
    },

    buttonContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    eventPhotoPreviewImg: {
        width: Metrics.screenWidth - 250,
        height: Metrics.screenWidth - 250,
        borderRadius: 60
    },

    eventPhotoPreview: {
        paddingVertical: 25,
    },

    previewContainer: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.2,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: Metrics.textInputMarginVertical * 3
    },

    addButtonText: {
        fontSize: 10
    },

    removePictureButtonText: {
      color: "#1a2d4d",
      fontSize: 12,
      textDecorationLine: "underline"
    },

    singleInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: Metrics.screenWidth,
      justifyContent: "space-between",
      paddingHorizontal: 25,
      marginTop: Metrics.screenHeight * 0.01,
      marginBottom: Metrics.screenHeight * 0.03
    },

    singleInputLabel: {
      color: "#717787",
      fontSize: 15,
    }
})
