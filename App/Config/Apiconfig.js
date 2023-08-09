import AppConfig from "./Appconfig";
import { Platform } from "react-native";

const apiUrl = AppConfig.apiUrl;
const credentials = "include";

const defaultHeaders = {
  'X-App-Version': AppConfig.name + "/" + AppConfig.version + "-" + Platform.OS,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export default {
  userRegister (user) {
    user.email = user.email != undefined ? user.email : null;
    user.password = user.password != undefined ? user.password : null;
    user.phone = user.phone != undefined ? user.phone : null;
    user.lastname = user.lastname != undefined ? user.lastname : null;
    user.firstname = user.firstname != undefined ? user.firstname : null;
    return fetch(apiUrl + "/register", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(user),
      credentials
    }).then(response => response.json());
  },

  userLogin (user) {
    user.email = user.email != undefined ? user.email : null;
    user.password = user.password != undefined ? user.password : null;
    return fetch(apiUrl + "/login", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(user),
      credentials
    }).then(response => response.json());
  },

  userLogout () {
    return fetch(apiUrl + "/logout", {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  userForgotPassword(email) {
    return fetch(apiUrl + "/forgot_password", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({email}),
      credentials
    }).then(response => response.json());
  },

  tokenAdd(token){
    return fetch(apiUrl + "/client/token/add", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({token, device: Platform.OS}),
      credentials
    }).then(response => response.json());
  },

  tokenRemove(token){
    return fetch(apiUrl + "/client/token/remove", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({token, device: Platform.OS}),
      credentials
    }).then(response => response.json());
  },

  getEventKinds () {
    return fetch(apiUrl + "/event_kind/list", {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  createEvent (event) {
    event.name = event.name != undefined ? event.name : null;
    event.kind = event.kind != undefined ? event.kind : null;
    event.date = event.date != undefined ? event.date : null;
    event.time = event.time != undefined ? event.time : null;
    event.photo = event.photo != undefined ? event.photo : null;
    event.address != undefined ? event.address : null;
    return fetch(apiUrl + "/event/create", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(event),
      credentials
    }).then(response => response.json())
  },

  getEventGuestsList(event_id){
    return fetch(apiUrl + "/event/list/user_client/" + event_id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  getEventProvidersList(event_id){
    return fetch(apiUrl + "/event/list/provider/" + event_id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  addUserInEvent (code) {
    return fetch(apiUrl + "/event/add/user_client", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(code),
      credentials
    }).then(response => response.json())
  },

  getEventJoiningDetails(qrcode){
    return fetch(apiUrl + "/event/details/qrcode/" + qrcode, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  addCompanions (companions, id) {
    return fetch(apiUrl + "/event/add/companion/" + id, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(companions),
      credentials
    }).then(response => response.json());
  },

  sendMessage (content, room_id) {
    content.message = content.message != undefined ? content.message : null;
    content.file = content.file != undefined ? content.file : null;
    content.mime_type = content.mime_type != undefined ? content.mime_type : null;
    return fetch(apiUrl + "/chat/send/message/" + room_id, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(content),
      credentials
    }).then(response => response.json())
  },

  getMessages (room_id, message_id) {
    room_id = room_id != undefined ? room_id : null;
    return fetch(apiUrl + "/chat/get/messages/" + room_id + (message_id !== null ? "/" + message_id : ""), {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  getMediaFeed(event_id, file_id) {
    return fetch(apiUrl + "/event/media_feed/list/" + event_id + (file_id != null? `/${file_id}` : ""), {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  getTablePlan (event_id){
    return fetch(apiUrl + `/event/room/configuration/${event_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  pot: {
    getDetails (event_id) {
      event_id = event_id !== undefined ? event_id : null;
      return fetch(apiUrl + `/pot/${event_id}`, {
        method: "GET",
        headers: defaultHeaders,
        credentials
      }).then(response => response.json())
    },

    participate (data) {
      data.msg = data.msg !== undefined ? data.msg : null;
      data.amount = data.amount !== undefined ? data.amount : null;
      data.token = data.token !== undefined ? data.token : null;
      data.id = data.id !== undefined ? data.id : null;
      return fetch(apiUrl + `/pot/participation`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
        credentials
      }).then(response => response.json())
    },

    update (description, event_id) {
      description = description !== undefined ? description : null;
      event_id = event_id !== undefined ? event_id : null;
      return fetch(apiUrl + `/pot/update/${event_id}`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(description),
        credentials
      }).then(response => response.json())
    },

    addBankInfo(data) {
      data.iban = data.iban !== undefined ? data.iban : null;
      return fetch(apiUrl + "/pot/checkout", {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
        credentials
      }).then(response => response.json());
    },
  },

  editEvent(event, event_id) {
    event.name = event.name !== undefined ? event.name : null;
    event.kind = event.kind !== undefined ? event.kind : null;
    event.date = event.date !== undefined ? event.date : null;
    event.time = event.time !== undefined ? event.time : null;
    event.address = event.address !== undefined ? event.address : null;
    event.photo !== null ? event.photo.startsWith("/file/get") ? delete event.photo : event.photo : event.photo;
    return fetch(apiUrl + `/event/edit/${event_id}`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(event),
      credentials
    }).then(response => response.json())
  },

  deleteFile(event_id, file_id) {
    event_id = event_id !== undefined ? event_id : null;
    file_id = file_id !== undefined ? file_id : null;
    return fetch(apiUrl + `/event/media_feed/delete/${event_id}/${file_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  getProvidersKinds() {
    return fetch(apiUrl + "/event/list/clientfunctions", {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  inviteProviders(providers, event_id) {
    event_id = event_id !== undefined ? event_id : null;
    return fetch(apiUrl + `/event/invite/provider/${event_id}`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(providers),
      credentials
    }).then(response => response.json())
  },

  editUser(user) {
    user.firstname = user.firstname !== undefined ? user.firstname : null;
    user.lastname = user.lastname !== undefined ? user.lastname : null;
    user.password = user.password !== undefined ? user.password : null;
    user.photo = user.photo !== undefined ? user.photo : null;
    user.birthday = user.birthday !== undefined ? user.birthday : null;
    return fetch(apiUrl + `/edit`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(user),
      credentials
    }).then(response => response.json())
  },

  manageUser(event_id, user_id, action, type) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    action = action !== undefined ? action : null;
    type = type !== undefined ? type : null;

    /**
    * Yeah, I know this is sad, but it's required to allow for retrocompatibility of the API
    */
    if(type == "evg_member" || type == "evjf_member"){
      action = action == "promote" ? "invite" : "remove"
    }
    if(type.startsWith("ev")){
      type = type.split("_")[0]
    }
    if(type == "owner"){
      type = action;
      action = "owner";
    }
    return fetch(apiUrl + `/event/${action}/${type}/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  removeGuestFromEvent(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/guest/remove/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  addOwnerRole(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/owner/promote/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  removeOwnerRole(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/owner/demote/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  addEvgMember(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/invite/evg/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  removeEvgMember(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/remove/evg/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  addEvjfMember(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/invite/evjf/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  removeEvjfMember(event_id, user_id) {
    event_id = event_id !== undefined ? event_id : null;
    user_id = user_id !== undefined ? user_id : null;
    return fetch(apiUrl + `/event/remove/evjf/${event_id}/${user_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  removeProvider(event_id, provider_id) {
    event_id = event_id !== undefined ? event_id : null;
    provider_id = provider_id !== undefined ? provider_id : null;
    return fetch(apiUrl + `/event/provider/remove/${event_id}/${provider_id}`, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  advertList(adType, screenLocation, eventType){
    adType = adType !== undefined ? adType : null;
    screenLocation = screenLocation !== undefined ? screenLocation : null;
    eventType = eventType !== undefined ? eventType : null;
    return fetch(apiUrl + "/advert/list", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ adType, screenLocation, eventType }),
      credentials
    }).then(response => response.json())
  },

  advertAddView(advert_id){
    advert_id = advert_id !== undefined ? advert_id : null;
    return fetch(apiUrl + `/advert/add_view/${advert_id}`, {
      method : "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  advertAddClick(advert_id){
    advert_id = advert_id !== undefined ? advert_id : null;
    return fetch(apiUrl + `/advert/add_click/${advert_id}`, {
      method : "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  getFoodTypes() {
    return fetch(apiUrl + "/food_type/list", {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  getFoodTags() {
    return fetch(apiUrl + "/food_preference/list", {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  getRestaurants(infos) {
    return fetch(apiUrl + "/restaurant/list", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(infos),
      credentials
    }).then(response => response.json())
  },

  deleteEvent(id){
    return fetch(apiUrl + "/event/delete/" + id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  changeAttendingStatus(event_id, attending){
    return fetch(apiUrl + "/event/attending/" + event_id + "/" + attending, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  markConvAsRead(conv_id){
    return fetch(apiUrl + "/chat/conversation/read/" + conv_id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  leaveEvent(id) {
    return fetch(apiUrl + "/event/remove/user_client/" + id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json())
  },

  sendFile(file, event_id) {
    return fetch(apiUrl + "/event/media_feed/upload/" + event_id, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(file),
      credentials
    }).then(response => response.json());
  },

  getPendingProviders(id){
    return fetch(apiUrl + "/event/list/pending_provider/" + id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  getDirectoryProviderTypes(){
    return fetch(apiUrl + "/directory-provider-type/list", {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  getDirectoryProviders(filters){
    return fetch(apiUrl + "/directory-provider/list", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(filters),
      credentials
    }).then(response => response.json());
  },

  getDirectoryProviderDetail(id){
    return fetch(apiUrl + "/directory-provider/detail/" + id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  getMembersByConversation(id){
    return fetch(apiUrl + "/chat/get-user-clients-by-conversation/" + id, {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  getPrivateConversation(users){
    console.log("conv", users)
    return fetch(apiUrl + "/chat/get-private-conversation", {
      method: "POST",
      body: JSON.stringify({users}),
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  addProviderFeedback(providerId, feedback){
    return fetch(apiUrl + "/directory-provider-feedback/create", {
      method: "POST",
      body: JSON.stringify({
        providerId,
        ...feedback
      }),
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  addProviderContact(providerId, contact){
    return fetch(apiUrl + "/directory-provider-contact/create", {
      method: "POST",
      body: JSON.stringify({
        providerId,
        ...contact
      }),
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  likeMedia(id, file_id, value){
    return fetch(apiUrl + "/event/media_feed_file/like/"+id+"/"+file_id+"/"+(value ? 1 : 0), {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },

  dislikeMedia(id, file_id, value){
    return fetch(apiUrl + "/event/media_feed_file/dislike/"+id+"/"+file_id+"/"+(value ? 1 : 0), {
      method: "GET",
      headers: defaultHeaders,
      credentials
    }).then(response => response.json());
  },
}
