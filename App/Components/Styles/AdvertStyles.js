import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
	popupContainer: {
		height: Metrics.screenHeight,
		width: Metrics.screenWidth,
		alignItems: "center",
		justifyContent: "center"
	},

	modalCloseButtonContainer: {
		position: "absolute",
		top: Metrics.screenWidth * 0.08 + Metrics.statusBarHeight,
		right: Metrics.screenWidth * 0.08,
		height: Metrics.screenWidth * 0.1,
		width: Metrics.screenWidth * 0.1,
		borderRadius: 1000,
		zIndex: 100,
		backgroundColor: "rgba(120, 120, 120, 0.95)",
		alignItems: "center",
		justifyContent: "center"
	},

	modalCloseButtonIcon: {
		height: "65%",
		width: "65%"
	},

	modalCloseButtonText: {
		color: "#FFFFFF"
	},

	modalAdvertImageContainer: {
		width: Metrics.screenWidth,
		height: Metrics.screenHeight
	},

	modalAdvertImage: {
		width: "100%",
		height: "100%"
	},

	bannerContainer: {
		position: "absolute",
		bottom: Metrics.screenHeight * 0.1,
		width: Metrics.screenWidth,
		height: Metrics.advertBannerHeight,
		zIndex: 100,
		backgroundColor: "rgba(255, 255, 255, 0.9)"
	},

	bannerAdvertImageContainer: {
		width: "100%",
		height: "100%"
	},

	bannerAdvertImage: {
		width: "100%",
		height: "100%"
	}
})
