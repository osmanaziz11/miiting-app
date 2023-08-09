import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        paddingBottom: 45,
        backgroundColor: "#f3f5f9",
    },

    forgotCredentialsContainer: {
        width: Metrics.screenWidth - 25,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: Metrics.statusBarHeight * 0.1,
        marginHorizontal: 15,
    },

    forgotCredentialsSentence: {
        color: "#717787",
        fontWeight: "400",
        fontSize: Metrics.loginSentenceFontSize - 5,
    },

    forgotCredentialsButton: {
        marginLeft: 5,
        color: "#527afe",
        fontSize: Metrics.loginSentenceFontSize - 5,
    },

    formContainer: {
        flex: 1,
        justifyContent: "space-between",
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

    errorTextInput: {
        borderColor: "red",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 7,
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

    loginInstructions: {
        width: Metrics.screenWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize,
        backgroundColor: "#D3DEFE",
        color: "#547FFA",
        marginTop: Metrics.screenHeight * 0.03
    },

    global_err: {
        width: Metrics.screenWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize,
        backgroundColor: "#fae1e1",
        color: "#e64545",
        marginTop: Metrics.screenHeight * 0.03
    },

    separator: {
        alignItems: 'center',
        justifyContent: "center"
    },    

    separatorText: {
    },

    facebookButton: {
        backgroundColor: "#3B5B99",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        marginTop: 20,
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

    scrollView: {
        width: Metrics.screenWidth,
        flex: 1,
    },
})    