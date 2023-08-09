import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity, FlatList, Platform, Alert } from "react-native";
import Api from "../Config/Apiconfig";
import { I18n } from "../Lib";
import Styles from "./Styles/MediaFlowStyles";
import Header from "../Components/Header";
import Drawer from "../Components/Drawer";
import Advert from "../Components/Advert";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import GalleryItem from "../Components/GalleryItem";
import Metrics from "../Themes/Metrics";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";
import RNFetchBlob from "rn-fetch-blob";
import NavigationTab from "../Components/NavigationTab";

class MediaFlowContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buttonTriggered: 1,
			index: 0,
			drawerIsOpen: false,
			routes: [
				{ key: "all", title: I18n.t("all") },
				{ key: "photos", title: I18n.t("photos") },
				{ key: "videos", title: I18n.t("videos") },
			],
			data: [],
			dataVideos: [],
			dataPhotos: [],
			currentUser: null,
			currentEvent: null,
			advertOpen: true,
			is_loading: true,
			loaded: ["all"]
		}
		this.renderList = this.renderList.bind(this);
		this.renderTabBar = this.renderTabBar.bind(this);
		this.renderRoutes = this.renderRoutes.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.handlePicker = this.handlePicker.bind(this);
		this.sendFile = this.sendFile.bind(this);
		this.handleAddMedia = this.handleAddMedia.bind(this);
		this.imagePickerResponse = this.imagePickerResponse.bind(this);
		this.handleCamera = this.handleCamera.bind(this);
	}

	componentWillMount() {
		var currentUser = this.props.navigation.getParam("content", {});
		var currentEvent = this.props.navigation.getParam("currentEvent", {});
		this.state.currentUser = currentUser;
		this.state.currentEvent = currentEvent;
	}

	componentDidMount() {
		this.getFeed(null);
	}

	getFeed(last_id) {
		Api.getMediaFeed(this.state.currentEvent.id, last_id)
			.then(response => {
				switch (response.status) {
					case "success":
						let data = _.concat(this.state.data, _.reverse(response.content))
						this.setState({
							is_loading: false,
							data,
							dataVideos: data.filter(item => item.type !== null && item.type.startsWith("video/")),
							dataPhotos: data.filter(item => item.type !== null && item.type.startsWith("image/"))
						}, () => { this.renderRoutes() })
						break;
					case "error":
						break;
				}
			})
	}

	renderRoutes() {
		var routes = [
			{ key: "all", title: `${I18n.t("all")} (${this.state.dataVideos.length + this.state.dataPhotos.length})` },
			{ key: "photos", title: `${I18n.t("photos")} (${this.state.dataPhotos.length})` },
			{ key: "videos", title: `${I18n.t("videos")} (${this.state.dataVideos.length})` },
		]

		this.setState({ routes: routes });
	}

	renderTabBar(props) {

		return (<View>
			<TabBar
				{...props}
				style={{ backgroundColor: "transparent" }}
				getLabelText={({ route }) => route.title}
				labelStyle={Styles.labelStyle}
				indicatorStyle={Styles.indicator} />
		</View>)
	}

	handleRefresh(e) {
		let contentHeight = e.nativeEvent.contentSize.height;
		let layoutSize = e.nativeEvent.layoutMeasurement.height;
		let y = contentHeight - layoutSize;
		if (y.toFixed() === e.nativeEvent.contentOffset.y.toFixed()) {
			this.getFeed(this.state.data[this.state.data.length - 1].id);
			this.renderRoutes();
		}
	}

	renderList(bool) {
		var renderItems = {};
		var data = this.state.data;
		if (this.state.buttonTriggered == 2) {
			data = data.filter(item => item.origin == "guest");
		}
		if (this.state.buttonTriggered == 3) {
			data = data.filter(item => item.origin == "provider");
		}

		this.state.dataPhotos = data.filter(item => item.type !== null && item.type.startsWith("image/"));
		this.state.dataVideos = data.filter(item => item.type !== null && item.type.startsWith("video/"));

		if (!this.state.isLoading) {
			if (bool === null && data.length <= 0) {
				return (<View style={Styles.noMediaFeedContainer}><Text style={Styles.noMediaFeedText}>{I18n.t("no_media_feed")}</Text></View>);
			} else if (bool === true && this.state.dataPhotos.length <= 0) {
				return (<View style={Styles.noMediaFeedContainer}><Text style={Styles.noMediaFeedText}>{I18n.t("no_photos")}</Text></View>);
			} else if (bool === false && this.state.dataVideos.length <= 0) {
				return (<View style={Styles.noMediaFeedContainer}><Text style={Styles.noMediaFeedText}>{I18n.t("no_videos")}</Text></View>);
			}
		}
		return (
			<FlatList
				contentContainerStyle={Styles.mediaFeedList}
				data={bool == null ? data : bool ? this.state.dataPhotos : this.state.dataVideos}
				renderItem={(item, index) => this.renderItem(item, index)}
				keyExtractor={(item, index) => index.toString()}
				horizontal={false}
				numColumns={3}
				onScroll={(e) => { this.handleRefresh(e) }} />
		)
	}

	renderItem({ item, index }) {
		return (
			<GalleryItem key={index} type={item.type} itemKey={item.id} src={{ uri: item.thumbnail }} navigate={() => {
				this.props.navigation.navigate("ImageViewer", { content: this.state.currentUser, currentEvent: this.state.currentEvent, file: item, route: "feed", flowContent: this.state.data, flowIndex: index })
			}} />
		)
	}

	handleAddMedia(){
		Alert.alert(
			I18n.t("media_flow_source_select_title"),
			I18n.t("media_flow_source_select_body"),
			[
				{
					text: I18n.t("media_flow_source_select_camera"),
					onPress: this.handleCamera
				},
				{
					text: I18n.t("media_flow_source_select_gallery"),
					onPress: this.handlePicker
				},
				{
					text: I18n.t("media_flow_source_select_cancel"),
					onPress: ()=>{},
					style: "cancel"
				}
			],
			{cancelable: true}
		)
	}

	imagePickerResponse(response){
		if(typeof response !== "array" && response[0] === undefined){
			response = [response];
		}
		let acceptedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "image/bmp"];
		let sizeLimit = 50000000;
		for (var i in response) {
			if (!(acceptedTypes.includes(response[i].mime))) {
				Alert.alert(I18n.t("chat_upload_title"), I18n.t("unsupported_format"));
				return;
			}
		}
		if (response.length == 1) {
			if (response[0].mime.startsWith("video")) {
				if (response[0].size >= sizeLimit) {
					Alert.alert(I18n.t("chat_upload_title"), I18n.t("chat_size_limit_exceeded"));
				} else {
					let path = response[0].path
					if (Platform.OS === "ios") {
						let arr = path.split('/')
						const dirs = RNFetchBlob.fs.dirs
						path = `${dirs.DocumentDir.replace("/Documents", "")}/tmp/react-native-image-crop-picker/${arr[arr.length - 1]}`
					}
					RNFetchBlob.fs.readFile(path, "base64").then(data => {
						this.sendFile({ data, mime: response[0].mime }, this.state.currentEvent.id)
					})
				}
			} else {
				this.sendFile({ data: response[0].data, mime: response[0].mime }, this.state.currentEvent.id);
			}
		} else {
			if (response.length > 5) {
				Alert.alert(I18n.t("chat_upload_title"), I18n.t("too_many_files"));
			} else {
				let all = response;
				let length = response.length;
				let videos = all.filter(item => item.mime.startsWith("video"));
				let promises = [];
				if (videos.length > 0) {
					videos.map(item => {
						if (item.size >= sizeLimit) {
							Alert.alert(I18n.t("chat_upload_title"), I18n.t("chat_size_limit_exceeded"));
							length = length - 1;
						} else {
							let path = item.path;
							if (Platform.OS === "ios") {
								let arr = path.split('/')
								const dirs = RNFetchBlob.fs.dirs
								path = `${dirs.DocumentDir.replace("/Documents", "")}/tmp/react-native-image-crop-picker/${arr[arr.length - 1]}`
							}
							let videoData = RNFetchBlob.fs.readFile(path, "base64");
							promises.push(videoData);
						}
					});
				}
				Promise.all(promises).then(values => {
					videos.map((item, index) => {
						item.data = values[index];
					});
					all.map(item => {
						if (item.data) {
							this.sendFile(item, this.state.currentEvent.id);
						}
					});
				});
			}
		}
	}

	handlePicker() {
		ImagePicker.openPicker({
			width: Math.floor(Metrics.eventCoverWidth),
			height: Math.floor(Metrics.eventCoverHeight),
			includeBase64: true,
			mediaType: "any",
			multiple: true,
			maxFiles: 5,
			forceJpg: true,
		}).then(this.imagePickerResponse).catch(err => {
			if (err.code === "E_PERMISSION_MISSING") {
				Alert.alert(I18n.t("chat_title_" + this.state.chat_type), I18n.t("chat_permission_needed"));
			}
		});
	}

	handleCamera(){
		ImagePicker.openCamera({
			width: Math.floor(Metrics.eventCoverWidth),
			height: Math.floor(Metrics.eventCoverHeight),
			includeBase64: true,
			mediaType: "any",
			multiple: true,
			maxFiles: 5,
			forceJpg: true,
		}).then(this.imagePickerResponse).catch(err => {
			if (err.code === "E_PERMISSION_MISSING") {
				Alert.alert(I18n.t("chat_title_" + this.state.chat_type), I18n.t("chat_permission_needed"));
			}
		});
	}

	sendFile(file) {
		Api.sendFile({
			file: file.data,
			mime_type: file.mime,
			comment: null
		}, this.state.currentEvent.id).then(response => {
			switch (response.status) {
				case "success":
					let data = this.state.data;
					data.unshift(response.content);
					this.setState({
						data,
						dataVideos: data.filter(item => item.type !== null && item.type.startsWith("video/")),
						dataPhotos: data.filter(item => item.type !== null && item.type.startsWith("image/")),
					}, () => this.renderRoutes());
					break;
				case "error":
					Alert.alert(I18n.t("media_flow_title"), I18n.t("unknown_error"));
					break;
				default:
					Alert.alert(I18n.t("media_flow_title"), I18n.t("unknown_error"));
					break;
			}
		})
	}

	render() {
		return (
			<View style={this.state.drawerIsOpen ? Styles.cover : Styles.container}>
				<Header title={I18n.t("media_flow_title")} onMenuPressed={() => { this.setState({ drawerIsOpen: !this.state.drawerIsOpen }) }} onAddPressed={this.handleAddMedia} />
				<Drawer onChangeEvent={(item) => {
					this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
				}}
					isOpen={this.state.drawerIsOpen} bind={this} />
				<Advert
					adType={"popup"}
					onClose={() => { this.setState({ advertOpen: false }) }}
					isOpen={this.state.advertOpen}
					screenLocation={"mediafeed"}
					eventType={this.state.currentEvent.kind.id} />
				<View style={Styles.buttonsContainer}>
					<TouchableOpacity onPress={() => { this.setState({ buttonTriggered: 1 }, () => { this.renderRoutes() }) }} style={this.state.buttonTriggered === 1 ? [Styles.button, Styles.buttonActive] : Styles.button}>
						<Text style={this.state.buttonTriggered === 1 ? [Styles.buttonText, Styles.buttonTextActive] : Styles.buttonText}>{I18n.t("all")}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { this.setState({ buttonTriggered: 2 }, () => { this.renderRoutes() }) }} style={this.state.buttonTriggered === 2 ? [Styles.button, Styles.borderButton, Styles.buttonActive,] : [Styles.button, Styles.borderButton]}>
						<Text style={this.state.buttonTriggered === 2 ? [Styles.buttonText, Styles.buttonTextActive] : Styles.buttonText}>{I18n.t("guests")}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => { this.setState({ buttonTriggered: 3 }, () => { this.renderRoutes() }) }} style={this.state.buttonTriggered === 3 ? [Styles.button, Styles.buttonActive] : Styles.button}>
						<Text style={this.state.buttonTriggered === 3 ? [Styles.buttonText, Styles.buttonTextActive] : Styles.buttonText}>{I18n.t("providers")}</Text>
					</TouchableOpacity>
				</View>
				<View style={Styles.contentContainer}>
					<TabView
						navigationState={this.state}
						renderTabBar={this.renderTabBar}
						renderScene={SceneMap({
							"all": () => { return this.renderList(null) },
							"photos": () => { return this.renderList(true) },
							"videos": () => { return this.renderList(false) }
						})}
						onIndexChange={index => this.setState({ index })}
						initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
				</View>
				<NavigationTab bind={this}/>
			</View>
		)
	}
}

export default MediaFlowContainer;
