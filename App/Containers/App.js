/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RootContainer from "./RootContainer";
import { YellowBox } from "react-native";

export default class App extends Component {
  constructor(props){
    super(props);
    YellowBox.ignoreWarnings([
      "Remote debugger",
      "Warning: isMounted",
      "has been extracted from react-native core",
      "requires main queue setup"
    ])
  }
  render() {
    return (
      <RootContainer />
    );
  }
}
