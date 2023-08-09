import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
	mainGuestContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},

	container: {
		flexDirection: "column",
		marginVertical: Metrics.screenHeight * 0.0209,
	},

	avatar: {
		marginRight: Metrics.screenWidth * 0.024,
	},

	attendingText: {
		color: "#717787"
	},

	companionsContainer: {
		marginVertical: Metrics.screenHeight * 0.036
	},

	companion: {
		flexDirection: "row",
		marginLeft: Metrics.screenWidth * 0.136,
		marginVertical: Metrics.screenHeight * 0.0037,
		alignItems: "center"
	},

	mainGuestNameContainer: {
		flexDirection: "row",
		width: "90%",
	},

	mainGuestName: {
		overflow: "hidden",
		width: "100%"
	},

	mainGuestCompanionsText: {
		fontStyle: "italic"
	},

	showContextMenuButton: {
		position: "absolute",
		right: 0,
		zIndex: 1000,
		width: Metrics.screenWidth * 0.1,
		height: Metrics.screenWidth * 0.1,
		justifyContent: "center",
		alignItems: "center",
	},

	picker: {
		width: "100%",
		height: "100%",
	},

	contextMenuIcon: {
		width: Metrics.screenWidth * 0.070,
		height: Metrics.screenWidth * 0.065,
	},
})
