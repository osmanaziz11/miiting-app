import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

const PREVIEW_HEIGHT = Metrics.screenHeight * 0.2;
export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.statusBarHeight,
    backgroundColor: "#F5F7F9",
  },

  content: {
    marginTop: Metrics.statusBarHeight / 2,
    paddingHorizontal: 25,
  },

  previewContainer: {
    width: Metrics.screenWidth - 50,
    height: PREVIEW_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  addFileContainer: {
    width: Metrics.screenWidth - 50,
    height: PREVIEW_HEIGHT,
    borderWidth: 1,
    borderColor: "#CED2D6",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },

  addFileButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#547FFA",
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 10,
  },

  addFileIcon: {
    height: Metrics.screenWidth * 0.06,
    width: Metrics.screenWidth * 0.06,
  },

  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.screenWidth - 50,
    height: Metrics.textInputHeight - 10,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    marginBottom: Metrics.textInputMarginVertical,
    borderColor: "#828792",
    borderWidth: StyleSheet.hairlineWidth,
  },

  textInput: {
    width: "100%",
    height: Metrics.textInputHeight,
    paddingHorizontal: 10,
    color: "#1a2d4d",
    fontSize: 15,
  },

  textInputIcon: {
    height: Metrics.screenWidth * 0.030,
    width: Metrics.screenWidth * 0.030,
    overflow: "visible",
    position: "absolute",
    right: 10,
  },

  label: {
    marginBottom: 5,
    color: "#707686",
    fontSize: 16,
    alignSelf: "flex-start",
    marginTop: Metrics.statusBarHeight,
  },

  buttonParticipate: {
    backgroundColor: "#33f05c",
    width: Metrics.screenWidth - 50,
    height: Metrics.textInputHeight,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 20,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18
  },

  buttonContainer: {
    // position: "absolute",
    // bottom: Metrics.statusBarHeight,
  },

  errorMessage: {
    color: "red",
    marginVertical: 10,
  },

  textInputContainerError: {
    alignItems: "center",
    justifyContent: "center",
    width: Metrics.screenWidth - 50,
    height: Metrics.textInputHeight - 10,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    marginBottom: Metrics.textInputMarginVertical,
    borderColor: "#828792",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "red",
    borderWidth: StyleSheet.hairlineWidth,
  },

  error: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: Metrics.loginSentenceFontSize,
    backgroundColor: "#fae1e1",
    color: "#e64545",
  },

  addressContainer: {
    width: Metrics.screenWidth - 50,
    flex: 1,
    flexGrow: 1,
  },

  scrollView: {
    paddingBottom: Metrics.statusBarHeight,
  },
});