import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#547FFA",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
    },
    
    addButtonImg: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
    },
    
    addButtonText: {
        textAlign: "center",
        color: "#858A97",
    },
});