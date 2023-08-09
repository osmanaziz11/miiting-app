import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Clipboard } from 'react-native';
import Styles from "./Styles/ChatItemStyles";
import Avatar from "../Components/Avatar";
import Metrics from "../Themes/Metrics";
import Images from "../Themes/Images";
import moment from "moment";
import AppConfig from '../Config/Appconfig';
import TextWithLinks from "./TextWithLinks";

class ChatItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
          replyOverlayVisible : false
        }
        this.handleCopyToClipboard = this.handleCopyToClipboard.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    formatImageUrl(imageUrl){
        if(imageUrl == ""){
          return(imageUrl);
        }
        return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
    }

    checkSmiley (str) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        if (str.match(regex) && str.length <= 2) {
            return true;
        } else {
            return false;
        }
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    handleCopyToClipboard(){
      let messagecontent = this.props.message.message;
      if(messagecontent && messagecontent.length > 0){
        console.log("copying to clipboard:", messagecontent)
        Clipboard.setString(messagecontent);
        this.props.onTextCopied();
      }
    }

    handlePress(){
      if(!this.state.replyOverlayVisible && this.props.onReply){
        this.setState({replyOverlayVisible: true});
      }else if(this.props.onReply){
        this.setState({replyOverlayVisible: false});
        this.props.onReply();
      }
    }

    render () {
        var message = this.props.message;
        message.message = message.message !== null ? message.message : "";
        var name = `${this.props.message.sender.firstname} ${this.props.message.sender.lastname}`;
        var time = moment.utc(this.props.message.created_at.date).format("DD/MM/YY HH:mm").replace(":", "h");
        return (
            message.sender.id === this.props.currentUserID ?
              <TouchableOpacity
                onLongPress={this.handleCopyToClipboard}>
                <View style={Styles.selfChatBubble}>
                    {message.messageMention && message.thumbnail == null &&
                      <View style={Styles.messageMentionContainer}>
                        <View style={Styles.contentContainerMessageMention}>
                          {message.messageMention.thumbnail && <Image resizeMode={"cover"} source={{uri: this.formatImageUrl(message.messageMention.thumbnail)}} style={Styles.messageMentionThumb}/>}
                          <Text numberOfLines={3} style={[Styles.messageMentionText, message.messageMention.thumbnail ? Styles.messageMentionTextThumb : null]}>{message.messageMention.message}</Text>
                        </View>
                        <View style={Styles.messageMentionInfo}>
                          <Text style={Styles.selfBubbleAuthorMention}>{message.messageMention.sender.firstname + " " + message.messageMention.sender.lastname}</Text>
                          <View style={Styles.selfCircleSeparator}></View>
                          <Text style={Styles.selfBubbleAuthorMention}>{moment.utc(message.messageMention.created_at.date).format("DD/MM/YY HH:mm").replace(":", "h")}</Text>
                        </View>
                      </View>}
                    {(message.thumbnail !== null && message.thumbnail.length > 0) ?
                        <TouchableOpacity onPress={this.props.onImgPress}>
                            <Image source={{uri: this.formatImageUrl(message.thumbnail)}} style={message.message.length > 0 ? Styles.selfBubbleImgWithText : Styles.selfBubbleImg} />
                            {message.media_file.type.startsWith("video") &&
                            <View style={Styles.videoPlayButtonContainer}>
                              <Image style={Styles.play_button} source={Images.icons.play_button}/>
                            </View>}
                        </TouchableOpacity>
                    : null}
                    {message.message.length > 0 ? this.checkSmiley(message.message) ? <Text style={Styles.selfBubbleSmiley}>{message.message}</Text> : <TextWithLinks linkStyle={Styles.selfLinksText} style={Styles.selfBubbleContent} content={message.message}/> : null}
                        <View style={Styles.messageInfo}>
                            <Text style={Styles.selfBubbleAuthor}>{name}</Text>
                            <View style={Styles.selfCircleSeparator}></View>
                            <Text style={Styles.selfBubbleAuthor}>{time}</Text>
                        </View>
                </View>
              </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={this.handlePress}
              onLongPress={this.handleCopyToClipboard}>
                <View style={Styles.recipientChatContainer}>
                    {message.sender.id !== this.props.nextMessageSenderID ?
                        <Avatar
                            style={Styles.avatar}
                            touchable
                            source={message.sender.picture}
                            initials={message.sender.initials}
                            height={Metrics.screenHeight * 0.045}
                            width={Metrics.screenWidth * 0.08} />
                    :
                        <View style={Styles.fakeAvatar}></View>
                    }

                    <View style={Styles.recipientChatBubble}>

                        {message.messageMention && message.thumbnail == null &&
                          <View style={Styles.recipientMessageMentionContainer}>
                            <View style={Styles.contentContainerMessageMention}>
                              {message.messageMention.thumbnail && <Image resizeMode={"cover"} source={{uri: this.formatImageUrl(message.messageMention.thumbnail)}} style={Styles.messageMentionThumb}/>}
                              <Text numberOfLines={3} style={[Styles.recipientMessageMentionText, message.messageMention.thumbnail ? Styles.messageMentionTextThumb : null]}>{message.messageMention.message}</Text>
                            </View>
                            <View style={Styles.messageMentionInfo}>
                              <Text style={Styles.recipientBubbleAuthorMention}>{message.messageMention.sender.firstname + " " + message.messageMention.sender.lastname}</Text>
                              <View style={Styles.recipientCircleSeparator}></View>
                              <Text style={Styles.recipientBubbleAuthorMention}>{moment.utc(message.messageMention.created_at.date).format("DD/MM/YY HH:mm").replace(":", "h")}</Text>
                            </View>
                          </View>}
                        {(message.thumbnail !== null && message.thumbnail.length > 0) ?
                            <TouchableOpacity onPress={this.props.onImgPress}>
                                <Image source={{uri: this.formatImageUrl(message.thumbnail)}} style={message.message.length > 0 ? Styles.selfBubbleImgWithText : Styles.selfBubbleImg} />
                            </TouchableOpacity>
                        :
                            null
                        }
                        { message.message.length > 0 ? this.checkSmiley(message.message) ? <Text style={Styles.recipientBubbleSmiley}>{message.message}</Text> : <TextWithLinks linkStyle={Styles.recipientLinksText} style={Styles.recipientBubbleContent} content={message.message}/> : null }
                        <View style={Styles.messageInfo}>
                            <Text style={Styles.recipientBubbleAuthor}>{name}</Text>
                            <View style={Styles.recipientCircleSeparator}></View>
                            <Text style={Styles.recipientBubbleAuthor}>{time}</Text>
                        </View>
                    </View>
                    {this.state.replyOverlayVisible &&
                      <View style={Styles.replyOverlay}>
                        <Image source={Images.icons["reply"]} resizeMode={"contain"} style={Styles.replyOverlayIcon}/>
                      </View>}
                </View>

              </TouchableOpacity>
        )
    }
}

export default ChatItem;
