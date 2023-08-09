import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, Platform } from "react-native";
import Styles from "./Styles/SearchBarStyles";
import { I18n } from "../Lib";
import Images from "../Themes/Images";

class SearchBar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View
        style={Styles.container}>
        <Image
          source={Images.icons.search}
          resizeMode={"center"}
          style={Styles.searchIcon}/>
        <TextInput
          ref={"searchInput"}
          underlineColorAndroid={"transparent"}
          returnKeyType={"search"}
          clearButtonMode={"always"}
          style={Styles.mainInput}
          value={this.props.value}
          placeholder={I18n.t("search_placeholder")}
          placeholderTextColor={"#8a91a1"}
          onChangeText={value => {this.props.onChange(value)}}
          />
          {Platform.OS == "android" && 
            this.props.value.length > 0 &&
              <TouchableOpacity onPress={this.props.onClearButtonPressed} style={Styles.clearButton} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <Image source={Images.icons.clear_img} resizeMode={"center"} style={Styles.clearButtonImg}/>
              </TouchableOpacity>
          }
      </View>
    )
  }
}

export default SearchBar;
