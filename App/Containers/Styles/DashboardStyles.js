import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#FFF",
    },

    scrollView: {
        width: Metrics.screenWidth,
        flex: 1,
    },

    scrollViewContent: {
      paddingBottom: Metrics.advertBannerHeight,
    },

    main: {
        width: Metrics.screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },

    eventPicture: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.455,
    },

    eventBackGround: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.455,
        backgroundColor: "grey",
    },

    eventTimeLeft: {
        width: "70%",
        height: Metrics.screenHeight * 0.08,
        backgroundColor: "#FFF",
        borderRadius: 5,
        position: "absolute",
        top: Metrics.screenHeight * 0.40,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    rowUnits: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rowValues: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    units: {
        textAlign: "center",
        width: "33%",
    },

    values: {
        width: "30%",
        textAlign: "center",
        color: "#547FFA",
        fontSize: Metrics.screenWidth * 0.05,
        fontWeight: "600",
    },

    separators: {
        textAlign: "center",
        fontSize: 20,
    },

    eventDetails: {
        width: Metrics.screenWidth - 50,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginVertical: 20,
    },

    eventTitle: {
        fontSize: 24,
        fontWeight: Platform.OS == "android" ? "500" : "600",
        color: "#000",
    },

    eventDescription: {
        fontSize: 17,
        color: "#A0A4AE",
        paddingVertical: 10,
    },

    separator: {
        width: Metrics.screenWidth - 50,
        borderBottomColor: "#E7E9EB",
        borderBottomWidth: 1,
        borderStyle: "solid",
        paddingVertical: 10,
    },

    eventOwner: {
        width: Metrics.screenWidth - 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 10
    },

    eventOwnerTitle: {
        color: "#A0A4AE",
        fontSize: 15,
    },

    eventOwnerName: {
        fontSize: 20,
    },

    eventOwnerDetails: {
        marginLeft: 15,
    },

    potDetailsContainer: {
        width:  Metrics.screenWidth,
        borderStyle: "solid",
        borderBottomColor: "#E7E9EB",
        borderTopColor: "#E7E9EB",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginTop: 30,
        backgroundColor: "#F5F7FA",
        justifyContent: "space-between",
        flex: 1,
    },

    potIcon: {
        width: Metrics.screenWidth * 0.05,
        height: Metrics.screenWidth * 0.05,
        margin: 10,
    },

    potDesc: {
        color: "#878C99",
    },

    daysLeft: {
        color: "#000",
    },

    potTimeLeft: {
        width: Metrics.screenWidth - 70
    },

    potContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Metrics.screenWidth - 50,
        padding: 20,
    },

    infoTitle: {
        fontSize: 25,
        paddingLeft: 30,
    },

    halfCardsContainer: {
        flexDirection: "row"
    },

    card: {
        width: Metrics.screenWidth,
        height: "auto",
        minHeight: Metrics.screenHeight * 0.125,
        maxHeight: "auto",
        borderStyle: "solid",
        borderBottomColor: "#E7E9EB",
        borderBottomWidth: 1,
        padding: 12.5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    halfCard: {
        width: "50%",
        height: Metrics.screenHeight * 0.125,
    },

    cardTitle: {
        color: "#A0A4AE",
        fontSize: 17,
        marginBottom: 2.5
    },

    cardContent: {
        fontSize: 18,
        maxWidth: Metrics.screenWidth * 0.8
    },

    cardIcon: {
        width: Metrics.screenWidth * 0.055,
        height: Metrics.screenWidth * 0.055,
        alignSelf: "flex-start",
        marginHorizontal: 10,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    cardContentContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },

    middleBar: {
        borderStyle: "solid",
        borderLeftColor: "#E7E9EB",
        borderLeftWidth: 1,
    },

    goToGuestsListArrow: {
        width: Metrics.screenWidth * 0.05,
        height: Metrics.screenWidth * 0.05,
        position: "absolute",
        right: "5%",
        top: "40%",
    },

    mapPreview: {
        width: Metrics.screenWidth,
        height: Metrics.screenWidth,
        backgroundColor: "#F5F7FA"
    },

    mapPreviewImg: {
        width: "100%",
        height: "100%",
    },
    
    openMapButton: {
        position: "absolute",
        top: 5,
        zIndex: 10000,
        height: Metrics.textInputHeight,
        width: Metrics.screenWidth - 40,
        alignSelf: "center"
    },

    openMapButtonInner: {
        backgroundColor: "#547FFA",
        width: Metrics.screenWidth - 40,
        height: "100%",
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center"
    },

    openMapText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 18
    }
})
