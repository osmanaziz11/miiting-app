import { StyleSheet} from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    loginLinkContainer : {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.125,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        borderTopColor : "#ced2d6",
        borderTopWidth : 1,
        backgroundColor: "rgba(247, 249, 251, 0.8)",
    },

    loginSentence : {
        color: "#717787",
        fontWeight: "400",
        fontSize: Metrics.loginSentenceFontSize,
    },

    loginLink : {
        marginLeft: 5,
        color: "#527afe",
        fontSize: Metrics.loginSentenceFontSize,
    },
})