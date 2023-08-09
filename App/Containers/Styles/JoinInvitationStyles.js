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

    inviteOthersBlock: {
        width: Metrics.screenWidth - 50,
        marginVertical: 25,
    },

    inviteOthersText: {
        textAlign: "center",
        fontSize: Metrics.loginSentenceFontSize,
        color: "#727888",
    },

    addGuestImg: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
    },

    addGuestButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#547FFA",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
    },

    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonSubmit: {
        backgroundColor: "#33f05c",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        marginBottom: 25,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18
    },
})    