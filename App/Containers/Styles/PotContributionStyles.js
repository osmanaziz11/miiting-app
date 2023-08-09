import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
	container: {
		width: Metrics.screenWidth,
		paddingTop: Metrics.statusBarHeight,
		backgroundColor: "#f3f5f9",
	},

	scrollView: {
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: Metrics.headerHeight,
	},

	hide: {
		display: "none",
	},

	headerBg: {
		backgroundColor: "transparent",
	},

	bg: {
		height: Metrics.screenHeight * 0.2,
	},

	leaveMessageContainer: {
		width: Metrics.screenWidth - 50,
		height: Metrics.screenHeight * 0.3,
		borderRadius: 5,
		backgroundColor: "#FFF",
		padding: Metrics.screenHeight * 0.025,
		alignSelf: "center"
	},

	leaveMessageInput: {
		width: "100%",
		height: "100%",
		fontSize: Metrics.loginSentenceFontSize,
	},

	moneyInputContainer: {
		width: Metrics.screenWidth - 50,
		height: Metrics.screenHeight * 0.2,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "#E2E5E8",
		borderBottomWidth: 1,
		borderStyle: "solid",
	},

	amountSentence: {
		width: Metrics.screenWidth - 50,
		marginTop: Metrics.screenHeight * 0.21,
		fontSize: Metrics.screenHeight * 0.021,
		color: "#000",
	},

	amountInput: {
		width: Metrics.screenWidth - 150,
		height: "100%",
		fontSize: Metrics.screenHeight * 0.1,
		fontWeight: "200",
		textAlign: "right",
		color: "#727888",
	},

	currencyIndicator: {
		fontSize: Metrics.screenHeight * 0.1,
		fontWeight: "200",
		color: "#727888",
		width: "auto",
	},

	buttonParticipate: {
		backgroundColor: "#33f05c",
		width: Metrics.screenWidth - 40,
		height: Metrics.textInputHeight,
		marginHorizontal: 20,
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

	textInputContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: Metrics.screenWidth - 80,
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

	picker: {
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		width: Metrics.screenWidth * 0.35,
		height: Metrics.textInputHeight - 10,
		borderRadius: 7,
		backgroundColor: "#FFFFFF",
		marginBottom: Metrics.textInputMarginVertical,
		borderColor: "#828792",
		borderWidth: StyleSheet.hairlineWidth,
	},

	expirationDateAndCVCContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: Metrics.screenWidth - 80,
	},

	label: {
		marginBottom: 5,
		color: "#707686",
		fontSize: 16,
	},

	addCardForm: {
		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 50,
	},

	inputPlaceholder: {
		color: "#939399",
	},

	inputContentText: {
		color: "#1a2d4d",
	},

	pickerButton: {
		paddingHorizontal: 10,
		alignItems: "flex-start"
	},
})
