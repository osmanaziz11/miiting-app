import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
    },

    image: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
    },

    video: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.55,
        position: "absolute",
        left: 0,
        top: Metrics.screenHeight * 0.15,
    },

    overlay: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: Metrics.screenWidth,
        maxHeight: Metrics.screenHeight * 0.5,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Metrics.screenWidth * 0.05,
        paddingVertical: 10,
    },

    overlayText: {
        color: "#FFF",
        overflow: "hidden",
    },

    infoContainer: {
        width: Metrics.screenWidth,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Metrics.screenWidth * 0.05
    },

    authorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    authorName: {
        fontWeight: Platform.select({
            ios: "700",
            android: "500"
        })
    },

    authorInfo: {
        marginLeft: 15,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    icons: {
        width: Metrics.screenWidth * 0.05,
        height: Metrics.screenWidth * 0.05
    },

    likesAndCommentsContainer: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Metrics.screenWidth * 0.05
    },

    likeButton: {
      padding: 5,
      marginRight: Metrics.screenWidth * 0.02,
    },

    likeButtonIcon: {
      width: Metrics.screenWidth * 0.09,
      height: Metrics.screenWidth * 0.09,
    },

    likeCount: {
      color: "white",
      fontSize: 20,
      fontWeight: Platform.select({
          ios: "700",
          android: "500"
      }),
      marginRight: Metrics.screenWidth * 0.05
    },

    iconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    nbrContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    photoTitleContainer: {
        paddingVertical: 10,
    },

    photoTitle: {
        overflow: "hidden",
    },

    renderButtonText: {
        color: "#A9A9A9",
    },

    goToComments: {
        color: "#A9A9A9",
    },

    backArrowButton: {
        position: "absolute",
        top: 25,
        left: 15,
        zIndex: 1000,
    },

    backArrow: {
        width: 40,
        height: 40
    },

    erasePhotoButton: {
        position: "absolute",
        top: 25,
        right: 15,
        zIndex: 1200,
    },

    erasePhoto: {
        width: 40,
        height: 40,
    },

    eraseConfirmText: {
        color: "#ff0000",
    },

    downloadIcon: {
        width: 30,
        height: 30,
    },

    actionContainer: {
      flexDirection: "row",
      marginLeft: 50
    },

    actionButton: {
      marginLeft: 20
    },

    loader: {
      position: "absolute",
      alignSelf: "center",
      top: Metrics.screenHeight * 0.45,
      zIndex: 10000
          }
})
