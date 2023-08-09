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

    textInputLabel: {
        marginHorizontal: 20,
        color: "#717787",
        marginBottom: -15,
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

    pickerModal: {
        position: "absolute",
        bottom: 0,
        height: Metrics.screenWidth * 0.5,
        width: Metrics.screenWidth * 0.5,
    },

    modalToggle: {
        paddingHorizontal: 10,
    },

    picker: {
        width: Metrics.screenWidth - 40,
        height: Metrics.textInputHeight,
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

    options_picker_icon: {
        position: "absolute",
        right: 5,
        height: Metrics.screenWidth * 0.050,
        width: Metrics.screenWidth * 0.050
    },

    deleteCurrentPhotoButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "grey",
        opacity: 0.5,
        borderRadius: 25,
        width: Metrics.screenWidth * 0.1,
        height: Metrics.screenWidth * 0.1,
        justifyContent: "center",
        alignItems: 'center',
    },

    deleteCurrentPhotoImg: {
        lineHeight: Metrics.screenWidth * 0.1,
        color: "#FFF",
        fontSize: Metrics.loginSentenceFontSize * 2,
        textAlign: "center",
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

    eventCodeContainer: {
        width: Metrics.screenWidth - 40,
        height: Metrics.screenHeight * 0.7,
        backgroundColor: "#FFF",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 7,
        borderStyle: "solid",
        borderColor: "#E7E9EB",
        borderWidth: 1,
    },

    cardHeader: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ECF0FE",
        width: "100%",
        height: "10%",
    },

    cardEventName: {
        color: "#547FFA",
        fontSize: Metrics.screenWidth * 0.05
    },

    detailsTitle: {
        color: "#727888",
        fontSize: 18,
        marginVertical: 15
    },

    qrcodeImg: {
        width: "100%",
        height: "45%",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 25,
    },

    middleBar: {
        borderBottomColor: "#E7E9EB",
        borderBottomWidth: 1,
        borderStyle: "solid",
        width: "100%",
    },

    IDCode: {
        fontSize: 25
    },

    circle: {
        borderRadius: 50,
        backgroundColor: "#f3f5f9",
        width: 30,
        height: 30,
        position: "absolute",
        top: -15,
    },

    leftCircle: {
        left: "-5%",
        borderStyle: "solid",
        borderRightColor: "#E7E9EB",
        borderRightWidth: 1,
    },

    rightCircle: {
        right: "-5%",
        borderStyle: "solid",
        borderLeftColor: "#E7E9EB",
        borderLeftWidth: 1,
    },

    gGPAContainer: {
        width: Metrics.screenWidth,
        flex: 1,
        flexGrow: 1,
    },

    eventDescriptionContainer: {
        width: Metrics.screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },

    eventDescription: {
        paddingVertical: 10,
        fontSize: 15,
    },

    eventDescInputContainer: {
        justifyContent: "flex-start",
        width: Metrics.screenWidth - 40,
        height: Metrics.screenHeight * 0.25,
        marginHorizontal: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 7,
    },

    eventDescInput: {
        width: Metrics.screenWidth - 40,
        height: "100%",
        paddingHorizontal: 10,
        color: "#1a2d4d",
        fontSize: 15
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

  shareButtonContainer: {
    position: "absolute",
    top: Metrics.screenWidth * 0.02,
    right: Metrics.screenWidth * 0.055
  },

  shareIcon: {
    width: Metrics.screenWidth * 0.055,
    height: Metrics.screenWidth * 0.055
  },

  buttonDeleteText: {
    color: "red"
  },

  buttonDeleteEvent: {
    borderColor: "red",
    borderWidth: 1
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
