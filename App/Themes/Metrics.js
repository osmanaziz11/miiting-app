import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  statusBarHeight : Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,

  avatarSize : screenHeight * 0.15,

  headerHeight : screenHeight * 0.096,
  headerPaddingHorizontal : screenWidth * 0.0426,

  drawerWidth: screenWidth * 0.82,

  textInputHeight : screenHeight * 0.075,
  textInputMarginVertical : screenHeight * 0.0182,

  loginSentenceFontSize : screenWidth * 0.045,

  tableThumbSize: screenWidth * 0.2,

  eventCoverWidth: screenWidth * 0.82,
  eventCoverHeight: screenHeight * 0.30,
  advertBannerHeight: screenHeight * 0.10,
};

export default metrics;
