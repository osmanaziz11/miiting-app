import React, { Component } from "react";
import { View, Text, TouchableOpacity, Platform, Alert, Image } from "react-native";
import AppConfig from "../Config/Appconfig";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import Styles from "./Styles/ImageGalleryModalStyles";
import Modal from "react-native-modal";
import PhotoView from "react-native-photo-view";
import Swiper from "react-native-swiper";

class ImageGalleryModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			swiperIndex: 0,
			overlayVisible: true
		}
		this.renderImageItem = this.renderImageItem.bind(this);
		this.onRequestClose = this.onRequestClose.bind(this);
	}

	onRequestClose(){
		if(this.props.onClose) this.props.onClose();
	}

	formatImageAddress(imageUrl){
    return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
  }

	renderImageItem(item, index){
		return (
			<View key={index} style={Styles.innerSwiperContainer}>
				<PhotoView
					style={Styles.imageViewer}
					minimumZoomScale={1.0}
					scale={1.0}
					maximumZoomScale={3.0}
					androidScaleType={"fitCenter"}
					source={{uri: this.formatImageAddress(item)}}
					onTap={()=>{this.setState({overlayVisible: !this.state.overlayVisible})}}/>
			</View>
		)
	}

	render() {
		return (
			<Modal
				animationIn={"fadeIn"}
				animationOut={"fadeOut"}
				isVisible={this.props.isVisible}
				hasBackdrop={false}
				onBackButtonPress={this.onRequestClose}
				onBackdropPress={this.onRequestClose}
				swipeDirection={[]}
				propagateSwipe={false}
				style={Styles.modal}>
				<View style={Styles.contentContainer}>
					{this.state.overlayVisible &&
						<View style={Styles.overlay}>
							<TouchableOpacity
								hitSlop={{top: 20, left: 20, right: 20, bottom: 10}}
								onPress={this.onRequestClose}
								style={Styles.closeButton}>
								<Image source={Images.icons.cancel} style={Styles.closeButtonIcon} resizeMode={"contain"}/>
							</TouchableOpacity>
						</View>}
					{this.props.images.length > 0 && <Swiper
						ref={"swiper"}
						index={0}
						loop={false}
						autoplay={false}
						scrollEnabled={true}
						showsPagination={false}
						showsButtons={this.state.overlayVisible}
						onIndexChanged={swiperIndex=>{this.setState({swiperIndex})}}
						containerStyle={Styles.swiperContainer}>
						{this.props.images.map(this.renderImageItem)}
					</Swiper>}
				</View>
			</Modal>
		)
	}
}

export default ImageGalleryModal;
