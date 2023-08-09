import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Styles from "./Styles/DetailsTableStyles";
import { I18n } from "../Lib";
import LinearGradient from "react-native-linear-gradient";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import Avatar from "../Components/Avatar";
import ViewOverflow from "react-native-view-overflow";

class DetailsTable extends Component {
  constructor(props) {
    super(props);
  }

  renderSeat(guest, key){
    let angle = 360 / this.props.table.places_number * key;
    let upperText = angle < 90 || angle > 270;
    return(
      <View key={key} style={[Styles.seatContainer,{
        transform: ([{rotate: angle + "deg"}])
      }]}>
        <View style={[Styles.seat, {
          transform: ([{rotate: - angle + "deg"}])
        },
        (guest != null && this.props.ownUser.id == guest.id)? Styles.seatOwnUser : null
        ]}>
          {guest != null &&
            <Avatar
              height={Metrics.screenWidth * 0.093}
              width={Metrics.screenWidth * 0.093}
              invertedColors
              source={guest.picture}
              initials={guest.initials}/>}
          {guest != null &&
            <Text numberOfLines={2} style={[Styles.guestNameText, upperText? Styles.guestNameUpper: Styles.guestNameLower]}>{guest.firstname + " "+ guest.lastname}</Text>}
        </View>
      </View>
    )
  }

  render() {
    let seats = this.props.table.guests.map((item, key) => this.renderSeat(item, key));
    let emptySeats = [];
    for (i = 0; i < this.props.table.places_number; i++){
      emptySeats.push(this.renderSeat(null, i))
    }
    return (
      <View style={Styles.container}>
        <LinearGradient
          colors={["#527afe", "#7fa8fe"]}
          start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
          style={Styles.mainTableContainer}>

          <Text numberOfLines={2} style={Styles.mainTableName}>{this.props.table.name}</Text>
        </LinearGradient>
        <ViewOverflow style={Styles.overflowView}>
          {emptySeats}
          {seats}
        </ViewOverflow>
      </View>
    )
  }
}


export default DetailsTable;
