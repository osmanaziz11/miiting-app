import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import RouteStack from "../Navigation/RouteStack";
import SplashScreen from "react-native-splash-screen";
import SocketConfig from "../Config/SocketConfig";
import PushConfig from "../Config/PushConfig"

class RootContainer extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.setItem("@shouldAdvert", "yes");
    AsyncStorage.setItem("@notification:read", "");
  }

  render(){
    return(
      <RouteStack />
    )
  }
}

export default RootContainer;
