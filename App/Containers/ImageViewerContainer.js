import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text, Alert, Platform, CameraRoll } from "react-native";
import Styles from "./Styles/ImageViewerStyles";
import Avatar from "../Components/Avatar";
import PhotoView from 'react-native-photo-view';
import { I18n } from "../Lib";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Video from "react-native-video";
import Metrics from "../Themes/Metrics";
import MiitingLoader from "../Components/MiitingLoader";
import Images from "../Themes/Images";
import moment from "moment/min/moment-with-locales";
import Api from "../Config/Apiconfig";
import AppConfig from "../Config/Appconfig";
import RNFetchBlob from "rn-fetch-blob";
import Toast, { DURATION } from 'react-native-easy-toast';
import Share from "react-native-share";
import _ from "lodash";

class ImageViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            fullText: false,
            liked: false,
            showOverlay: true,
            paused: true,
            playerHeight: null,
            currentUser: null,
            currentEvent: null,
            file: "",
            is_img_loaded: false,
            imageSource: null,
            flowContent: [],
            flowIndex: 0,
        }
        this.handleLayout = this.handleLayout.bind(this);
        this.loadEnd = this.loadEnd.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.shareFile = this.shareFile.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    componentWillMount() {
        moment.locale('fr');
        var currentUser = this.props.navigation.getParam("content", {});
        var currentEvent = this.props.navigation.getParam("currentEvent", {});
        var flowContent = this.props.navigation.getParam("flowContent", []);
        var flowIndex = this.props.navigation.getParam("flowIndex", 0);
        this.state.currentUser = currentUser;
        this.state.currentEvent = currentEvent;
        this.state.flowContent = flowContent;
        this.state.flowIndex = flowIndex;
        var file = this.props.navigation.getParam("file", {});
        file.content = file.content !== null ? file.content : "";
        this.state.file = file;
        console.log(file)
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.setState({ imageSource:  { uri: this.formatImageUrl(this.state.file.url) }});
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    formatImageUrl(imageUrl) {
        if (imageUrl == "") {
            return (imageUrl);
        }

        if (Platform.OS === "ios" && this.state.file.type.startsWith("video")) {
            return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl + "/2/0.mp4" : imageUrl;
        } else {
            return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
        }
    }

    renderPhotoTitle() {
        return this.state.fullText ?
            <Text style={Styles.overlayText}>{this.state.file.content}</Text>
            :
            <View>
                {(this.state.file.content !== null) && <Text numberOfLines={2} style={Styles.overlayText}>{this.state.file.content.substring(0, 50)}</Text>}
                {(this.state.file.content !== null && this.state.file.content.length >= 50) &&
                    <TouchableOpacity onPress={() => { this.renderMoreText() }}>
                        <Text style={[Styles.overlayText, Styles.renderButtonText]}>{I18n.t("following")}</Text>
                    </TouchableOpacity>
                }
            </View>
    }

    renderMoreText() {
        this.setState({ fullText: true })
    }

    commentPhoto() { }

    likePhoto() {
        this.setState({ liked: !this.state.liked })
    }

    handleLayout(evt) {
        let overlayHeight = evt.nativeEvent.layout.height;
        let playerHeight = Metrics.screenHeight - overlayHeight;

        this.setState({ playerHeight: playerHeight })
    }

    deleteFile() {
        Api.deleteFile(this.state.currentEvent.id, this.state.file.id)
            .then(response => {
                switch (response.status) {
                    case "success":
                        let route = this.props.navigation.state.params.route;
                        if (route == "guests") {
                            this.props.navigation.replace("ChatGuests", { content: this.state.currentUser, currentEvent: this.state.currentEvent, chat_type: route });
                        } else if (route == "providers") {
                            this.props.navigation.replace("ChatProviders", { content: this.state.currentUser, currentEvent: this.state.currentEvent, chat_type: route });
                        } else if (route == "feed") {
                            this.props.navigation.replace("MediaFlow", { content: this.state.currentUser, currentEvent: this.state.currentEvent });
                        }
                        break;
                    case "error":
                        Alert.alert(I18n.t("media_feed_title"), I18n.t(response.message));
                        break;
                    default:
                        Alert.alert(I18n.t("media_feed_title"), I18n.t("unknown_error"));
                        break;
                }
            })
    }

    loadEnd() {
      console.warn('load end')
        this.setState({ is_img_loaded: true });
    }

    promptErasePhoto() {
        Alert.alert(
            I18n.t("erase_photo"),
            I18n.t("erase_be_sure"),
            [
                { text: I18n.t("cancel"), onPress: () => null, style: 'cancel' },
                { text: I18n.t("erase"), onPress: () => this.deleteFile() },
            ],
            { cancelable: true }
        )
    }

    shareFile(){
      let url = AppConfig.cdnUrl + this.state.file.url;
      let mime = this.state.file.type;
      let path = `${RNFetchBlob.fs.dirs.DocumentDir}/${this.state.file.id}.${this.state.file.type.split('/')[1]}`;
      RNFetchBlob
          .config({
              fileCache: true,
              path
          })
          .fetch("GET", url)
          .then((res) => {
              RNFetchBlob.fs.readFile(path, "base64").then(response => {
                dataURI = "data:" + mime + ";base64," + response;
                console.log(dataURI)
                Share.open({message: "File from Miiting", url: dataURI});
              })
          }).catch(err => {
              console.log(err);
          })
    }

    downloadFile() {
        let url = AppConfig.cdnUrl + this.state.file.url;
        let path = `${RNFetchBlob.fs.dirs.DocumentDir}/${this.state.file.id}.${this.state.file.type.split('/')[1]}`;
        RNFetchBlob
            .config({
                fileCache: true,
                path
            })
            .fetch("GET", url)
            .then((res) => {
                if (res.respInfo.status === 200) {
                    CameraRoll.saveToCameraRoll(path).then(response => {
                        this.refs.toast.show(I18n.t("download_complete"), 3500);
                    }).catch(err => {
                        console.log(err);
                    });
                    console.log("File downloaded succesfully.");
                } else {
                    console.warn("Failed to download file.");
                }
            }).catch(err => {
                console.log(err);
            })
    }

    handleLike(newValue = true){
      if(newValue){
        Api.likeMedia(this.state.currentEvent.id, this.state.file.id, !this.state.file.has_liked).then(response => {
          console.log(this.state.file, response.content[0].mediaFeedFile)
          if(response.status && response.status === "success"){
            this.setState({file: response.content[0].mediaFeedFile});
          }else{
            Alert.alert(I18n.t("media_feed_title"), I18n.t("unknow_error"));
          }
        });
      }else{
        Api.dislikeMedia(this.state.currentEvent.id, this.state.file.id, !this.state.file.has_disliked).then(response => {
          console.log(this.state.file, response.content[0].mediaFeedFile)
          if(response.status && response.status === "success"){
            this.setState({file: response.content[0].mediaFeedFile});
          }else{
            Alert.alert(I18n.t("media_feed_title"), I18n.t("unknow_error"));
          }
        });
      }
    }

    handleSwipe(forward = true){
      if(this.state.flowContent.length > 0 && !isNaN(this.state.flowIndex)){
        if(forward && this.state.flowContent[this.state.flowIndex - 1]){
          this.setState({
            file: this.state.flowContent[this.state.flowIndex - 1],
            is_img_loaded: false,
            flowIndex: this.state.flowIndex - 1,
            imageSource: null,
          }, () =>{
            this.setState({
              imageSource:  { uri: this.formatImageUrl(this.state.file.url) }
            })
          });
        }else if(!forward && this.state.flowContent[this.state.flowIndex + 1]){
          this.setState({
            file: this.state.flowContent[this.state.flowIndex + 1],
            is_img_loaded: false,
            flowIndex: this.state.flowIndex + 1,
            imageSource:  null,
          }, () =>{
            this.setState({
              imageSource:  { uri: this.formatImageUrl(this.state.file.url) }
            })
          });
        }else{
          if(!forward){
            Api.getMediaFeed(this.state.currentEvent.id, this.state.file.id).then(response => {
              if(response.status && response.status === "success"){
                let data = _.concat(this.state.flowContent, _.reverse(response.content));
                this.state.flowContent = data;
                if(response.content.length > 0){
                  this.handleSwipe(forward);
                }
      				}
      			});
          }
        }
      }
    }

    render() {
        return (
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={Styles.backArrowButton}>
                    <Image style={Styles.backArrow} source={Images.icons.icon_back_drawer} />
                </TouchableOpacity>
                {this.state.currentEvent.role == "owner" &&
                    <TouchableOpacity onPress={() => { this.promptErasePhoto() }} style={Styles.erasePhotoButton}>
                        <Image style={Styles.erasePhoto} source={Images.icons.cancel} />
                    </TouchableOpacity>
                }
                <GestureRecognizer onSwipeLeft={()=>{this.handleSwipe(false)}} onSwipeRight={()=>{this.handleSwipe(true)}} onSwipeDown={() => { this.props.navigation.goBack() }}>
                    {(!this.state.is_img_loaded && this.state.file.type.startsWith("image")) && <MiitingLoader dark={true} style={Styles.loader}/>}
                    {this.state.file.type.startsWith("image") ?
                        <PhotoView
                            onLoadEnd={this.loadEnd}
                            minimumZoomScale={1.0}
                            scale={1.0}
                            maximumZoomScale={3.0}
                            androidScaleType="fitCenter"
                            source={this.state.imageSource}
                            style={Styles.image}
                            onTap={() => { this.setState({ showOverlay: !this.state.showOverlay }) }} />
                        : <Video
                            controls={true}
                            source={{ uri: this.formatImageUrl(this.state.file.url) }}
                            ref={(ref) => { this.player = ref }}
                            fullscreen={false}
                            onError={console.warn}
                            style={Styles.video} paused={false} />
                    }
                </GestureRecognizer>
                {this.state.showOverlay &&
                    <View style={Styles.overlay} onLayout={this.handleLayout}>
                        <View style={Styles.infoContainer}>
                            <View style={Styles.authorContainer}>
                                <Avatar style={Styles.avatar} height={Metrics.screenWidth * 0.125} width={Metrics.screenWidth * 0.125} initials={this.state.file.sender.initials} />
                                <View style={Styles.authorInfo}>
                                    <Text style={[Styles.authorName, Styles.overlayText]}>{this.state.file.sender.firstname + " " + this.state.file.sender.lastname}</Text>
                                    <Text style={[Styles.time, Styles.overlayText]}>{moment.parseZone(this.state.file.createdAt.date).utcOffset("+0200").fromNow()}</Text>
                                </View>
                            </View>
                            <View style={Styles.photoTitleContainer}>
                                {this.renderPhotoTitle()}
                            </View>
                            <View style={Styles.actionContainer}>
                              <TouchableOpacity style={Styles.actionButton} onPress={this.shareFile}>
                                  <Image resizeMode={"contain"} source={Images.icons.share_fa} style={Styles.downloadIcon} />
                              </TouchableOpacity>
                              <TouchableOpacity style={Styles.actionButton} onPress={this.downloadFile}>
                                  <Image resizeMode={"contain"} source={Images.icons.download_fa} style={Styles.downloadIcon} />
                              </TouchableOpacity>
                            </View>
                        </View>
                          <View style={Styles.likesAndCommentsContainer}>
                            <TouchableOpacity
                              onPress={()=>{this.handleLike(true)}}
                              style={Styles.likeButton}>
                              <Image resizeMode={"contain"} source={Images.icons["thumbs_up" + (this.state.file.has_liked ? "_active" : "")]} style={Styles.likeButtonIcon}/>
                            </TouchableOpacity>
                            <Text style={Styles.likeCount}>{this.state.file.likes}</Text>
                            <TouchableOpacity
                              onPress={()=>{this.handleLike(false)}}
                              style={Styles.likeButton}>
                              <Image resizeMode={"contain"} source={Images.icons["thumbs_down" + (this.state.file.has_disliked ? "_active" : "")]} style={Styles.likeButtonIcon}/>
                            </TouchableOpacity>
                            <Text style={Styles.likeCount}>{this.state.file.dislikes}</Text>
                          </View>
                    </View>}
                    <Toast ref="toast"/>
            </View>
        )
    }
}

export default ImageViewer;
