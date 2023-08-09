import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    button: {
        borderRadius: 50,
        borderStyle: "solid",
        borderColor: "#CFD3D7",
        borderWidth: 1,
        width: Metrics.screenWidth * 0.0665,
        height: Metrics.screenWidth * 0.0665,
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonActive: {
        backgroundColor: "#F06163",
        borderColor: "transparent"
    },

    middleBar: {
        width: "50%",
        height: Metrics.screenHeight * 0.0026,
        backgroundColor: "#CFD3D7",
    },

    middleBarActive: {
        backgroundColor: "white",
    },
})