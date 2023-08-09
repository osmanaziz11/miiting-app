import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Images from "../Themes/Images.js";
import Styles from "./Styles/HeaderStyles";
import PropTypes from "prop-types";

class Header extends Component {
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <View style={[Styles.header, this.props.containerStyle]}>
                {this.props.onBackPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onBackPressed}
                        style={Styles.icon}>
                        <Image source={Images.icons.back} style={Styles.icon_img} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                {this.props.onMenuPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                        onPress={this.props.onMenuPressed}
                        style={Styles.icon}>
                        <Image source={Images.icons.menu} style={Styles.icon_img} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                {this.props.onWhiteMenuPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onWhiteMenuPressed}
                        style={Styles.icon}>
                        <Image source={Images.icons.menu_white} style={Styles.icon_img} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                <Text numberOfLines={1} style={this.props.whiteTheme ? Styles.header_title_white : Styles.header_title}>{this.props.title}</Text>
                {this.props.onAddPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onAddPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.add_black} style={[Styles.icon_img, Styles.icon_add]} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                {this.props.onFilterPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onFilterPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.filters} style={Styles.icon_img} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                {this.props.onCrossPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onCrossPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.close} style={Styles.icon_img} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                {this.props.onLogoutPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onLogoutPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.logout_icon} style={Styles.icon_img} resizeMode={"contain"}/>
                    </TouchableOpacity>
                }
                {this.props.onAddGuestPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onAddGuestPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.add_guest} style={Styles.icon_img} />
                    </TouchableOpacity>
                }
                {this.props.onAddProvidersPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onAddProvidersPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.add_guest} style={Styles.icon_img} />
                    </TouchableOpacity>
                }
                {this.props.onGuestListPressed &&
                    <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                        onPress={this.props.onGuestListPressed}
                        style={Styles.icon_right}>
                        <Image source={Images.icons.guest} style={Styles.icon_img} />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
