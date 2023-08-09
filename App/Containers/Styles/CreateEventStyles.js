import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%",
        width: Metrics.screenWidth,
        paddingTop: Metrics.statusBarHeight,
        backgroundColor: "#f3f5f9",
        flex: 1,
    },

    form: {
        marginTop: 10,
        width: Metrics.screenWidth,
        flex: 1,
    },

    scrollView: {
        width: Metrics.screenWidth,
        flex: 1,
    },

    textInputContainer: {
        justifyContent: "center",
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        marginHorizontal: 20,
        backgroundColor: "#FFFFFF",
        marginVertical: Metrics.textInputMarginVertical * 1.5,
        borderRadius: 7,
    },

    textInput: {
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        paddingHorizontal: 10,
        color: "#1a2d4d",
        fontSize: 15
    },

    picker: {
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
        paddingHorizontal: 10,
    },

    pickers: {
        justifyContent: "center",
        paddingHorizontal: 10,
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

    textInputLabel: {
        marginHorizontal: 20,
        color: "#717787",
        marginBottom: -15,
    },

    modalToggle: {
        paddingHorizontal: 10,
    },

    datePickerIcon: {
        position: "absolute",
        right: 0,
        height: Metrics.screenWidth * 0.057,
        width: Metrics.screenWidth * 0.057
    },

    pickers_button: {
        position: "absolute",
        right: 10,
        overflow: "visible",
    },

    pickers_icons: {
        height: Metrics.screenWidth * 0.050,
        width: Metrics.screenWidth * 0.050,
        position: "absolute",
        right: 10,
        overflow: "visible",
    },

    guest_authorize: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    guest_authorize_sentence: {
        width: Metrics.screenWidth * 0.6,
        color: "#8a91a1",
    },

    pickerModal: {
        position: "absolute",
        bottom: 0,
        height: Metrics.screenWidth * 0.5,
        width: Metrics.screenWidth * 0.5,
    },

    errorTextInput: {
        borderColor: "red",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 7,
    },

    errorTextInputText: {
        color: "red",
    },

    validateImg: {
        height: Metrics.screenWidth * 0.030,
        width: Metrics.screenWidth * 0.030,
        overflow: "visible",
        position: "absolute",
        right: 10,
    },

    addPhotoContainer: {
        borderStyle: "solid",
        borderTopColor: "#CFD3D7",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#CFD3D7",
        width: Metrics.eventCoverWidth,
        height: Metrics.eventCoverHeight,
        marginHorizontal: (Metrics.screenWidth - Metrics.eventCoverWidth)/2,
        marginVertical: Metrics.textInputMarginVertical * 1.5,
        borderRadius: 7,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    addPhotoButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#547FFA",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
    },

    addPhotoImg: {
        height: Metrics.screenWidth * 0.06,
        width: Metrics.screenWidth * 0.06,
    },

    eventPhotoPreviewImg: {
        width: Metrics.eventCoverWidth,
        height: Metrics.eventCoverHeight,
    },

    eventPhotoPreview: {
        paddingVertical: 0,
    },

    addPhotoText: {
        textAlign: "center",
    },

    buttonContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    bachelorsButtons: {
        width: Metrics.screenWidth - 40,
        height: Metrics.screenHeight * 0.15,
        marginHorizontal: 20,
    },

    bachelorButton: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },

    bachelorPartyLabels: {
        color: "#717787",
    },

    removeImageButtonContainer: {
      position: "absolute",
      borderRadius: 1000,
      zIndex: 30,
      width: Metrics.screenWidth * 0.1,
      height: Metrics.screenWidth * 0.1,
      backgroundColor: "rgba(113, 119, 135, 0.8)",
      top: 10,
      right: 10,
      alignItems: "center",
      justifyContent: "center"
    },

    removeImageButtonIcon: {
      width: Metrics.screenWidth * 0.07,
      height: Metrics.screenWidth * 0.07,
    },

    gGPAContainer: {
        width: Metrics.screenWidth,
        flex: 1,
        flexGrow: 1,
    },

    clearAdressButtonContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: -7
    },

    clearAdressButtonText: {
      color: "#717787",
      fontStyle: "italic",
      textDecorationLine: "underline",
      fontSize: 12
    }
})
