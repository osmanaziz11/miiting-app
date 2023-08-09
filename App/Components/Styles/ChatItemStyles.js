import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    selfChatBubble: {
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: 'flex-end',
        maxWidth: Metrics.screenWidth * 0.75,
        height: "auto",
        borderRadius: 8,
        backgroundColor: "#547FFA",
        padding: 10,
        margin: 5,
        marginRight: 15,
    },

    recipientChatBubble: {
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: 'flex-start',
        maxWidth: Metrics.screenWidth * 0.75,
        height: "auto",
        borderRadius: 8,
        backgroundColor: "#FFF",
        padding: 10,
        margin: 5,
    },

    avatar: {
        maxWidth: Metrics.screenWidth * 0.08,
        maxHeight: Metrics.screenHeight * 0.045,
    },

    fakeAvatar: {
        maxWidth: Metrics.screenWidth * 0.08,
        maxHeight: Metrics.screenHeight * 0.045,
        width: Metrics.screenWidth * 0.08,
        height: Metrics.screenHeight * 0.045,
    },

    recipientChatContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 15,
    },

    recipientBubbleContent: {
        color: "#000",
        fontSize: 19,
    },

    selfBubbleContent: {
        color: "#EDF0FE",
        fontSize: 19,
    },

    selfBubbleSmiley: {
        fontSize: 50,
        color: "#EDF0FE",
    },

    recipientBubbleAuthor: {
        fontSize: 13,
        color: "#9CA0AB",
    },

    recipientBubbleAuthorMention: {
        fontSize: 9,
        fontStyle: "italic",
        color: "#9CA0AB",
    },

    selfBubbleAuthor: {
        fontSize: 13,
        color: "#D3DEFE",
    },

    selfBubbleAuthorMention: {
        fontSize: 9,
        fontStyle: "italic",
        color: "#D3DEFE",
    },

    selfBubbleImg: {
        width: Metrics.screenWidth * 0.5,
        height: Metrics.screenWidth * 0.5,
        padding: 5,
    },

    selfBubbleImgWithText: {
        width: Metrics.screenWidth * 0.5,
        height: Metrics.screenWidth * 0.5,
        padding: 5,
        marginBottom: 10,
    },

    messageInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    selfCircleSeparator: {
        backgroundColor: "#D3DEFE",
        borderRadius: 50,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "transparent",
        width: Metrics.screenWidth * 0.008,
        height: Metrics.screenWidth * 0.008,
        marginHorizontal: 3,
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

    videoPlayButtonContainer: {
      height: "100%",
      width: Metrics.screenWidth * 0.5,
      alignItems: "center",
      position: "absolute",
      zIndex: 19,
      justifyContent: "center"
    },

    playButton: {
      height: "50%",
      width: "50%"
    },

    selfLinksText: {
      color: "#EDF0FE"
    },

    messageMentionContainer: {
      minHeight: Metrics.screenHeight * 0.05,
      height: "auto",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: 5,
      paddingHorizontal: Metrics.screenWidth * 0.02,
      paddingTop: Metrics.screenHeight * 0.005,
      marginBottom: Metrics.screenHeight * 0.01,
      borderLeftColor: "rgba(255, 255, 255, 0.7)",
      borderLeftWidth: 4
    },

    recipientMessageMentionContainer: {
      minHeight: Metrics.screenHeight * 0.05,
      height: "auto",
      width: "100%",
      backgroundColor: "rgba(200, 200, 200, 0.3)",
      borderRadius: 5,
      paddingHorizontal: Metrics.screenWidth * 0.02,
      paddingTop: Metrics.screenHeight * 0.005,
      marginBottom: Metrics.screenHeight * 0.01,
      borderLeftColor: "rgba(200, 200, 200, 0.7)",
      borderLeftWidth: 4,
    },

    messageMentionText: {
      color: "#EDF0FE",
      fontSize: 13
    },

    recipientMessageMentionText: {
      color: "#000",
      fontSize: 13
    },

    messageMentionTextThumb: {
      width: "auto",
      maxWidth: "80%"
    },

    messageMentionInfo: {
      flexDirection: "row",
      alignItems: "center"
    },

    messageMentionThumb: {
      height: Metrics.screenHeight * 0.05,
      width: Metrics.screenHeight * 0.05,
      marginRight: Metrics.screenWidth * 0.01
    },

    contentContainerMessageMention: {
      flexDirection: "row",
      alignItems: "center"
    },

    replyOverlay: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderColor: "#547ffa",
      borderWidth: 1,
      zIndex: 400,
      alignItems: "center",
      justifyContent: "center"
    },

    replyOverlayIcon: {
      height: 20,
      width: 20
    }

})
