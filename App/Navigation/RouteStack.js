import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import { I18n } from "../Lib";
import LaunchContainer from "../Containers/LaunchContainer";
import CreateEventContainer from "../Containers/CreateEventContainer";
import RegisterContainer from "../Containers/RegisterContainer";
import LoginContainer from "../Containers/LoginContainer";
import JoinEventContainer from "../Containers/JoinEventContainer";
import JoinInvitationContainer from "../Containers/JoinInvitationContainer";
import EventSuccessContainer from "../Containers/EventSuccessContainer";
import GuestsListContainer from "../Containers/GuestsListContainer";
import ChatContainer from "../Containers/ChatContainer";
import TablePlanContainer from "../Containers/TablePlanContainer";
import ImageViewerContainer from "../Containers/ImageViewerContainer";
import MediaFlowContainer from "../Containers/MediaFlowContainer";
import PotContainer from "../Containers/PotContainer";
import PotContributionContainer from "../Containers/PotContributionContainer";
import ManageEventContainer from "../Containers/ManageEventContainer";
import EditUserContainer from "../Containers/EditUserContainer";
import AddProvidersContainer from "../Containers/AddProvidersContainer";
import PickRestaurantContainer from "../Containers/PickRestaurantContainer";
import DashboardContainer from "../Containers/DashboardContainer";
import ForgottenPasswordContainer from "../Containers/ForgottenPasswordContainer";
import JoiningInfoContainer from "../Containers/JoiningInfoContainer";
import NoEventContainer from "../Containers/NoEventContainer";
import SelectEventContainer from "../Containers/SelectEventContainer";
import AddBankInfo from "../Containers/AddBankInfoContainer";
import ProviderContainer from "../Containers/ProviderContainer";
import ProviderListContainer from "../Containers/ProviderListContainer";
import ProviderDetailContainer from "../Containers/ProviderDetailContainer";
import ChatMembersContainer from "../Containers/ChatMembersContainer";
import ChatPrivateContainer from "../Containers/ChatPrivateContainer";
import ProviderContactContainer from "../Containers/ProviderContactContainer";


export default createStackNavigator({
  Launch: {
    screen: LaunchContainer,
  },
  CreateEvent: {
    screen: CreateEventContainer,
  },
  Register: {
    screen: RegisterContainer,
  },
  Login: {
    screen: LoginContainer,
  },
  JoinEvent: {
    screen: JoinEventContainer,
  },
  JoinInvitation: {
    screen: JoinInvitationContainer,
  },
  EventSuccess: {
    screen: EventSuccessContainer,
  },
  GuestsList: {
    screen: GuestsListContainer,
  },
  ChatGuests: {
    screen: ChatContainer,
  },
  ChatProviders: {
    screen: ChatContainer,
  },
  ChatSingle: {
    screen: ChatContainer,
  },
  Chat: {
    screen: ChatContainer,
  },
  TablePlan: {
    screen: TablePlanContainer,
  },
  ImageViewer: {
    screen: ImageViewerContainer,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  MediaFlow: {
    screen: MediaFlowContainer,
  },
  Pot: {
    screen: PotContainer,
  },
  PotContribution: {
    screen: PotContributionContainer,
  },
  ManageEvent: {
    screen: ManageEventContainer,
  },
  EditUser: {
    screen: EditUserContainer,
  },
  AddProviders: {
    screen: AddProvidersContainer,
  },
  PickRestaurant: {
    screen: PickRestaurantContainer,
  },
  Dashboard: {
    screen: DashboardContainer,
  },
  ForgottenPassword: {
    screen: ForgottenPasswordContainer,
  },
  JoiningInfo: {
    screen: JoiningInfoContainer,
  },
  NoEvent: {
    screen: NoEventContainer,
  },
  SelectEvent: {
    screen: SelectEventContainer,
  },
  AddBankInfo: {
    screen: AddBankInfo,
  },
  Provider: {
    screen: ProviderContainer,
  },
  ProviderList: {
    screen: ProviderListContainer,
  },
  ProviderDetail: {
    screen: ProviderDetailContainer,
  },
  ChatMembers: {
    screen: ChatMembersContainer,
  },
  ChatPrivate: {
    screen: ChatPrivateContainer,
  },
  ProviderContact: {
    screen: ProviderContactContainer,
  },
},
{
  initialRouteName: "Launch",
  navigationOptions: {
    header: null,
    loginlink: null,
  },
});
