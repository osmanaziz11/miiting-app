import io from 'socket.io-client';
import AppConfig from "./Appconfig";
import {AsyncStorage} from "react-native";

const socket = io(AppConfig.nodeUrl);

socket.on('connect', () => {
  console.log("Socket.io connect event received");
});

socket.on('disconnect', () => {
  console.log("Socket.io disconnect event received");
});

socket.on("register", ()=>{
  AsyncStorage.getItem("@login:id", (error, result) => {
    if(error == null && result != null){
      socket.emit("register", {id: result});
    }
  })
});

export default socket;
