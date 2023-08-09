import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import AppConfig from "../Config/Appconfig";
import Images from "../Themes/Images";
import Metrics from "../Themes/Metrics";
import { Avatar as ElementAvatar } from "react-native-elements";
import Styles from "./Styles/AvatarStyles";
import LinearGradient from "react-native-linear-gradient";
import Overlay from 'react-native-modal-overlay';

class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCard: false,
        };
    }

    formatImageUrl(imageUrl) {
        if (imageUrl == "") {
            return (imageUrl);
        }
        return imageUrl.startsWith("/file/get") ? AppConfig.cdnUrl + imageUrl : "data:image/jpeg;base64," + imageUrl;
    }

    render() {
        return (
            <View>
                <LinearGradient
                    colors={this.props.invertedColors ? ["#D1DCFF", "#D1DCFF"] : ["#527afe", "#7fa8fe"]}
                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                    style={[Styles.gradient, this.props.style]}>
                    <ElementAvatar
                        onPress={() => this.props.touchable ? this.setState({ showCard: true }) : null}
                        disabled={(this.props.source === null || this.props.source == "" || this.props.source === undefined)}
                        containerStyle={[Styles.container]}
                        overlayContainerStyle={Styles.overlay}
                        title={this.props.initials ? this.props.initials : null}
                        titleStyle={this.props.invertedColors ? { color: "#527afe", fontWeight: "bold" } : null}
                        rounded
                        source={(this.props.source !== null && this.props.source != "" && this.props.source !== undefined) ? { uri: this.formatImageUrl(this.props.source) } : null}
                        height={this.props.height ? this.props.height : Metrics.avatarSize}
                        width={this.props.width ? this.props.width : Metrics.avatarSize} />
                </LinearGradient>
                {(this.props.source !== null && this.props.source != "" && this.props.source !== undefined) &&
                    <Overlay visible={this.state.showCard}
                        closeOnTouchOutside
                        onClose={() => this.setState({ showCard: false })}
                        animationType="zoomIn"
                        containerStyle={{ backgroundColor: "rgba(44, 47, 66, 0.4)" }}
                        childrenWrapperStyle={Styles.cardContainer}
                        animationDuration={250}>
                        <Image source={(this.props.source !== null && this.props.source != "" && this.props.source !== undefined) ? { uri: this.formatImageUrl(this.props.source) } : null} style={Styles.cardImg}/>
                    </Overlay>
                }
            </View>
        )
    }
}

export default Avatar;
