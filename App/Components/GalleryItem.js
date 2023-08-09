import React, { Component, PureComponent } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./Styles/GalleryItemStyles";
import Images from "../Themes/Images";
import MiitingLoader from "../Components/MiitingLoader";
import AppConfig from "../Config/Appconfig";

class GalleryItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            is_img_loaded: false,
        }
        this.display = this.display.bind(this);
    }

    display () {
        this.setState({ is_img_loaded: true })
    }


    formatImageUrl(imageUrl){
        if(imageUrl == ""){
          return(imageUrl);
        }
        return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : imageUrl;
    }

    render () {
        return (
            <View style={Styles.item}>
                {!this.state.is_img_loaded && <View style={Styles.show}><MiitingLoader /></View>}
                <TouchableOpacity onPress={() => { this.props.navigate() }}>
                    <Image
                    onLoadEnd={() => { this.display() }}
                    source={{uri: this.formatImageUrl(this.props.src.uri)}}
                    style={this.state.is_img_loaded ? Styles.show : Styles.hide} />
                    {this.props.type.startsWith("video") &&
                      <View style={Styles.videoPlayButtonContainer}>
                        <Image source={Images.icons.play_button} style={Styles.playButton}/>
                      </View>}
                </TouchableOpacity>
            </View>
        )
    }
}

export default GalleryItem;
