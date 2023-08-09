import { StyleSheet, Platform } from "react-native";
import Metrics from "../../Themes/Metrics";

export default StyleSheet.create({

  drawerContainer: {
    zIndex: 998,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: "absolute",
  },

  appVersionContainer: {
    alignSelf: "center",
  },

  appVersionText: {
    fontSize: 14,
    color: "#A5A9B4"
  },

  background: {
    zIndex: 999,
    width: Metrics.screenWidth - Metrics.drawerWidth,
    height: Metrics.screenHeight,
    position: "absolute",
    left: Metrics.drawerWidth,
    top: 0,
    backgroundColor: "rgba(44, 47, 66, 0.4)"
  },

  container: {
    backgroundColor: "#FFF",
    justifyContent: "flex-start",
    position: "absolute",
    zIndex: 1000,
    width: Metrics.drawerWidth,
    minHeight: Metrics.screenHeight,
    top: 0,
    left: 0
  },

  eventContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "flex-start",
    marginLeft: 30,
  },

  event_pic: {
    width: Metrics.screenWidth * 0.125,
    height: Metrics.screenWidth * 0.125,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 4,
  },

  eventDescription: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: Metrics.drawerWidth * 0.6
  },

  eventDate: {
    color: "#A5A9B4",
  },

  eventText: {
    overflow: "hidden",
    fontSize: 18,
    color: "black",
  },

  eventTextSelected: {
    color: "#527afe"
  },

  title: {
    marginBottom: 4,
    fontSize: Metrics.loginSentenceFontSize * 0.9,
    color: "#A5A9B4",
    marginLeft: 30,
  },

  drawerHeader: {
    backgroundColor: "#D3DEFE",
    width: Metrics.drawerWidth,
    height: Metrics.headerHeight,
    justifyContent: "center",
    alignItems: "center",
  },

  drawerTitle: {
    fontSize: Metrics.loginSentenceFontSize * 1.2,
    color: "#547FFA",
  },

  swiper: {
    width: Metrics.drawerWidth,
    height: Metrics.screenHeight,
    position: "absolute",
    top: 0,
    left: 0,
  },

  slide: {

  },

  othersEvents: {
    width: Metrics.drawerWidth * 0.8,
    marginTop: 20,
  },

  pagination: {
    bottom: Metrics.headerHeight * 0.95,
  },

  options: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 30,
  },

  createOrJoinButton: {
    width: Metrics.screenWidth * 0.125,
    height: Metrics.screenWidth * 0.125,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  createOrJoinButtonImage: {
    width: Metrics.screenWidth * 0.06,
    height: Metrics.screenHeight * 0.06
  },

  createOrJoinText: {
    width: Metrics.screenWidth * 0.5,
    fontSize: Metrics.loginSentenceFontSize,
  },

  separator: {
    borderBottomColor: "#E2E5E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginHorizontal: 30,
    marginVertical: 20,
  },

  backgroundEventPic: {
    width: Metrics.eventCoverWidth,
    height: Metrics.eventCoverHeight
  },

  backArrowButton: {
    position: "absolute",
    top: Metrics.statusBarHeight * 1.1,
    left: 15,
    zIndex: 1000,
  },

  backArrow: {
    width: 40,
    height: 40
  },

  manageButton: {
    position: "absolute",
    top: Metrics.statusBarHeight * 1.1,
    right: 15,
    zIndex: 1000,
  },

  manageIcon: {
    width: 40,
    height: 40
  },

  header: {
    justifyContent: "center",
    alignItems: 'center',
  },

  headerContent: {
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: 'center',
    position: "absolute",
    zIndex: 1000,
    borderRadius: 7,
    bottom: - 45,
  },

  currentEventName: {
    color: "#000",
    fontSize: Metrics.loginSentenceFontSize * 1.2,
    textAlign: "center",
  },

  currentEventDate: {
    color: "#B9B9BD",
    fontSize: Metrics.loginSentenceFontSize
  },

  menu: {
    marginHorizontal: 30,
    marginTop: 50,
    width: Metrics.drawerWidth * 0.9,
    maxHeight: Metrics.screenHeight * 0.50,
  },

  buttonsListContainer: {
    maxHeight: Metrics.screenHeight * 0.39,
    width: "100%",
    marginVertical: Metrics.screenWidth * 0.04,
  },

  buttonContainer: {
    height: Metrics.screenHeight * 0.06,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Metrics.screenHeight * 0.012
  },

  buttonIconContainer: {
    height: Metrics.screenHeight * 0.06,
    width: Metrics.screenHeight * 0.06,
    borderRadius: Metrics.screenHeight * 0.06,
    borderColor: "#c1ccda",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Metrics.screenWidth * 0.04
  },

  buttonIcon: {
    width: "50%",
    height: "50%",
    overflow: 'visible',
  },

  buttonText: {
    overflow: "hidden",
    color: "#6d7a8d",
    fontWeight: Platform.select({ios: "600", android: "normal"}),
    fontSize: 12,
    width: "100%",
  },

  buttonTextActive: {
    color: "#527afe",
  },

  firstSlide: {
    backgroundColor: "#F5F7FA",
    paddingTop: Metrics.statusBarHeight,
  },

  flatListScrollView: {
    maxHeight: Metrics.screenHeight * 0.55,
  },

  dotStyle: {
    backgroundColor: "rgba(82, 122, 254, 0.2)",
  },

  activeDotStyle: {
    backgroundColor: "rgba(82, 122, 254, 1)",
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  footer: {
    width: Metrics.drawerWidth,
    height: Metrics.headerHeight * 0.8,
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderStyle: "solid",
    borderTopColor: "#E2E5E8",
    borderTopWidth: 1,

  },

  logoutButton: {
    width: Metrics.screenWidth * 0.05,
    height: Metrics.screenWidth * 0.05,
    position: "absolute",
    right: 15,
  },

  editUserButton: {
    width: Metrics.screenWidth * 0.05,
    height: Metrics.screenWidth * 0.05,
    position: "absolute",
    left: 15,
  },

  footerIcon: {
    width: "100%",
    height: "100%",
  },

  userName: {
    marginLeft: 45,
    overflow: "hidden",
    width: "75%",
  },

  leaveEventButton: {
    position: "absolute",
    top: "25%",
    right: 0,
    zIndex: 10000
  },

  eventTextReduced: {
    overflow: "hidden",
    width: "80%"
  },

  floatingUnreadBubble: {
    width: 15,
    height: 15,
    backgroundColor: "red",
    borderRadius: 10000,
    position: "absolute",
    top: -5,
    left: -5,
    zIndex: 100000,
    borderWidth: 2,
    borderColor: "#F5F7FA",
    marginVertical: 10,
    marginLeft: 30,
  },
})
