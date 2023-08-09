import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

class FacebookHandler{
  constructor(){
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
  }

  login(callback){
    FBLoginManager.loginWithPermissions(["email", "public_profile"], function(error, data){
      if (!error) {
        callback(data)
      } else {
        console.error(error);
      }
    })
  }
}

export default FacebookHandler;
