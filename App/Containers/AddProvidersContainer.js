import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Alert, ScrollView } from "react-native";
import Styles from "./Styles/AddProvidersStyles";
import Images from "../Themes/Images";
import { I18n } from "../Lib";
import Api from "../Config/Apiconfig";
import Header from "../Components/Header";
import LinearGradient from "react-native-linear-gradient";
import Invitation from "../Components/Invitation";

class AddProvidersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            providers: [],
            refreshList: false,
            disabled: false,
        };
        this.renderInvitation = this.renderInvitation.bind(this);
        this.handleAddProviders = this.handleAddProviders.bind(this);
        this.addProviders = this.addProviders.bind(this);
    }

    componentWillMount() {
        this.state.currentEvent = this.props.navigation.getParam("currentEvent", {});
        this.state.currentUser = this.props.navigation.getParam("content", {});

    }

    componentDidMount() {
        Api.getProvidersKinds()
            .then(response => {
                switch (response.status) {
                    case "success":
                        this.setState({ providers_kinds: response.content });
                        break;
                    case "error":
                        break;
                    default:
                        break;
                }
            })
    }

    addProviders() {
        this.setState({ refreshList: !this.state.refreshList });
        this.state.providers.push({
            firstName: "",
            lastName: "",
            email: "",
            function: this.state.providers_kinds[0].id,
            function_name: this.state.providers_kinds[0].name,
        });
    }

    removeProvider(key) {
        this.setState({ refreshList: !this.state.refreshList });
        this.state.providers.splice(key, 1);
    }

    renderInvitation({ item, index }) {
        return <Invitation
            onCrossPressed={() => { this.removeProvider(index) }}
            invit_key={index}
            guest={item}
            provider
            key={index}
            onChange={(value) => { this.state.providers[index] = value, this.setState({ refreshList: !this.state.refreshList }) }} />
    }


    handleAddProviders() {
        var providers = [];
        for (var i in this.state.providers) {
            providers.push({
                firstName: this.state.providers[i].firstname,
                lastName: this.state.providers[i].lastname,
                email: this.state.providers[i].email,
                function: this.state.providers[i].function || 1,
            })
        }
        Api.inviteProviders({
            providers
        }, this.state.currentEvent.id)
            .then(response => {
                switch (response.status) {
                    case "success":
                        console.log("Provider added", response);
                        this.props.navigation.goBack();
                        Alert.alert(I18n.t("add_providers"), I18n.t("providers_added"));
                        break;
                    case "error":
                        console.log(response.message)
                        break;
                    default:
                        Alert.alert(I18n.t("login_title"), I18n.t("unknown_error"));
                }
            })
    }

    render() {
        return (
            <View style={Styles.container}>
                <Header
                    title={I18n.t("add_providers")}
                    onBackPressed={() => { this.props.navigation.goBack() }}
                />
                <ScrollView contentContainerStyle={Styles.scrollView}>
                    <View style={Styles.invitationsContainer}>
                        <FlatList
                            data={this.state.providers}
                            renderItem={this.renderInvitation}
                            extraData={this.state.refreshList}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={Styles.invitationsList} />
                        <TouchableOpacity
                            onPress={this.addProviders}
                            style={Styles.addProviderButton}>
                            <Image source={Images.icons.plus_icon} style={Styles.addProviderImg} />
                        </TouchableOpacity>
                        <Text style={Styles.addProviderText}>{I18n.t("add_providers")}</Text>
                    </View>

                    <TouchableOpacity
                        ref={"buttonSubmit"}
                        onPress={() => {
                            this.handleAddProviders()
                        }}
                        disabled={this.state.disabled}>
                        <LinearGradient
                            colors={["#527afe", "#7fa8fe"]}
                            start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                            style={Styles.buttonSubmit}>
                            <Text style={Styles.buttonText}>{I18n.t("save_changes")}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default AddProvidersContainer;