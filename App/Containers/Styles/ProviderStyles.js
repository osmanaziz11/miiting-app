import { StyleSheet } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    height: "auto",
    maxHeight: "auto",
    minHeight: Metrics.screenHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.statusBarHeight,
    backgroundColor: "#f3f5f9",
  },

  containerList: {
    paddingBottom: Metrics.screenHeight * 0.1
  },

  contentContainer: {
    backgroundColor: "#f3f5f9",
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.advertBannerHeight * 2
  },

  contentContentContainer: {
    paddingBottom: Metrics.screenHeight * 0.1
  },

  mainContainer: {
    backgroundColor: "#f3f5f9",
    width: Metrics.screenWidth,
  },

  mainContentContainer: {
    paddingBottom: Metrics.advertBannerHeight
  },

  providerTypeButton: {
    width: "100%",
    height: Metrics.screenHeight * 0.08,
    borderBottomColor: "#AFAFAF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Metrics.screenWidth * 0.05,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },

  providerTypeButtonText: {
    fontSize: 15
  },

  providerTypeButtonIcon: {
    height: 25,
    width: 25,
    marginRight: Metrics.screenWidth * 0.05
  },

  picturesPreviewContainer: {
    width: "100%",
    height: Metrics.screenHeight * 0.3,

  },

  mainPicture: {
    width: "100%",
    height: "100%"
  },

  imageCountContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    bottom: Metrics.screenHeight * 0.02,
    right: Metrics.screenHeight * 0.02,
    borderRadius: 4,
    padding: Metrics.screenHeight * 0.01
  },

  imageCountText: {
    color: "white"
  },

  mainTitleText: {
    fontSize: 19,
		fontWeight: "bold"
  },

  addressText: {
    fontSize: 16,
		color: "#7F7F7F"
	},

  basicInfoContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: Metrics.screenWidth * 0.06,
		paddingVertical: Metrics.screenHeight * 0.03
  },

  statsContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: Metrics.screenHeight * 0.01,
    borderBottomColor: "#AFAFAF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: Metrics.screenHeight * 0.03,
  },

  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    paddingHorizontal: Metrics.screenWidth * 0.06
  },

  stats: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Metrics.screenWidth * 0.06,
    paddingVertical: Metrics.screenHeight * 0.03
  },

  stat: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center"
  },

  statLabelText: {
    fontWeight: "200",
    color: "#7F7F7F"
  },

  statContentText: {
    color: "#000",
    fontWeight: "bold",
    marginTop: Metrics.screenHeight * 0.007
  },

  statIcon: {
    height: Metrics.screenHeight * 0.03,
    width: Metrics.screenHeight * 0.03,
    marginRight: Metrics.screenWidth * 0.03
  },

  descriptionContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: Metrics.screenHeight * 0.01,
    paddingVertical: Metrics.screenHeight * 0.03,
  },

  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    paddingHorizontal: Metrics.screenWidth * 0.06
  },

  orderProviderButton: {
		width: "80%",
		height: Metrics.screenHeight * 0.05,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5
  },

  orderProviderButtonText: {
    fontWeight: "bold",
		color: "white"
  },

  actionButtons: {
    marginTop: Metrics.screenHeight * 0.02,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },

  callProviderButton: {
    borderRadius: 4,
    borderColor: "#547ffa",
    borderWidth: StyleSheet.hairlineWidth * 2,
    width: Metrics.screenHeight * 0.05,
    height: Metrics.screenHeight * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },

  callProviderIcon: {
    width: "60%",
    height: "60%"
  },

  orderProviderButtonInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },

  disabled: {
    opacity: 0.6
  },

  localizationContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: Metrics.screenHeight * 0.01,
    paddingVertical: Metrics.screenHeight * 0.03,
  },

  mapImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    marginTop: Metrics.screenHeight * 0.02
  },

  faqContainer: {
    marginTop: 0
  },

  listHeader: {
    height: Metrics.screenHeight * 0.09,
    backgroundColor: "white",
    borderBottomColor: "#AFAFAF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#AFAFAF",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Metrics.screenWidth * 0.03,
    justifyContent: "center"
  },

  listHeaderText: {
    color: "#7F7F7F",
    fontSize: 14
  },

  returnToListButton: {
    borderRadius: 4,
    borderColor: "#AFAFAF",
    borderWidth: StyleSheet.hairlineWidth,
    width: Metrics.screenWidth * 0.88,
    alignSelf: "center",
    height: Metrics.screenHeight * 0.05,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  returnToListIcon: {
    height: "50%",
    width: "auto"
  },

  returnToListButtonText: {
    color: "#AFAFAF"
  },

  providerTypeListHeader: {
    height: Metrics.screenHeight * 0.1,
    width: "100%",
    backgroundColor: "white",
    borderBottomColor: "#AFAFAF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    paddingHorizontal: Metrics.screenWidth * 0.03
  },

  providerTypeListHeaderText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },

  localizationText: {
    width: "100%",
    paddingHorizontal: Metrics.screenWidth * 0.06,
    marginTop: Metrics.screenHeight * 0.02,
    fontSize: 17
  },

  listHeaderInput: {
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#AFAFAF",
    height: Metrics.screenHeight * 0.045,
    marginVertical: Metrics.screenHeight * 0.005,
    justifyContent: "center",
    borderRadius: 5,
  },

  listHeaderInputText: {
    fontSize: 14,
    paddingHorizontal: Metrics.screenWidth * 0.01,
    width: "100%",
  },

  listHeaderInputPlaceholder: {
    color: "#7F7F7F",
  },

  feedbacksContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: Metrics.screenHeight * 0.01,
    paddingVertical: Metrics.screenHeight * 0.03,
  },

  emptyFeedbacksContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.screenHeight * 0.05,
  },

  emptyFeedbacksText: {
    color: "#7F7F7F",
    fontSize: 14
  },

  titleFeedbacksContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.screenHeight * 0.02,
  },

  titleFeedbacksText: {
    color: "#7F7F7F",
    fontSize: 14
  },

  feedbackItem: {
    width: "100%",
    paddingHorizontal: Metrics.screenWidth * 0.04,
    paddingBottom: Metrics.screenHeight * 0.01,
    borderBottomColor: "#7F7F7F",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  feedbackContent: {
    width: "100%",
    height: "auto",
    paddingLeft: Metrics.screenWidth * 0.1
  },

  feedbackInput: {
    paddingTop: Metrics.screenHeight * 0.01,
    width: "100%",
    paddingHorizontal: Metrics.screenWidth * 0.04,
    height: "auto"
  },

  commentButton: {
    alignSelf: "center"
  },

  ratingInput: {
    marginVertical: Metrics.screenHeight * 0.02
  },

  contactTextExplain: {
    color: "#000",
    fontSize: 16,
    marginVertical: Metrics.screenHeight * 0.03,
    paddingHorizontal: Metrics.screenWidth * 0.07,
    width: "100%",
  },

  formContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "auto",
    paddingVertical: Metrics.screenHeight * 0.01,
    paddingHorizontal: Metrics.screenWidth * 0.07
  },

  contactMessageLabel: {
    color: "#6F6F6F",
    fontSize: 18,
    marginBottom: Metrics.screenHeight * 0.01
  },

  contactButton: {
    alignSelf: "center",
    width: Metrics.screenWidth * 0.76,
    marginTop: Metrics.screenHeight * 0.05
  },

  discountContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: Metrics.screenHeight * 0.02,
  },

  discountText: {
    textAlign: "center",
    color: "#ff6b6b",
    fontSize: 18
  }
})
