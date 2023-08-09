import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Metrics from "../Themes/Metrics";
import Images from "../Themes/Images";
import Styles from "./Styles/RatingInputStyles";

class RatingInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      maxValue: 5,
    };
    this.renderStar = this.renderStar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    if(this.props.value && this.props.value > 0){
      this.setState({value: this.props.value});
    }
  }

  handleChange(){
    if(this.props.onChange) this.props.onChange(this.state.value);
  }

  renderStar(value){
    let full = value <= this.state.value;
    let style = this.props.style ? {
      width: this.props.style.width ? this.props.style.width / this.state.maxValue : undefined,
      marginHorizontal: this.props.style.width ? ((Metrics.screenWidth * 0.01 * this.props.style.width) / Metrics.screenHeight * 0.05) : undefined,
    } : null;
    return(
      <TouchableOpacity
        disabled={this.props.disabled}
        key={value}
        style={Styles.starContainer}
        onPress={()=>{this.setState({value}, this.handleChange);}}>
        <Image source={Images.icons["rating" + (full ? "_full" : "_empty")]} style={[Styles.starIcon, (this.props.style && style.width ) ? style : null]} resizeMode={"contain"}/>
      </TouchableOpacity>
    );
  }

  render() {
    let starsItem = [];
    for(var i = 1; i <= this.state.maxValue; i++){
      starsItem.push(this.renderStar(i));
    }
    return (
      <View style={[Styles.container, this.props.style]}>
        {starsItem}
      </View>
    );
  }
}

export default RatingInput;
