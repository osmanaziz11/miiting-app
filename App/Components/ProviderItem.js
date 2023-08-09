import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform, Alert, Picker, ActionSheetIOS } from "react-native";
import AppConfig from "../Config/Appconfig";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import Avatar from "./Avatar";
import { I18n } from "../Lib";
import Styles from "./Styles/ProviderItemStyles";
import EraseButton from "../Components/EraseButton";
class ProviderItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			providersVisible: false,
			owning_event: false,
			options: [
				{
					id: 0,
					name: I18n.t("cancel"),
				},
				{
					id: 1,
					name: I18n.t("remove_from_event"),
				},
			],
			isActive: false,
		}
		this.renderProviders = this.renderProviders.bind(this);
		this.toggleProviders = this.toggleProviders.bind(this);
		this.checkActive = this.checkActive.bind(this);
	}

	componentDidMount() {
		this.setState({ owning_event: this.props.event.role === "owner",  });
	}

	eraseProvider(id) {
		this.props.onErase(id);
	}

	toggleProviders() {
		this.setState({ providersVisible: !this.state.providersVisible });
	}

	renderProviders() {
		const provider = this.props.provider;
		return provider.map((companion, key) => (
			<View key={key} style={Styles.companion}>
				<Avatar
					style={Styles.avatar}
					initials={companion.initials}
					height={Metrics.screenWidth * 0.08}
					width={Metrics.screenWidth * 0.08} />
				<Text>{companion.name}</Text>
			</View>)
		)
	}

	async checkActive() {
		setTimeout(() => {
			this.setState({ isActive: false })
		}, 5000);
	}

	render() {
		const provider = this.props.provider;
		return (
			<View
				style={Styles.container}>
				<TouchableOpacity
					onPress={this.toggleProviders}
					style={Styles.mainGuestContainer}>
					<Avatar
						style={Styles.avatar}
						touchable={false}
						source={provider.picture}
						initials={provider.initials}
						height={Metrics.screenWidth * 0.106}
						width={Metrics.screenWidth * 0.106} />
					<View style={Styles.mainGuestTextContainer}>
						<View style={Styles.mainGuestNameContainer}>
							<Text style={Styles.mainGuestName}>{provider.name}</Text>
							{provider.length > 0 &&
								<Text style={Styles.mainGuestProvidersText}>{" " + I18n.t("and") + " " + provider.length + " " + (provider.length == 1 ? I18n.t("other_single") : I18n.t("other_several"))}</Text>}
						</View>
						<Text style={Styles.attendingText}>{I18n.t((provider.is_coming ? "" : "not_") + (this.state.owning_event ? "attending_yours_text" + (provider.length > 0 ? "_several" : "_single") : "attending_text" + (provider.length > 0 ? "_several" : "_single")))}</Text>
					</View>
					{this.props.onErase && <EraseButton isActive={this.state.isActive} onPress={() => {
						this.state.isActive ? this.eraseProvider(provider.id) : this.setState({ isActive: !this.state.isActive }, () => { this.checkActive() })
					}} style={Styles.eraseButton}/>}
				</TouchableOpacity>
				{provider.length > 0 && this.state.providersVisible &&
					<View style={Styles.providersContainer}>
						{this.renderProviders()}
					</View>}
			</View>
		)
	}
}

export default ProviderItem;
