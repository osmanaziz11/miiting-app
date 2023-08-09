import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

const visibleWidth = Metrics.screenWidth;
const visibleHeight = Metrics.screenHeight - (Metrics.headerHeight + Metrics.statusBarHeight);

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.statusBarHeight,
    backgroundColor: "#FFF",
  },

  contentContainer: {
    backgroundColor: "#f3f5f9",
    height: visibleHeight,
    width: visibleWidth,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundImage: {
    zIndex: -1,
    position: 'absolute',
    height: visibleHeight,
    width: visibleWidth,
  },

  sceneContainer: {
    height: visibleWidth / 3,
    width: visibleWidth / 3,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(209, 220, 255, 0.6)"
  },

  tableThumbsContainer: {
    width: "100%",
    height: "100%",
  },

  sceneText: {
    color: "#527AFE",
    fontWeight: "600"
  },

  backButtonContainer: {
    zIndex: 20,
    position: "absolute",
    left: Metrics.screenWidth * 0.066,
    top: Metrics.screenWidth * 0.066,
    flexDirection: "row",
    alignItems: "center"
  },

  backButtonText: {
    marginLeft: Metrics.screenWidth * 0.03,
  },

  backButtonIcon: {
    width: Metrics.screenWidth * 0.066,
    height: Metrics.screenHeight * 0.028
  },

  scenePositionTop: {
    height: Metrics.screenHeight * 0.08,
    marginHorizontal: Metrics.screenWidth /4,
    width: Metrics.screenWidth /2,
    top: 0,
  },

  scenePositionCenter: {
    // top: (visibleHeight / 2) - ((visibleHeight / 5) / 2),
    // left: (visibleWidth / 2) - ((visibleWidth / 3) / 2),
  },

  scenePositionBottom: {
    height: Metrics.screenHeight * 0.08,
    marginHorizontal: Metrics.screenWidth /4,
    width: Metrics.screenWidth /2,
    bottom: 0,
  },

  scenePositionRight: {
    width: Metrics.screenHeight * 0.08,
    height: Metrics.screenWidth /2,
    right: 0,
    marginHorizontal: 0,
    top: visibleHeight - (visibleHeight - (visibleHeight /3))
  },

  scenePositionLeft: {
    width: Metrics.screenHeight * 0.08,
    height: visibleWidth / 2,
    left: 0,
    marginHorizontal: 0,
    top: visibleHeight - (visibleHeight - (visibleHeight /3))
  },

  scenePositionNone: {
    height: 0,
    width: 0
  },

  sceneTextLeft: {
    transform: ([{rotate: "90deg"}])
  },

  emptyInstructions: {
    width: Metrics.screenWidth,
    position: "absolute",
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
    fontSize: Metrics.loginSentenceFontSize,
    backgroundColor: "#D3DEFE",
    color: "#547FFA",
  },

})
