import { StyleSheet} from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  tableContainerCircle: {
    width: Metrics.tableThumbSize,
    height: Metrics.tableThumbSize,
    borderRadius: 10000,
    backgroundColor: "#D1DCFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  tableContainerRectangle: {
    width: Metrics.screenWidth * 0.2,
    height: Metrics.screenWidth * 0.1,
    backgroundColor: "#D1DCFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },

  tableContainerVertical: {
    width: Metrics.tableThumbSize / 1.8,
    height: Metrics.tableThumbSize,
  },

  tableViewText: {
    color: "#527afe"
  },

  tableViewTextOwnTable: {
    color: "#FFFFFF"
  },

  tableNameText: {
    position: "absolute",
    bottom: -20,
    color: "#939399"
  },

  tableNameTextOwn: {
    color: "#000"
  },

  gradient: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D1DCFF",
    alignItems: "center",
    justifyContent: "center",
  },

  tablePin: {
    position: "absolute",
    height: Metrics.screenHeight * 0.12,
    top: -(Metrics.screenHeight * 0.0865 - 18)
  },

  avatar: {
    position: 'absolute',
    top: -(Metrics.screenHeight * 0.0865 - 35)
  },

  touchableFull: {
    height: "100%",
    width: "100%",
  }
})
