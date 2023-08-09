import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		height: Metrics.screenHeight,
		width: Metrics.screenWidth,
		paddingTop: Metrics.statusBarHeight,
		backgroundColor: "#f3f5f9",
	},

	instructions: {
		marginVertical: 10
	},

	instructionsText: {
		color: "#A5A9B4"
	},

	eventsList: {
		width: "100%",
		height: "100%",
	},

	eventsListContent: {
		justifyContent: "flex-start",
		alignItems: "center",
		paddingBottom: 50,
	},

	eventItem: {
		padding: 10,
		width: Metrics.screenWidth - 50,
		height: "auto",
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginVertical: 5,
	},

	eventPicture: {
		width: Metrics.screenWidth * 0.125,
    height: Metrics.screenWidth * 0.125,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 4,
	},

	eventInfo: {
		width: "80%"
	},

	eventName: {
		fontSize: 18,
    color: "black",
	},

	eventDate: {
		color: "#A5A9B4",
	},

	floatingUnreadBubble: {
		width: 15,
		height: 15,
		backgroundColor: "red",
		borderRadius: 10000,
		position: "absolute",
		top: 0,
		left: -25,
		zIndex: 100000,
		borderWidth: 2,
		borderColor: "#F5F7FA",
		marginVertical: 10,
		marginLeft: 30,
	},
});
