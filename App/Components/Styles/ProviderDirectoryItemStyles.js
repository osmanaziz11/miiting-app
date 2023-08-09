import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
	container: {
		width: "100%",
		height: "auto",
		backgroundColor: "white",
		marginVertical: Metrics.screenHeight * 0.01,
		paddingBottom: Metrics.screenHeight * 0.02
	},

	pictureContainer: {
		width: "100%",
		height: Metrics.screenHeight * 0.3,
	},

	picture: {
		height: "100%",
		width: "100%"
	},

	infoContainer: {
		width: "100%",
		height: Metrics.screenHeight * 0.3,
		paddingHorizontal: Metrics.screenWidth * 0.06,
		paddingVertical: Metrics.screenHeight * 0.03
	},

	nameText: {
		fontSize: 17,
		fontWeight: "bold"
	},

	addressText: {
		color: "#7F7F7F"
	},

	descriptionText: {
		marginTop: Metrics.screenHeight * 0.02,
		width: "100%",
		color: "#AFAFAF"
	},

	statsContainer: {
		marginTop: Metrics.screenHeight * 0.02,
		flexDirection: "row"
	},

	stat: {
		marginRight: Metrics.screenWidth * 0.03
	},

	statLabelText: {
		color: "#7F7F7F"
	},

	statContent: {
		flexDirection: "row",
		alignItems: "center"
	},

	buttonSubmit: {
		marginTop: Metrics.screenHeight * 0.02,
		width: "100%",
		alignSelf: "center",
		height: Metrics.screenHeight * 0.05,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5
	},

	buttonText: {
		fontWeight: "bold",
		color: "white"
	},

	statIcon: {
		height: Metrics.screenHeight * 0.017,
		width: Metrics.screenHeight * 0.017,
		marginRight: Metrics.screenWidth * 0.01
	},

	statLabelDiscount: {
		color: "#ff9999"
	},

	statContentDiscount: {
		color: "#ff6b6b",
		fontWeight: "bold"
	}
})
