import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import Styles from "./Styles/FormatInputStyles";
import { I18n } from "../Lib";

class FormatInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFocused: false,
      text: "",
      hasUpdatedValue: false,
      dynamicHeight: null,
    }
    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
    this.onContentSizeChangeHandler = this.onContentSizeChangeHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  componentDidMount(){
    if(this.props.initialValue && typeof this.props.initialValue === "string"){
      this.inputRef.setNativeProps({text: this.props.initialValue});
      this.setState({text: this.props.initialValue, hasUpdatedValue: true});
      if(this.props.onChangeText) this.props.onChangeText(this.props.initialValue);
    }
  }

  componentDidUpdate(prevProps){
    if(!this.state.hasUpdatedValue && typeof this.props.initialValue === "string" && this.props.initialValue !== prevProps.initialValue){
      this.inputRef.setNativeProps({text: this.props.initialValue});
      this.setState({text: this.props.initialValue, hasUpdatedValue: true});
      if(this.props.onChangeText) this.props.onChangeText(this.props.initialValue);
    }
  }

  onFocusHandler(event){
    this.setState({isFocused: true});
    if(this.props.onFocus) this.props.onFocus(event);
  }

  onBlurHandler(event){
    this.setState({isFocused: false});
    if(this.props.onBlur) this.props.onBlur(event);
  }

  onChangeTextHandler(text){
    this.setState({text});
    if(this.props.onChangeText) this.props.onChangeText(text);
  }

  onContentSizeChangeHandler(event){
    let { height } = event.nativeEvent.contentSize;
    if(height !== this.state.dynamicHeight){
      this.setState({dynamicHeight: height});
      if(this.props.onHeightChange) this.props.onHeightChange(height);
      if(this.props.onContentSizeChange) this.props.onContentSizeChange(event);
    }
  }

  render(){
    return(
      <TextInput
        autoCorrect={false}
        placeholder={I18n.t("default_placeholder")}
        underlineColorAndroid={"transparent"}
        {...this.props}
        ref={ref => {
          this.inputRef = ref;
          if(this.props.setRef) this.props.setRef(ref);
        }}
        onChangeText={this.onChangeTextHandler}
        onFocus={this.onFocusHandler}
        onBlur={this.onBlurHandler}
        style={[Styles.textinput, this.props.multiline ? Styles.textinputMultiline : null, (this.state.dynamicHeight !== null ? {height: this.state.dynamicHeight} : null), this.props.style]} />
    )
  }
}

export default FormatInput;
