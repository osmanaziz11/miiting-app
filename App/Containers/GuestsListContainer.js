import React, { Component } from "react";
import { View, Text, AsyncStorage, SectionList, Dimensions, Alert, TouchableWithoutFeedback } from "react-native";
import Api from "../Config/Apiconfig";
import { I18n } from "../Lib";
import Styles from "./Styles/GuestsListStyles";
import Header from "../Components/Header";
import Metrics from "../Themes/Metrics";
import SearchBar from "../Components/SearchBar";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MiitingLoader from "../Components/MiitingLoader";
import GuestItem from "../Components/GuestItem";
import Drawer, { returnData } from "../Components/Drawer";
import Advert from "../Components/Advert";
import _ from 'lodash';

class GuestsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      data: {},
      isLoading: true,
      drawerIsOpen: false,
      index: 0,
      currentLetterIndex: 0,
      routes: [
        { key: "all", title: I18n.t("all") },
        { key: "attending", title: I18n.t("attending") },
        { key: "notattending", title: I18n.t("not_attending") },
      ],
      currentEvent: null,
      currentUser: null,
      search_results: [],
      query: "",
      advertOpen: true,
    }

    this.renderTabBar = this.renderTabBar.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderUserItem = this.renderUserItem.bind(this);
    this.populateList = this.populateList.bind(this);
    this.navigation = this.props.navigation;
    this.renderTitle = this.renderTitle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderSections = this.renderSections.bind(this);
    this.removeById = this.removeById.bind(this);
    this.renderAlphabetList = this.renderAlphabetList.bind(this);
    this.handleScrollToItem = this.handleScrollToItem.bind(this);
    this.sectionRefs = [];
    this.goToQrCode = this.goToQrCode.bind(this);
  }

  componentWillMount () {
    var currentUser = this.props.navigation.getParam("content", {});
    var currentEvent = this.props.navigation.getParam("currentEvent", {});
    this.state.currentUser = currentUser;
    this.state.currentEvent = currentEvent;
  }

  componentDidMount() {
    this.populateList(this.state.currentEvent.id);
  }

  renderTabBar(props) {
    return (<View>
      <TabBar
        {...props}
        style={{ backgroundColor: "transparent" }}
        getLabelText={({ route }) => this.renderTitle(route)}
        labelStyle={Styles.labelStyle}
        indicatorStyle={Styles.indicator}
      />
        <SearchBar onChange={this.handleSearch} value={this.state.query} onClearButtonPressed={() => this.setState({ query: "" })}/>
    </View>)
  }

  handleSearch(val) {
    this.state.search_results = this.state.dataSource.filter(item => item.firstname.includes(val));
    this.setState({ query: val });
  }

  renderTitle(route) {
    if (route.key == "attending") {
      return `${route.title} (${this.getGuestsCount(this.state.dataSource.filter(e => e.is_coming))})`;
    } else if (route.key == "notattending") {
      return `${route.title} (${this.getGuestsCount(this.state.dataSource.filter(e => !e.is_coming))})`;
    }
    return `${route.title} (${this.getGuestsCount(this.state.dataSource)})`;
  }

  getGuestsCount(dataSource){
    let count = 0;
    for(var guest of dataSource){
      count ++;
      count += guest.companions.length;
    }
    return count;
  }

  populateList(id){
    this.setState({ is_loading: true })
    Api.getEventGuestsList(id).then(response => {
      switch (response.status) {
        case "success":
            let data = [];
            for (var i in response.content) {
              if (response.content[i].length != 0) {
                for (var j in response.content[i]) {
                  data.push(response.content[i][j]);
                }
              } else {
                delete response.content[i];
              }
            }
            let currentEvent = this.state.currentEvent;
            currentEvent.nbGuests = this.getGuestsCount(data.filter(e => e.is_coming));
          this.setState({ isLoading: false, dataSource: data, data: response.content, currentEvent});

          break;
        case "error":
          Alert.alert(I18n.t("guestslist_title"), I18n.t(response.message));
          break;
        default:
          Alert.alert(I18n.t("guestslist_title"), I18n.t("unknown_error"));
      }
    })
  }

  renderList(isAttending) {
    if (this.state.dataSource.length <= 0) return (<Text style={Styles.emptyText}>{I18n.t("no_guests")}</Text>);
    const sections = this.renderSections(isAttending);
    if (this.state.query.length > 0) {
        return (
          <View>
            {this.state.search_results.length > 0 &&
              <SectionList
                removeClippedSubviews={true}
                contentContainerStyle={Styles.listContainer}
                renderItem={this.renderUserItem}
                keyExtractor={(item, index) => item + index}
                sections={[{title: "Tous", data: this.state.search_results}]}/>
            }
            {this.state.search_results.length == 0 &&
              <View style={Styles.emptyResults}>
                <Text style={Styles.emptyResultsText}>{I18n.t("empty_results")}</Text>
              </View>
            }
        </View>
        )
    }
    return (
      <View>
        <View style={Styles.sectionAlphabet}>
          {this.renderAlphabetList(sections, isAttending)}
        </View>
        <SectionList
					maxToRenderPerBatch={30}
					initialNumToRender={30}
          removeClippedSubviews={true}
          contentContainerStyle={Styles.listContainer}
          renderItem={this.renderUserItem}
          keyExtractor={(item, index) => item.user_id + index}
          renderSectionHeader={this.renderSectionHeader}
          sections={sections}
          ref={(list) => { this.sectionRefs.push({
            isAttending,
            list
          }); }}/>
      </View>
    )
  }

  handleScrollToItem(section, isAttending) {
    let itemIndex = 0;
    let sectionIndex = section.sectionId;
    for (var i in this.sectionRefs) {
      if (isAttending == this.sectionRefs[i].isAttending) {
        if (this._wrapperListRef === null) return;
        if (this.sectionRefs[i].list === null) return;
        if (this.sectionRefs[i].list._wrapperListRef === null) return;
        this.sectionRefs[i].list.scrollToLocation({animated: true, sectionIndex, itemIndex, viewPosition: 0.05});
      }
    }
  }

  renderAlphabetList(sections) {
    return sections.map((item, index) =>
      <TouchableWithoutFeedback key={index} onPress={() => this.handleScrollToItem(sections[index])}>
        <View>
          <Text style={[Styles.sectionAlphabetTitle, this.state.currentLetterIndex == index ? Styles.currentSectionAlphabetTitle : null]}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderSectionHeader({ section }) {
    return (
      <View style={Styles.sectionHeader}>
        <Text style={Styles.sectionHeaderTitle}>{section.title}</Text>
      </View>
    )
  }

  renderSections(isAttending) {
      let data = this.state.data;
      let sections = [];
      let opn = Object.keys(data);
      for (var i in opn) {
        let letter = opn[i];
        let dataLetter = data[letter];
        if (dataLetter.length != 0) {
          if (isAttending == true) {
            dataLetter = dataLetter.filter(item => item.is_coming);
          } else if (isAttending == false) {
            dataLetter = dataLetter.filter(item => !item.is_coming);
          }
          if (dataLetter.length != 0) {
            sections.push({title: letter, data: dataLetter, sectionId: i});
          }
        }
      }
      return sections;
  }

  renderUserItem({ item, index, section }) {
    return (
      <GuestItem userID={this.state.currentUser.id} guest={item} onDeleteGuest={() => {
        this.state.currentEvent.nbGuests -= 1;
        this.state.dataSource.splice(index, 1);
        let data = this.removeById(item.user_id);
        this.setState({ data });
      }} event={this.state.currentEvent} onUpdateGuest={()=>{this.setState({data: this.state.data})}} key={index} />
    )
  }

  removeById(id) {
    let data = this.state.data;
    for (var i in data) {
      let section = data[i];
      for (var j in section) {
        if (section[j].user_id == id) {
          section.splice(j, 1);
        }
      }
    }
    return data;
  }

  goToQrCode() {
    if (this.state.currentEvent.role == "owner") {
      this.props.navigation.replace("ManageEvent", {content: this.state.currentUser, currentEvent: this.state.currentEvent, settingId: 3});
    }
  }

  render() {
    return (
      <View style={Styles.container}>
          <Header
            onMenuPressed={() => {this.setState({drawerIsOpen: true})}}
            onAddGuestPressed={this.state.currentEvent.role == "owner" ? () => this.props.navigation.replace("ManageEvent", {content: this.state.currentUser, currentEvent: this.state.currentEvent, settingId: 3}) : null}
            title={I18n.t("guestslist_title")} />
          <Advert
            adType={"popup"}
            onClose={() => { this.setState({ advertOpen: false }) }}
            isOpen={this.state.advertOpen}
            screenLocation={"guests"}
            eventType={this.state.currentEvent.kind.id}
            countdownToShow={15}/>
          <Drawer onChangeEvent={(item) => { this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", {}), currentEvent: item }) }} bind={this} isOpen={this.state.drawerIsOpen}/>
          {!this.state.isLoading &&
            <View
              style={Styles.contentContainer}>
              <TabView
                navigationState={this.state}
                renderTabBar={this.renderTabBar}
                removeClippedSubviews={true}
                renderScene={SceneMap({
                  "all": () => { return this.renderList(null) },
                  "attending": () => { return this.renderList(true) },
                  "notattending": () => { return this.renderList(false) }
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
            </View>
          }
          {this.state.isLoading && <MiitingLoader />}
      </View>
    )
  }
}

export default GuestsListContainer;
