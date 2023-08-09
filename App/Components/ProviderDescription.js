import React, { Component } from "react";
import { View, Text, WebView } from "react-native";
import AppConfig from "../Config/Appconfig";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Styles from "./Styles/ProviderDescriptionStyles";

class ProviderDescription extends Component {

	constructor(props) {
		super(props);
		this.state = {
			html: "",
			height: 1
		}
	}

	aggregateHTML(html){
		return(`
			<!DOCTYPE html>
			<html lang="en" dir="ltr">
			  <head>
			    <meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
				</head>
			  <body style="width: 100vw;">
			    ${html}
			  </body>
				<script>
					document.addEventListener('DOMContentLoaded', function () {
						document.title = document.body.offsetHeight;
						window.location.hash = 1;
					});
				</script>
			</html>
		`);
	}

	render() {
		if(!this.props.content || this.props.content.length <= 0) return null;
		return (
			<WebView
				style={[Styles.container, {height: this.state.height}]}
				javaScriptEnabled={true}
				bounces={false}
				scrollEnabled={false}
				onNavigationStateChange={navState => {
					if(navState.title && !isNaN(navState.title)){
						this.setState({height: parseInt(navState.title) + 10})
					}
				}}
				source={{html: this.aggregateHTML(this.props.content)}}/>
		)
	}
}

export default ProviderDescription;
