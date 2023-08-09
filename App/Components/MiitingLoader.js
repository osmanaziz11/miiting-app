import React, { Component } from "react";
import AppConfig from "../Config/Appconfig";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";

import Styles from "./Styles/MiitingLoaderStyles";

class CitylikeLoader extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={[Styles.container, this.props.style]}>
        <ActivityIndicator size="large" color={this.props.dark !== undefined ? "#d0d6e0" : "#1a2d4d"} />
      </View>
    )
  }
}

export default CitylikeLoader;
