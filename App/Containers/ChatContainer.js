import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Platform, FlatList, Alert, Keyboard, Linking } from "react-native";
import Header from "../Components/Header";
import Styles from "../Containers/Styles/ChatStyles";
import { I18n } from "../Lib";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import Images from "../Themes/Images";
import ImagePicker from "react-native-image-crop-picker";
import AppConfig from "../Config/Appconfig";
import Metrics from "../Themes/Metrics";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Drawer from "../Components/Drawer";
import Api from "../Config/Apiconfig";
import MiitingLoader from "../Components/MiitingLoader";
import ChatItem from "../Components/ChatItem";
import socket from "../Config/SocketConfig";
import _ from "lodash";
import RNFetchBlob from "rn-fetch-blob";
import PushConfig from "../Config/PushConfig";
import Toast from "react-native-easy-toast";
import Advert from "../Components/Advert";
import NavigationTab from "../Components/NavigationTab";
import moment from "moment";

class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            drawerIsOpen: false,
            message: "",
            messages: [],
            photo: "",
            currentUser: null,
            room_id: null,
            loader: true,
            message_id: null,
            is_loading: true,
            refreshList: false,
            file_type: "",
            multipleCurrentFile: 0,
            multipleFilesLength: 0,
            multipleFiles: false,
            upload_finished: false,
            is_sending: false,
            advertOpen: false,
            replyMessage: null,
        }
        this.renderChatItem = this.renderChatItem.bind(this);
        this.sendFile = this.sendFile.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleAddPhoto = this.handleAddPhoto.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.appendMsg = this.appendMsg.bind(this);
        this.scrollEnd = this.scrollEnd.bind(this);
    }

    componentWillMount() {
        this.state.messages = [];
        var currentUser = this.props.navigation.getParam("content", {});
        var currentEvent = this.props.navigation.getParam("currentEvent", {});
        this.state.currentUser = currentUser;
        this.state.currentEvent = currentEvent;
        currentEvent.unread = false;
    }

    componentDidMount() {
        var currentUser = this.props.navigation.getParam("content", {});
        var currentEvent = this.props.navigation.getParam("currentEvent", {});
        var chat_type = this.props.navigation.getParam("chat_type", "guests");
        let room_id = currentEvent.conversations[chat_type][0];
        this.PushConfig = new PushConfig();
        Api.markConvAsRead(room_id).then(response => {
          console.log(response)
          switch (response.status) {
            case "success":
              let params = this.props.navigation.state.params;
              var events = params.content.user ? params.content.user.events : params.content.events;
              for(var i in events){
                if(events[i].id == currentEvent.id){
                  events[i].unread = false;
                }
              }
              this.PushConfig.setBadge(response.content.unread);
              break;
            default:

          }
        })
        this.setState({currentEvent, room_id, chat_type, currentUser}, this.getMessages)
        socket.on("message", this.appendMsg);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{
          if(this.state.messages.length > 0){
            this.scrollEnd(()=>{}, true)
          }
        });
    }

    componentWillUnMount(){
      this.keyboardDidShowListener.remove();
      socket.off("message", this.appendMsg);
    }

    getMessages() {
        this.setState({ is_loading: true });
        Api.getMessages(this.state.room_id, this.state.message_id).then(response => {
            switch (response.status) {
                case "success":
                    if (response.content.length > 0) {
                        let messages = _.cloneDeep(this.state.messages);
                        messages.unshift(...response.content);
                        this.setState({ messages }, ()=>{
                          console.log(this.state.messages)
                          setTimeout(()=>{
                            this.scrollEnd(() => {
                                this.setState({ loader: false, is_loading: false });
                            }, true);
                          }, 600);
                        });
                    } else {
                        this.setState({ is_loading: false, loader: false })
                    }
                    break;
                case "error":
                    this.setState({ is_loading: false, loader: false })
                    break;

            }
        })
    }

    scrollEnd(callback, animated) {
        if(this.state.messages.filter(message => message.conversation == this.state.room_id).length > 0){
          let index = this.state.messages.indexOf(this.state.messages[this.state.messages.length -1]);
          animated = animated ? animated : true;
          setTimeout(()=>{
            try {
              this.refs.scrollview.scrollToIndex({animated: animated, index, viewPosition: 1, viewOffset: 0});
            } catch (e) {
                // console.log(e)
            }

            if(callback !== undefined) callback();
          }, 300);
        }

    }

    handleAddPhoto() {
        if (this.state.photo === "") {
            ImagePicker.openPicker({
                width: parseInt(Metrics.eventCoverWidth, 10),
                height: parseInt(Metrics.eventCoverHeight, 10),
                includeBase64: true,
                mediaType: "any",
                multiple: true,
                maxFiles: 5,
                forceJpg: true,
            }).then(response => {
                let acceptedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "image/bmp"];
                let sizeLimit = 50000000;
                for(var i in response){
                  if(!(acceptedTypes.includes(response[i].mime))){
                    Alert.alert(I18n.t("chat_upload_title"), I18n.t("unsupported_format"));
                    return;
                  }
                }
                if (response.length == 1) {
                  if(response[0].mime.startsWith("video")){
                      if (response[0].size >= sizeLimit) {
                        Alert.alert(I18n.t("chat_upload_title"), I18n.t("chat_size_limit_exceeded"));
                      } else {
                        let path = response[0].path
                        if(Platform.OS === "ios"){
                            let arr = path.split('/')
                            const dirs = RNFetchBlob.fs.dirs
                            path = `${dirs.DocumentDir.replace("/Documents", "")}/tmp/react-native-image-crop-picker/${arr[arr.length - 1]}`
                        }
                        RNFetchBlob.fs.readFile(path, "base64").then(data =>{
                            this.sendFile({data, mime: response[0].mime}, this.state.room_id)
                        })
                      }
                  }else{
                    this.setState({ photo: response[0].data, file_type: response[0].mime});
                  }
                } else {
                    if(response.length > 5){
                      Alert.alert(I18n.t("chat_upload_title"), I18n.t("too_many_files"));
                    } else {
                        let all = response;
                        let length = response.length;
                        let videos = all.filter(item => item.mime.startsWith("video"));
                        let promises = [];
                        if(videos.length > 0) {
                            videos.map(item => {
                                if (item.size >= sizeLimit) {
                                    Alert.alert(I18n.t("chat_upload_title"), I18n.t("chat_size_limit_exceeded"));
                                    length = length -1;
                                } else {
                                    let path = item.path;
                                    if(Platform.OS === "ios"){
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
                            this.setState({ multipleFiles: true, multipleFilesLength: length  }, () => {
                                all.map(item => {
                                    if (item.data) {
                                        this.sendFile(item, this.state.room_id);
                                    }
                                });
                            });
                        });
                    }
                }
            }).catch(err => {
                if (err.code === "E_PERMISSION_MISSING") {
                    Alert.alert(I18n.t("chat_title_" + this.state.chat_type), I18n.t("chat_permission_needed"));
                }
            });
        } else {
            this.setState({ photo: "" });
        }
    }

    sendFile(file, room_id) {
      this.setState({is_sending : true})
        Api.sendMessage({
            message: "",
            file: file.data,
            mime_type: file.mime
        }, room_id).then(response => {
            switch(response.status) {
                case "success":
                    if(this.state.multipleCurrentFile == (this.state.multipleFilesLength -1)){
                      this.setState({multipleFiles: false, is_sending: false, multipleCurrentFile: 0})
                    }else{
                        this.setState({ multipleCurrentFile: this.state.multipleCurrentFile + 1 });
                    }
                    break;
                case "error":
                    break;
                default:
                    break;
            }
        })
    }

    sendMessage() {
            Api.sendMessage({
                message: this.state.message == "" ? null : this.state.message,
                file: this.state.photo,
                mime_type: this.state.file_type,
                messageMention: this.state.replyMessage ? this.state.replyMessage.id : null
            }, this.state.room_id).then(response => {
                switch (response.status) {
                    case "success":
                        this.setState({ message: "", file_type: "", photo: "", is_sending: false, replyMessage: null});
                        break;
                    case "error":
                        this.setState({ message: "", photo: "", is_sending: false});
                        Alert.alert(I18n.t("chat_title"), I18n.t(response.message))
                        break;
                    default:
                        Alert.alert(I18n.t("chat_title"), I18n.t("unknow_erro"))
                }
            })

        if (Platform.OS === 'ios') {
            this.refs.input.setNativeProps({ text: ' ' });
        }

        setTimeout(() => {
            this.refs.input.setNativeProps({ text: '' });
        });
    }

    appendMsg(msg) {
        if (msg.conversation == this.state.room_id) {
            let params = this.props.navigation.state.params;
            var events = params.content.user ? params.content.user.events : params.content.events;
            for(var i in events){
              if(events[i].id == this.state.currentEvent.id){
                events[i].unread = false;
              }
            }
            if (this.state.multipleFiles) {
                this.state.messages.push(msg);
                this.setState({ refreshList: !this.state.refreshList }, () => {
                    this.scrollEnd(()=>{}, true);
                });
                if (this.state.multipleCurrentFile == this.state.multipleFilesLength) {
                    this.setState({ multipleFiles: false, multipleFilesLength: 0, multipleCurrentFile: 0 });
                }
            } else {
                this.state.messages.push(msg);
                this.setState({ refreshList: !this.state.refreshList }, () => {
                    this.scrollEnd(()=>{}, true);
                });
            }
            Api.markConvAsRead(this.state.room_id).then(response => {
              console.log(response)
              switch (response.status) {
                case "success":
                  this.PushConfig.setBadge(response.content.unread);
                  break;
                default:

              }
            })
        }
    }

    renderChatItem({ index, item }) {
        item.media_file === null ? item.media_file = {
            id: item.id,
            content: item.message,
            createdAt: item.created_at,
            thumbnail: item.file,
            sender: item.sender,
            type: "image/jpeg",
            url: item.file
        } : null
        return <ChatItem
            onReply={()=>{if(this.state.photo.length == 0) this.setState({replyMessage: item})}}
            onImgPress={() => { this.props.navigation.navigate("ImageViewer", { content: this.state.currentUser, currentEvent: this.state.currentEvent, file: item.media_file, route: this.state.chat_type, flowContent: [item.media_file], flowIndex: 0 }) }}
            message={item}
            currentUserID={this.state.currentUser.id}
            nextMessageSenderID={this.state.messages[index - 1] ? this.state.messages[index - 1].sender.id : null}
            onTextCopied={() => this.toast.show(I18n.t("text_copied"), 3500)}
        />
    }

    formatImageUrl(imageUrl) {
        return imageUrl[0] == "/" ? AppConfig.cdnUrl + imageUrl : imageUrl;
    }

    handleRefresh() {
        if(this.state.messages.length > 0){
          this.state.message_id = this.state.messages[0].id;
          this.getMessages();
        }
    }

    render() {
        var source = "data:image/jpeg;base64," + this.state.photo;
        return (
            <View style={this.state.drawerIsOpen ? Styles.cover : Styles.container}>
                <Header
                  onGuestListPressed={()=>{this.props.navigation.navigate("ChatMembers", {room_id: this.state.room_id, currentUser: this.state.currentUser}) }}
                  onAddProvidersPressed={(this.state.chat_type === "providers" && this.state.currentEvent.role == "owner") ? ()=>{this.props.navigation.replace("ManageEvent", {content: this.state.currentUser, currentEvent: this.state.currentEvent, settingId: 1})} : undefined}
                  onMenuPressed={() => { this.setState({ drawerIsOpen: !this.state.drawerIsOpen }) }}
                  title={I18n.t("chat_title_" + this.state.chat_type)} />
                <Advert
                    adType={"popup"}
                    onClose={() => { this.setState({ advertOpen: false }) }}
                    isOpen={this.state.advertOpen}
                    screenLocation={"chat"}
                    eventType={this.state.currentEvent.kind.id}
                    countdownToShow={15}/>
                <Drawer onChangeEvent={(item) => {
                    this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
                }}
                    isOpen={this.state.drawerIsOpen} bind={this} />
                {this.state.loader && <View style={Styles.loaderOverlay}><MiitingLoader /></View>}
                    <FlatList
                        contentContainerStyle={Styles.chatContainer}
                        data={this.state.messages}
                        onScrollBeginDrag={Keyboard.dismiss}
                        renderItem={this.renderChatItem}
                        extraData={this.state.refreshList}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={this.state.is_loading}
                        removeClippedSubviews={true}
                        onRefresh={() => {
                            this.handleRefresh()
                            return <View style={Styles.chatLoader}><MiitingLoader /></View>
                        }}
                        ref={"scrollview"} style={Styles.scrollChat} />
                    {this.state.messages.length <= 0 &&
                      <View style={Styles.noMessagesContainer}>
                          <Text style={Styles.noMessagesText}>{I18n.t("no_messages")}</Text>
                      </View>
                    }
                {this.state.photo.length > 0 &&
                    <View style={Styles.choosenPicContainer}>
                        {this.state.is_sending && <MiitingLoader />}
                        <Image style={Styles.imagePrevisu} source={{ uri: this.formatImageUrl(source) }} />
                        <TouchableOpacity onPress={() => { this.setState({ photo: "" }) }}>
                            <Image style={Styles.removeChoosenPicIcon} source={Images.icons.invalid} />
                        </TouchableOpacity>
                    </View>
                }
                {this.state.replyMessage &&
                  <View style={Styles.replyMessageContainer}>
                    <View style={Styles.contentContainerMessageMention}>
                      {this.state.replyMessage.thumbnail && <Image resizeMode={"cover"} source={{uri: this.formatImageUrl(this.state.replyMessage.thumbnail)}} style={Styles.messageMentionThumb}/>}
                      <Text numberOfLines={3} style={[Styles.messageMentionText, this.state.replyMessage.thumbnail ? Styles.messageMentionTextThumb : null]}>{this.state.replyMessage.message}</Text>
                    </View>
                    <View style={Styles.messageMentionInfo}>
                      <Text style={Styles.recipientBubbleAuthorMention}>{this.state.replyMessage.sender.firstname + " " + this.state.replyMessage.sender.lastname}</Text>
                      <View style={Styles.recipientCircleSeparator}></View>
                      <Text style={Styles.recipientBubbleAuthorMention}>{moment.utc(this.state.replyMessage.created_at.date).format("DD/MM/YY HH:mm").replace(":", "h")}</Text>
                    </View>
                  </View>}
                {(this.state.is_sending && this.state.photo.length == 0) && <MiitingLoader />}
                {this.state.multipleFiles &&
                    <View style={Styles.choosenPicContainer}>
                        <Text>{`Envoi de photos ${this.state.multipleCurrentFile}/${this.state.multipleFilesLength}`}</Text>
                    </View>
                }
                <View style={Styles.userInterface}>
                    <TouchableOpacity onPress={this.handleAddPhoto} style={Styles.addImgButton}>
                        <Image source={Images.icons.pick_image} style={Styles.addImg} />
                    </TouchableOpacity>
                    <View style={Styles.userInputContainer}>
                        <AutoGrowingTextInput maxLength={1024} ref={"input"} keyboardType={"default"} onChangeText={(value) => { this.setState({ message: value }) }} underlineColorAndroid={"transparent"} placeholder={"Ecrivez votre message ici..."} style={Styles.textInput} />
                    </View>
                    <TouchableOpacity ref={"sendBtn"} style={Styles.hitSlop} disabled={(this.state.message.trim().length == 0 && this.state.photo.length == 0 || this.state.is_sending)} onPress={() => { this.setState({ is_sending: true }, () => this.sendMessage()) }}>
                        <Image source={Images.icons.send_message} resizeMode={"contain"} style={Styles.sendImg} />
                    </TouchableOpacity>
                </View>
                {Platform.OS === "ios" && <KeyboardSpacer topSpacing={-Metrics.screenHeight * 0.1}/>}
                <Toast ref={(ref) => this.toast = ref}/>
                <NavigationTab bind={this} />
            </View>
        )
    }
}

export default ChatContainer;
