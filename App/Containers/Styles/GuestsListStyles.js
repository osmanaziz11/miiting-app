import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

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
    height: "100%",
    width: "100%",
  },

  listContainer: {
    height: "auto",
    maxHeight: "auto",
    minHeight: "auto",
    width: Metrics.screenWidth,
    padding: Metrics.screenWidth * 0.064,
    paddingBottom: Metrics.screenHeight * 0.1,
  },

  emptyResultsText: {
    color: "#717787",
    textAlign: "center",
    width: "100%",
    marginTop: Metrics.screenWidth * 0.1
  },

  indicator: {
    height: 6,
    width: 6,
    borderRadius: 6,
    alignSelf: "center",
    backgroundColor: "blue",
    left: (Metrics.screenWidth / 6) - 8,
    bottom: Metrics.screenWidth * 0.024
  },

  labelStyle: {
    color: "#717787",
  },

  emptyText: {
    color: "#717787",
    textAlign: "center",
    width: "100%",
    marginTop: Metrics.screenWidth * 0.1
  },

  sectionAlphabet: {
    width: Metrics.screenWidth * 0.1,
    height: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 25,
    zIndex: 1,
  },

  sectionHeaderTitle :{
    textAlign:"left",
    color:"#B3B7C1",
    fontWeight:"700",
    fontSize: 18,
    backgroundColor: "#f3f5f9"
  },

  sectionHeader: {
    width: Metrics.screenWidth - 65,
    height: Metrics.screenHeight * 0.035,
    borderBottomColor: "#E2E5E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },

  sectionAlphabetTitle: {
    color: "#B3B7C1",
    fontSize: 15,
    marginBottom: 2,
  },

  currentSectionAlphabetTitle: {
    color: "blue",
  },

})
