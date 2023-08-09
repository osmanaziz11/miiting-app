import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    textInputContainer: {
        justifyContent: "center",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        backgroundColor: "#FFFFFF",
        marginVertical: Metrics.textInputMarginVertical * 1.5,
        borderRadius: 7,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
    },

    textInput: {
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        paddingHorizontal: 10,
        color: "#1a2d4d",
        fontSize: 15
    },

    description: {
        fontWeight: "bold"
    },

    predefinedPlacesDescription: {
        fontSize: 15,
        color: "#547FFA",
    },

    poweredContainer: {
        display: "none",
    },

    container: {
        flex: 1,
    },

    powered: {},
    listView: {},
    row: {
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#c8c7cc',
    },
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
    },
    androidLoader: {
        marginRight: -15,
    },
    location_picker: {
        position: "absolute",
        right: 35,
        top: 35,
        width: Metrics.screenWidth * 0.06,
        height: Metrics.screenWidth * 0.06
    },
});