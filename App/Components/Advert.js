import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Modal, Linking, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import AppConfig from "../Config/Appconfig";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import Styles from "./Styles/AdvertStyles";
import Api from "../Config/Apiconfig";
import MiitingLoader from "./MiitingLoader";

class Advert extends Component {

	constructor(props) {
		super(props);
		this.state = {
			closeTimer: 10,
			closeButtonTimer: 3,
			closeButtonActive: false,
			dataSource: null,
			currentAdvert: 0,
			isLoading: false,
			countdownEnded: false,
			shouldAdvert: true,
		}
		this.modalCloseButtonTimerInterval = this.modalCloseButtonTimerInterval.bind(this);
		this.modalCloseTimerInterval = this.modalCloseTimerInterval.bind(this);
	}

	componentWillMount() {
		try {
			AsyncStorage.getItem("@shouldAdvert", (error, value) => {
				if (value != "no") {
					this.state.shouldAdvert = true;
				} else {
					this.state.shouldAdvert = false;
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		Api.advertList(this.props.adType, this.props.screenLocation, this.props.eventType).then(response => {
			switch (response.status) {
				case "success":
					this.setState({ dataSource: response.content, isLoading: false }, () => {
						if (this.props.countdownToShow) {
							if (this.state.shouldAdvert) {
								console.log("Ad will show");
								setTimeout(() => {
									this.setState({ countdownEnded: true });
									setInterval(this.modalCloseButtonTimerInterval, 1000);
									setInterval(this.modalCloseTimerInterval, 1000);
								}, this.props.countdownToShow * 1000);
								this._setShouldAdvert();
							} else {
								console.log("Ad will NOT show");
							}
						} else {
							this.setState({ countdownEnded: true });
							setInterval(this.modalCloseButtonTimerInterval, 1000);
							setInterval(this.modalCloseTimerInterval, 1000);
						}

					});
					break;
				default:
					this.setState({ isLoading: false });
			}
		});
	}

	_setShouldAdvert = async () => {
		await AsyncStorage.setItem("@shouldAdvert", "no");
	}

	modalCloseButtonTimerInterval() {
		if (this.state.closeButtonTimer >= 0) {
			this.setState({ closeButtonTimer: this.state.closeButtonTimer - 1 })
		}
	}

	modalCloseTimerInterval() {
		if (this.state.closeTimer >= 0) {
			this.setState({ closeTimer: this.state.closeTimer - 1 })
		}
	}

	formatImageUrl(imageUrl) {
		return imageUrl.startsWith("/file/get/") ? AppConfig.cdnUrl + imageUrl : imageUrl;
	}

	navigateToDestination(advert) {
		Api.advertAddClick(advert.id);
		if (advert.url && advert.url != null) {
			if (Linking.canOpenURL(advert.url)) {
				Linking.openURL(advert.url);
			} else {
				Alert.alert(I18n.t("advert_title"), I18n.t("device_unable"));
			}
		}
	}


	render() {
		switch (this.props.adType) {
			case "banner":
				if (this.state.dataSource == null || this.state.dataSource.length <= 0) return (<View></View>)
				return (
					<View style={Styles.bannerContainer}>
						<TouchableOpacity
							onPress={() => { this.navigateToDestination(this.state.dataSource[0]) }}
							style={Styles.bannerAdvertImageContainer}>
							<Image source={{ uri: this.formatImageUrl(this.state.dataSource[0].file) }} style={Styles.bannerAdvertImage} resizeMode={"contain"} />
						</TouchableOpacity>
					</View>
				);
				break;
			case "popup":
				let isCloseButtonDisabled = this.state.closeButtonTimer >= 0;
				if (this.state.dataSource == null || this.state.dataSource.length <= 0) return (<View></View>)
				Api.advertAddView(this.state.dataSource[0].id)
				return (
					<Modal
						animationType={"slide"}
						visible={this.props.isOpen && this.state.closeTimer >= 0 && this.state.countdownEnded}
						transparent={false}
						onRequestClose={() => { }}>
						<View style={Styles.popupContainer}>
							<TouchableOpacity
								disabled={isCloseButtonDisabled}
								style={Styles.modalCloseButtonContainer}
								onPress={this.props.onClose}>
								{!isCloseButtonDisabled && <Image source={Images.icons.cancel} style={Styles.modalCloseButtonIcon} />}
								{isCloseButtonDisabled && <Text style={Styles.modalCloseButtonText}>{this.state.closeButtonTimer}</Text>}
							</TouchableOpacity>
							<TouchableOpacity
								onPress={this.navigateToDestination}
								style={Styles.modalAdvertImageContainer}>
								<Image source={{ uri: this.formatImageUrl(this.state.dataSource[0].file) }} style={Styles.modalAdvertImage} resizeMode={"contain"} />
							</TouchableOpacity>
							{this.state.isLoading && <MiitingLoader />}
						</View>
					</Modal>
				);
				break;
			default:
				return (<View></View>);
		}
	}
}

Advert.proptTypes = {
	adType: PropTypes.string.required,
	isOpen: PropTypes.bool.required,
	onClose: PropTypes.func
}

export default Advert;
