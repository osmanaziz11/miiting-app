import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Api from "../Config/Apiconfig";
import { I18n } from "../Lib";
import Styles from "./Styles/TablePlanStyles";
import Images from "../Themes/Images";
import Header from "../Components/Header";
import Advert from "../Components/Advert";
import MiitingLoader from "../Components/MiitingLoader";
import Drawer from "../Components/Drawer";
import ThumbTable from "../Components/ThumbTable";
import DetailsTable from "../Components/DetailsTable";
import AppConfig from "../Config/Appconfig";

class TablePlanContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			isLoading: true,
			drawerIsOpen: false,
			advertOpen: true,
			scenePosition: null,
			tableDetailsId: null
		}
	}

	componentWillMount() {
		var currentUser = this.props.navigation.getParam("content", {});
		var currentEvent = this.props.navigation.getParam("currentEvent", {});
		this.state.currentUser = currentUser;
		this.state.currentEvent = currentEvent;
	}

	componentDidMount() {
		Api.getTablePlan(this.state.currentEvent.id).then(response => {
			switch (response.status) {
				case "success":
					this.setState({
						isLoading: false,
						dataSource: response.content.tables,
						scenePosition: response.content.scenePosition,
						isTablePlanEmpty: (response.content.tables.length == 0 && response.content.scenePosition == "none") 
					});
					break;
				case "error":
					Alert.alert(I18n.t("tableplan_title"), I18n.t(response.message));
					break;
				default:
					Alert.alert(I18n.t("tableplan_title"), I18n.t("unknown_error"));
			}
		})

	}

	render() {
		let tablethumbs = this.state.dataSource.map((table, key) =>
			<ThumbTable
				onPress={tableId => { this.setState({ tableDetailsId: key }) }}
				table={table}
				isOwnTable={table.guests.filter(guest => guest.id == this.props.navigation.state.params.content.id).length != 0}
				ownUser={this.props.navigation.state.params.content}
				key={key} />
		)
		let scenePositionStyle = null;
		let sceneTextStyle = null;

		switch (this.state.scenePosition) {
			case "top":
				scenePositionStyle = Styles.scenePositionTop;
				break;
			case "left":
				scenePositionStyle = Styles.scenePositionLeft;
				sceneTextStyle = Styles.sceneTextLeft;
				break;
			case "right":
				scenePositionStyle = Styles.scenePositionRight;
				sceneTextStyle = Styles.sceneTextLeft;
				break;
			case "center":
				scenePositionStyle = Styles.scenePositionCenter;
				break;
			case "bottom": 
				scenePositionStyle = Styles.scenePositionBottom;
				break;
			case "none":
				scenePositionStyle = Styles.scenePositionNone;
				break;
			default:

		}

		return (
			<View style={Styles.container}>
				<Header
					onMenuPressed={() => { this.setState({ drawerIsOpen: true }) }}
					onDisconnectPressed={this.handleLogout}
					title={I18n.t("tableplan_title")} />
				<Drawer onChangeEvent={(item) => {
					this.props.navigation.replace("Dashboard", { content: this.props.navigation.getParam("content", {}), currentEvent: item })
				}}
					isOpen={this.state.drawerIsOpen} bind={this} />
				<Advert
					adType={"popup"}
					onClose={() => { this.setState({ advertOpen: false }) }}
					isOpen={this.state.advertOpen}
					screenLocation={"tableplan"}
					eventType={this.state.currentEvent.kind.id} />
				<View
					style={Styles.contentContainer}>
					{(this.state.isTablePlanEmpty && this.state.currentEvent.role == "owner") &&
						<Text style={Styles.emptyInstructions}>{I18n.t("empty_table_plan_instructions_start") + AppConfig.cdnUrl + I18n.t("empty_table_plan_instructions_end")}</Text>
					}
					{this.state.isLoading && <MiitingLoader />}
					<Image source={Images.tableplan_grid} style={Styles.backgroundImage} />
					{(this.state.dataSource.length > 0 && this.state.tableDetailsId != null) &&
						<TouchableOpacity
							style={Styles.backButtonContainer}
							onPress={() => { this.setState({ tableDetailsId: null }) }}>
							<Image source={Images.icons.back_arrow} style={Styles.backButtonIcon} />
							<Text style={Styles.backButtonText}>{I18n.t("back").toUpperCase()}</Text>
						</TouchableOpacity>}

					{this.state.tableDetailsId == null &&
						<View style={Styles.tableThumbsContainer}>{tablethumbs}</View>}
					{this.state.tableDetailsId == null && this.state.scenePosition !== null && <View style={[Styles.sceneContainer, scenePositionStyle]}>
						<Text style={[Styles.sceneText, sceneTextStyle]}>{I18n.t("tableplan_scene").toUpperCase()}</Text>
					</View>}

					{this.state.tableDetailsId != null &&
						<DetailsTable table={this.state.dataSource[this.state.tableDetailsId]} ownUser={this.props.navigation.state.params.content} />}
				</View>
			</View>
		)
	}
}

export default TablePlanContainer;
