import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: Metrics.screenHeight,
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9"
    },

    addProviderImg: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
    },

    addProviderButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#547FFA",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
    },

    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    invitationsContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: Metrics.screenWidth,
        minHeight: "auto"
    },

    invitationsList: {
        width: Metrics.screenWidth,
        height: "auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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