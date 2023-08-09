import firebase from "react-native-firebase";
import { AppRegistry, AsyncStorage, Platform } from "react-native";
import { EventRegister } from "react-native-event-listeners";

// Check if device has FCM token and register it
firebase.messaging().getToken()
.then(fcmToken => {
  if (fcmToken) {
    // Store token in storage for later association with user when logged in
    AsyncStorage.setItem("@push:token", fcmToken);
  } else {
    // user doesn't have a device token yet
  }
});

firebase.messaging().hasPermission()
.then(enabled => {
  if (enabled) {
    // user has permissions
  } else {
    firebase.messaging().requestPermission()
    .then(() => {
      // User has authorised
    })
    .catch(error => {
      // User has rejected permissions
    });
  }
});

firebase.notifications().onNotification((notification) => {
  if(Platform.OS === "android"){
    const channel = new firebase.notifications.Android.Channel(
      'Miiting',
      'Miiting',
      firebase.notifications.Android.Importance.High
    )
    firebase.notifications().android.createChannel(channel);
  }
  console.log(notification)
  notification
    .android.setChannelId('Miiting')
    .setNotificationId('miiting-renewedNotification')
    .android.setPriority(firebase.notifications.Android.Priority.High)
    .android.setVisibility(firebase.notifications.Android.Visibility.Public)
    .android.setSmallIcon('ic_launcher')
    .setSound("default")
  firebase.notifications().displayNotification(notification)
});

firebase.notifications().onNotificationOpened((notificationOpen) => {
  if(notificationOpen){
    let resultNavigation = getRoutingfromNotification(notificationOpen);
    console.log(resultNavigation)
    if(resultNavigation.event_id !== null){
      AsyncStorage.setItem("@savedEvent:id", resultNavigation.event_id);
    }
    EventRegister.emit("notificationRouting", resultNavigation);
  }
});


let bgMessaging = async (message) => {
  // AsyncStorage.setItem("@temp:message", "test")
  let number = parseInt(message.data.badge);
  if(isNaN(number) || number > 1000){
    number = 0;
  }
  firebase.notifications().setBadge(number)
  return Promise.resolve();
}

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);

let getRoutingfromNotification = (notification) => {
  console.log("raw notification opened", notification);
  let notificationData = notification.notification.data;
  let resultNavigation = {
    route: null,
    id: null,
    event_id: null
  }
  switch (notificationData.type) {
    case "chat_message":
      resultNavigation = {
        route: "Chat",
        id: notificationData.conversation_id,
        event_id: notificationData.event_id,
        chat_type: notificationData.chat_type
      }
      break;
    case "room_config_available":
      resultNavigation = {
        route: "TablePlan",
        event_id: notificationData.event_id,
      }
      break;
    default:
  }
  return resultNavigation;
}


class PushConfig{
  getInitialNotification(callback){
    firebase.notifications().getInitialNotification().then(notification => {
      if(notification){
        let resultNavigation = getRoutingfromNotification(notification);
        if(resultNavigation.event_id !== null){
          AsyncStorage.setItem("@savedEvent:id", resultNavigation.event_id);
        }
        if (resultNavigation.route) {
          if(callback) callback(resultNavigation)
        }
      }
    });
  }

  setBadge(strnumber){
    let number = parseInt(strnumber);
    if(isNaN(number) || number > 1000){
      number = 0;
    }
    firebase.notifications().setBadge(number)
  }

  getBadge(callback){
    firebase.notifications().getBadge().then(callback);
  }

}

export default PushConfig;
