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

    explainTitle: {
      color: "#717787",
      fontWeight: "600",
      fontSize: Metrics.loginSentenceFontSize,
      textAlign: "center",
      marginTop: Metrics.screenHeight * 0.05,
      width: Metrics.screenWidth * 0.9,
    },

    explainText:{
      color: "#717787",
      fontWeight: "400",
      fontSize: Metrics.loginSentenceFontSize -1,
      textAlign: "center",
      marginTop: Metrics.screenHeight * 0.01,
      width: Metrics.screenWidth * 0.9,
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
       marginBottom: Metrics.screenHeight * 0.02,

       marginTop: Metrics.screenHeight * 0.05
    },

    joinButtonText: {
        color: "#527afe",
        fontSize: 18
    },
})
