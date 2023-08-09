import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
        zIndex: 999,
        flex: 1,
    },

    scrollView: {
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
        flex: 1,
    },

    restaurantList: {
        flex: 1,
        width: Metrics.screenWidth
    },

    gGPAContainer: {
        width: Metrics.screenWidth,
        flex: 1,
        flexGrow: 1,
    },

    getCurrentLocationBtn: {
        width: Metrics.screenWidth - 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 25,
        flex: 1,
    },

    getCurrentLocationText: {
        fontSize: 18,
        color: "#547FFA",
    },

    locationIcon: {
        width: Metrics.screenWidth * 0.06,
        height: Metrics.screenWidth * 0.06,
        margin: 10,
        resizeMode: "contain",
    },

    separator: {
        marginVertical: 20,
        borderBottomColor: "#E2E5E8",
        borderBottomWidth: 1,
        borderStyle: "solid",
        width: Metrics.screenWidth,
    },

    placePickedContainer: {
        width: Metrics.screenWidth - 25,
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    placePickedText: {
        fontSize: 18,
        color: "#94949A",
    },

    restaurantItem: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },
    
    restaurantIconContainer: {
        padding: 15
    },

    restaurantIcon: {
        width: Metrics.screenWidth * 0.04,
        height: Metrics.screenWidth * 0.04,
    },

    restaurantItemContent: {
        justifyContent: "center",
        alignItems: "flex-start",
    },
    
    restaurantName: {
        fontSize: 20,
        color: "#000",
    },

    restaurantAddress: {
        fontSize: 18
    },

    noRestaurants: {
        alignSelf: "center",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20
    },


    buttonSubmit: {
        marginVertical: Metrics.textInputMarginVertical,
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center"
    },
});