import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: "auto",
        maxHeight: "auto",
        minHeight: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
    },

    detailsIcon: {
        width: Metrics.screenWidth * 0.075,
        height: Metrics.screenWidth * 0.075,
    },

    scrollView: {
        width: Metrics.screenWidth,
        flex: 1,
    },

    potHeader: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Metrics.screenWidth * 0.075,
        paddingBottom: Metrics.screenHeight * 0.05,
    },

    potTitle: {
        fontSize: Metrics.screenWidth * 0.05,
        color: "#000",
        margin: Metrics.screenWidth * 0.045,
    },

    potDescription: {
        fontSize: Metrics.screenWidth * 0.04,
        color: "#727888",
        textAlign: "center",
    },

    potData: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.15,
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E5E8",
        borderTopColor: "#E2E5E8",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    potDataDetails: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "50%",
        height: "100%",
        borderStyle: "solid",
    },

    potParticipating: {
        // borderRightColor: "#E2E5E8",
        // borderRightWidth: 1,
    },

    potTimeLeft: {
        borderLeftColor: "#E2E5E8",
        borderLeftWidth: 1,
    },

    potDetailsNumbers: {
        fontSize: Metrics.screenHeight * 0.03,
        color: "#000",
    },

    potDetailsTitle: {
        fontSize: Metrics.screenHeight * 0.02,
        color: "#727888",
    },

    buttonParticipate: {
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

    disabledButtonParticipate: {
      backgroundColor: "#DFDFDF"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18
    },

    messagesTitleContainer: {
        width: Metrics.screenWidth * 0.9,
        padding: 10,
        paddingVertical: 20,
    },

    messagesTitle: {
        fontSize: 20
    },

    messagesAmount: {
        fontSize: 15,
        color: "#999DA9",
    },

    messageItem: {
        width: Metrics.screenWidth,
        maxWidth: Metrics.screenWidth,
        height: "auto",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },

    messageAuthorPicture: {
        alignSelf: "flex-start",
        paddingHorizontal: 10
    },

    messageAmount: {
        color: "#999DA9",
        fontSize: 12
    },

    messageContent: {
        width: "75%",
        height: "100%",
    },

    messageHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    messageBubble: {
        padding: 12.5,
        backgroundColor: "#FFF",
        borderRadius: 7,
        borderStyle: "solid",
        borderColor: "#e1e6f0",
        borderWidth: 1,
    },

    explainText: {
      width: "100%",
      paddingHorizontal: Metrics.screenWidth * 0.05,
      textAlign: "justify",
      marginVertical: Metrics.screenHeight * 0.05,
      lineHeight: Metrics.screenHeight * 0.03
    }
})
