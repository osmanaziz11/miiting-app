import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./Styles/ThumbTableStyles";
import { I18n } from "../Lib";
import LinearGradient from "react-native-linear-gradient";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import Avatar from "../Components/Avatar";
import ViewOverflow from "react-native-view-overflow";

class ThumbTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwnTable : false,
    }
  }

  render() {
    return (
      <ViewOverflow
        style={[this.props.table.shape == "rectangle"? Styles.tableContainerRectangle : Styles.tableContainerCircle,
        (this.props.table.shape == "rectangle" && this.props.table.orientation) == "vertical"? Styles.tableContainerVertical: null, {
          top: (this.props.table.y) + "%",
          left: (this.props.table.x)+ "%"
        }]}>
        <TouchableOpacity
          style={Styles.touchableFull}
          onPress={() => {this.props.onPress(this.props.table.id)}}>
          <LinearGradient
            colors={this.props.isOwnTable? ["#527afe", "#7fa8fe"]: ["#D1DCFF", "#D1DCFF"]}
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
            style={[Styles.gradient, this.props.table.shape == "circle" ? {borderRadius: Metrics.tableThumbSize} : null]}>
            <Text style={[Styles.tableViewText, this.props.isOwnTable? Styles.tableViewTextOwnTable : null]}>{I18n.t("table_view").toUpperCase()}</Text>
          </LinearGradient>
        </TouchableOpacity>
        {this.props.isOwnTable &&
        <Image resizeMode={"contain"} style={Styles.tablePin} source={Images.icons.table_pin}/>}
        {this.props.isOwnTable && false &&
        <Avatar
          style={Styles.avatar}
          source={this.props.ownUser.picture}
          height={Metrics.screenHeight * 0.04}
          width={Metrics.screenHeight * 0.04}
          initials={this.props.ownUser.initials}/>}
        <Text numberOfLines={1} style={[Styles.tableNameText, this.props.isOwnTable? Styles.tableNameTextOwn: null]}>{this.props.table.name}</Text>
      </ViewOverflow>
    )
  }
}


export default ThumbTable;
