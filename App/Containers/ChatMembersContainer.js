import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Platform, FlatList, Alert, Keyboard, Linking } from "react-native";
import Header from "../Components/Header";
import Styles from "../Containers/Styles/ChatMembersStyles";
import { I18n } from "../Lib";
import Images from "../Themes/Images";
import AppConfig from "../Config/Appconfig";
import Metrics from "../Themes/Metrics";
import Api from "../Config/Apiconfig";
import MiitingLoader from "../Components/MiitingLoader";
import NavigationTab from "../Components/NavigationTab";
import GuestItem from "../Components/GuestItem";

class ChatMembersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: []
    }

    this.renderUserItem = this.renderUserItem.bind(this);
    this.promptPrivate = this.promptPrivate.bind(this);
  }

  componentDidMount(){
    let room_id = this.props.navigation.getParam("room_id", null);
    Api.getMembersByConversation(room_id).then(response => {
      this.setState({isLoading: false, users: response.content});
    });
  }

  promptPrivate(user){
    let currentUser = this.props.navigation.state.params.currentUser;
    if(currentUser && currentUser.single && currentUser.id !== user.id){
      Alert.alert(
        I18n.t("prompt_private_title"),
        I18n.t("prompt_private_content").replace("%NAME%", user.firstname),
        [
          {text: I18n.t("prompt_private_cancel"), onPress: ()=>{}, style: "cancel"},
          {text: I18n.t("prompt_private_confirm"), onPress: ()=>{this.getPrivateRoom(user)}, style: "OK"}
        ]
      );
    }
  }

  getPrivateRoom(user){
    Api.getPrivateConversation([user.id]).then(response => {
      if(response.status === "success"){
        let conversation = response.conversation;
        this.props.navigation.navigate("ChatPrivate", {room_id: conversation.id, chat_type: conversation.type, members: [user]});
      }else{
        I18n.t("prompt_private_title", I18n.t(response.message));
      }
    });
  }

  renderUserItem({item}){
    return(
      <GuestItem
        onPress={this.promptPrivate}
        chat={true}
        guest={item}/>
    );
  }

  render() {
    return (
      <View style={Styles.container}>
      <Header
        onBackPressed={()=>{this.props.navigation.goBack()}}
        title={I18n.t("chat_members_title")} />
        {this.state.isLoading && <MiitingLoader />}
      {this.state.users.length > 0 && <FlatList
        style={Styles.flatlist}
        contentContainerStyle={Styles.contentContainer}
        renderItem={this.renderUserItem}
        keyExtractor={item => item.id}
        data={this.state.users}/>}
      </View>
    )
  }
}

export default ChatMembersContainer;
