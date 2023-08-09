import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
        position: "absolute",
        top: 0,
        zIndex: 1000,
    },

    scrollView: {
        height: "auto",
        width: Metrics.screenWidth,
        alignItems: "center",
    },

    capacityMinMax: {
        color: "#9095A1"
    },

    filterContainer: {
        width: Metrics.screenWidth - 50,
        height: "auto",
        margin: 40,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    slider: {
        width: Metrics.screenWidth - 25,
    },

    titles: {
        fontSize: 20,
        color: "#000",
    },

    row: {
        width: Metrics.screenWidth - 50,
        height: Metrics.screenHeight * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    separator: {
        borderBottomColor: "#E2E5E8",
        borderBottomWidth: 1,
        borderStyle: "solid",
        width: Metrics.screenWidth  
    },

    overflowDesc: {
    },

    descPrivateRoom: {
        color: "#9095A1",
        width: Metrics.screenWidth - 50,    
    },

    foodTypesList: {
        width: Metrics.screenWidth - 50,
        height: "auto",
    },

    foodTypeItem: {
        borderRadius: 7,
        width: Metrics.screenWidth * 0.275,
        height: Metrics.screenWidth * 0.275,
        margin: 2,
        alignItems: "center",
        justifyContent: "center",
    },

    foodTypeText: {
        zIndex: 1005,
        color: "#FFF",
        fontWeight: "700",
        fontSize: 18
    },

    foodTypeIcon: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        borderRadius: 3,
        opacity: 0.8
    },

    selectedFoodTypeItem: {
        borderColor: "#547FFA",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 3
    },

    selectedFoodTypeIcon: {
        zIndex: 1005,
        width: Metrics.screenWidth * 0.06,
        height: Metrics.screenWidth * 0.06,
    },

    foodTagsList: {
        width: Metrics.screenWidth - 50,
        height: "auto",
    },

    radioButton: {
        width: Metrics.screenWidth - 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    buttonSubmit: {
        zIndex: 1010,
        backgroundColor: "#33f05c",
        width: Metrics.screenWidth - 50,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18
    },
});