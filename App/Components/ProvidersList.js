import React, { Component } from "react";
import { View, Text, AsyncStorage, SectionList, Dimensions, Alert } from "react-native";
import Api from "../Config/Apiconfig";
import { I18n } from "../Lib";
import Styles from "./Styles/ProvidersListStyles";
import Header from "../Components/Header";
import Metrics from "../Themes/Metrics";
import SearchBar from "../Components/SearchBar";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MiitingLoader from "./MiitingLoader";
import ProviderItem from "./ProviderItem";
import Drawer, { returnData } from "../Components/Drawer";
import _ from 'lodash';

class ProvidersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pendingDataSource: [],
      isLoading: true,
      drawerIsOpen: false,
      index: 0,
      routes: [
        { key: "all", title: I18n.t("all") },
        { key: "attending", title: I18n.t("attending") },
        { key: "notattending", title: I18n.t("not_attending") },
      ],
      currentEvent: null,
      currentUser: null,
      search_results: [],
      query: "",
    }

    this.renderTabBar = this.renderTabBar.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderUserItem = this.renderUserItem.bind(this);
    this.populateList = this.populateList.bind(this);
    this.navigation = this.props.navigation;
    this.handleSearch = this.handleSearch.bind(this);

  }

  componentWillMount() {
    this.state.currentEvent = this.props.event;
  }

  componentDidMount() {
    this.populateList(this.state.currentEvent.id);
    this.onWillFocusListener = this.props.bind.props.navigation.addListener("willFocus", ()=> {this.populateList(this.state.currentEvent.id)});
  }

  componentWillUnmount(){
    this.onWillFocusListener.remove()
  }

  renderTabBar(props) {
    return (<View>
      <TabBar
        {...props}
        style={{ backgroundColor: "transparent" }}
        getLabelText={({ route }) => route.title}
        labelStyle={Styles.labelStyle}
        indicatorStyle={Styles.indicator}
      />
    </View>)
  }

  handleSearch(val) {
    this.state.search_results = this.state.dataSource.filter(item => item.firstname.includes(val));
    this.setState({ query: val });
  }

  eraseProvider(index, provider_id) {
    Api.removeProvider(this.props.event.id, provider_id)
      .then(response => {
        switch (response.status) {
          case "success":
            Alert.alert(I18n.t("erase"), I18n.t("erase_provider_success"));
            dataSource = this.state.dataSource;
            dataSource.splice(index, 1);
            this.setState({ dataSource });
            break;
          case "error":
            break;
          default:
            break;
        }
      })
  }

  populateList(id) {
    Api.getEventProvidersList(id).then(response => {
      this.setState({ is_loading: true })
      switch (response.status) {
        case "success":
          this.setState({ isLoading: false, dataSource: response.content });
          break;
        case "error":
          Alert.alert(I18n.t("guestslist_title"), I18n.t(response.message));
          break;
        default:
          Alert.alert(I18n.t("guestslist_title"), I18n.t("unknown_error"));
      }
    })
    Api.getPendingProviders(id).then(response => {
      switch (response.status) {
        case "success":
          this.setState({ pendingDataSource: response.content });
          break;
        case "error":
          Alert.alert(I18n.t("guestslist_title"), I18n.t(response.message));
          break;
        default:
          Alert.alert(I18n.t("guestslist_title"), I18n.t("unknown_error"));
      }
    });
  }

  renderList(isAttending) {
    if (this.state.dataSource.length <= 0 && this.state.pendingDataSource.length <= 0) return (<Text style={Styles.emptyText}>{I18n.t("no_providers")}</Text>);
    data = this.state.dataSource;
    pendingData = this.state.pendingDataSource;
    if(this.state.query.length > 0){
      data = data.filter(provider => provider.name.toLowerCase().replace(" ", "").includes(this.state.query.toLowerCase().replace(" ", "")))
      pendingData = pendingData.filter(provider => provider.name.toLowerCase().replace(" ", "").includes(this.state.query.toLowerCase().replace(" ", "")))
    }
    if(data.length <= 0 && pendingData.length <= 0){
      return (<Text style={Styles.emptyText}>{I18n.t("no_providers")}</Text>);
    }
    return (
      <SectionList
        contentContainerStyle={Styles.listContainer}
        renderItem={this.renderUserItem}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title, data } }) => {
          if(data.length > 0) return <Text style={Styles.sectionHeader}>{title}</Text>
        }}
        sections={[
          { title: "Présents dans l'événement", data, canDelete: true},
          { title: "En attente", data: pendingData, canDelete: false}
        ]} />
    )
  }

  renderUserItem({ item, index, section }) {
    return (
      <ProviderItem provider={item} onErase={section.canDelete ? () => { this.eraseProvider(index, item.id) } : undefined} event={this.state.currentEvent} key={index} />
    )
  }

  render() {
    return (
      <View style={Styles.container}>
        {!this.state.isLoading &&
          <View
            style={Styles.contentContainer}>
            <View style={Styles.searchContainer}>
              <SearchBar onChange={this.handleSearch} value={this.state.query} onClearButtonPressed={() => this.setState({ query: "" })}/>
            </View>
            {this.renderList(null)}
          </View>
        }
        {this.state.isLoading && <MiitingLoader />}
      </View>
    )
  }
}

export default ProvidersListContainer;
