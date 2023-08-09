import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 946,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#FFF",
    },

    chatContainer: {
        backgroundColor: "#f3f5f9",
        width: Metrics.screenWidth,
        height: "auto",
        minHeight: Metrics.screenHeight * 0.77,
        justifyContent: "flex-end",
    },

    loaderOverlay: {
        backgroundColor: "#f3f5f9",
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        justifyContent: "center",
        position: "absolute",
        zIndex: 945,
        top: Metrics.statusBarHeight + Metrics.headerHeight

    },

    chatLoader: {
        backgroundColor: "#f3f5f9",
        width: Metrics.screenWidth,
        height: "auto",
    },

    userInterface: {
        zIndex: 946,
        backgroundColor: "#FFF",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-evenly",
        width: Metrics.screenWidth,
        height: "auto",
        margin: 5,
        marginBottom: Metrics.screenHeight * 0.1
    },

    userInputContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Metrics.screenWidth - 125,
        maxHeight: Metrics.screenHeight * 0.5,
        borderRadius: 25,
        borderStyle: "solid",
        borderColor: "#9CA0AB",
        borderWidth: 1,
        backgroundColor: "#f3f5f9",
        marginVertical: Metrics.textInputMarginVertical,
    },

    textInput: {
        width: Metrics.screenWidth - 150,
        maxHeight: Metrics.screenHeight * 0.5,
        minHeight: Metrics.screenHeight * 0.05,
        height: "auto",
        color: "#1a2d4d",
        fontSize: Metrics.screenHeight * 0.02,
        paddingTop: Platform.OS == "ios" ? Metrics.screenHeight * 0.0125 : null
    },

    emojiPickerButton: {
        width: Metrics.screenWidth * 0.06,
        height: Metrics.screenWidth * 0.06,
        position: "absolute",
        right: 10,
    },

    sendImg: {
        width: Metrics.screenWidth * 0.060,
        height: Metrics.screenHeight * 0.060,
    },

    addImg: {
        width: Metrics.screenWidth * 0.05,
        height: Metrics.screenWidth * 0.05,
    },

    addImgButton: {

    },

    choosenPicContainer: {
        width: Metrics.screenWidth,
        height: "auto",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
    },

    imagePrevisu: {
        width: Metrics.screenWidth * 0.2,
        height: Metrics.screenWidth * 0.2,
    },

    noMessagesContainer: {
        backgroundColor: "#f3f5f9",
        width: Metrics.screenWidth,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: Metrics.screenHeight / 3
    },

    noMessagesText: {
        color: "#9CA0AB",
        fontSize: Metrics.loginSentenceFontSize,
    },

    replyMessageContainer: {
      minHeight: Metrics.screenHeight * 0.05,
      height: "auto",
      width: "90%",
      backgroundColor: "rgba(200, 200, 200, 0.3)",
      borderRadius: 5,
      paddingHorizontal: Metrics.screenWidth * 0.02,
      paddingTop: Metrics.screenHeight * 0.005,
      marginBottom: Metrics.screenHeight * 0.01,
      borderLeftColor: "rgba(200, 200, 200, 0.7)",
      borderLeftWidth: 4,
      marginHorizontal: Metrics.screenWidth * 0.02,
      marginTop: Metrics.screenHeight * 0.01
    },

    messageMentionText: {
      color: "#000",
      fontSize: 13
    },

    contentContainerMessageMention: {
      flexDirection: "row",
      alignItems: "center"
    },

    messageMentionThumb: {
      height: Metrics.screenHeight * 0.05,
      width: Metrics.screenHeight * 0.05,
      marginRight: Metrics.screenWidth * 0.01
    },

    messageMentionInfo: {
      flexDirection: "row",
      alignItems: "center"
    },

    recipientBubbleAuthorMention: {
        fontSize: 9,
        fontStyle: "italic",
        color: "#9CA0AB",
    },

    recipientCircleSeparator: {
        backgroundColor: "#9CA0AB",
        borderRadius: 50,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "transparent",
        width: Metrics.screenWidth * 0.008,
        height: Metrics.screenWidth * 0.008,
        marginHorizontal: 3,
    },

    messageMentionTextThumb: {
      width: "auto",
      maxWidth: "80%"
    },
})
