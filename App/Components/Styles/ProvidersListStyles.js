import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
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
    left: Metrics.screenWidth * 0.157,
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

  searchContainer: {
    paddingTop: Metrics.screenHeight * 0.04
  },

  sectionHeader: {
    color: "#717787",
    borderBottomColor: "#717787",
    borderBottomWidth: 1,
    width: "100%",
  },
})
