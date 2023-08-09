import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
	modal: {
		width: Metrics.screenWidth,
		height: Metrics.screenHeight,
		padding: 0,
		margin: 0
	},

	contentContainer: {
		margin: 0,
		backgroundColor: "#000000",
		width: "100%",
		height: "100%",
		paddingTop: Metrics.statusBarHeight
	},

	innerSwiperContainer: {
		width: "100%",
		height: "100%",
	},

	swiperContainer: {
		width: "100%",
		height: "100%"
	},

	imageViewer: {
		width: "100%",
		height: "100%"
	},

	overlay: {
		zIndex: 1000,
	},

	closeButton: {
		zIndex: 1000,
		position: "absolute",
		top: Metrics.screenHeight * 0.08,
		right: Metrics.screenHeight * 0.03,
		width: 30,
		height: 30
	},

	closeButtonIcon: {
		width: "100%",
		height: "100%"
	}
})
