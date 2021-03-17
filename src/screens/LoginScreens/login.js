import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Tablogin from './Tablogin';
import Tabdangki from './tabdangki';
import auth from '@react-native-firebase/auth';
import icarrowright from '../../assets/images/ic_arrowright.png';
import database from '@react-native-firebase/database';
import ic_google from '../../assets/images/ic_google.png';
import ic_fb from '../../assets/images/ic_facebook.png';
import ic_twiter from '../../assets/images/ic_twiter.png';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from './styleslogin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin ,statusCodes} from '@react-native-google-signin/google-signin';
const Tab = createMaterialTopTabNavigator();
const login = ({navigation}) => {
  useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '101439265189-3vm8r7hqulv5fbnvig10qlhpaphjleei.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    });
  })
 const fbLogin= async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
     ]);
     if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
   

  
    const tokenObj = await AccessToken.getCurrentAccessToken();
    if (!tokenObj) {
      throw 'Something went wrong obtaining access token';
    }
    // 
   const infoResponseCallback = async(error,success) =>{
      if(error){
            console.log("eeeeeeeeeee",error)
      }else{
        const facebookCredential = auth.FacebookAuthProvider.credential(tokenObj.accessToken);
     
        await auth().signInWithCredential(facebookCredential).then(()=>{
            console.log(auth().currentUser);
            database().ref('/User/'+auth().currentUser.uid).update({
              uid:auth().currentUser.uid,
              username:auth().currentUser.displayName,
              imgavatar:success.picture.data.url,
              email:auth().currentUser.email
      
            }).then(console.log('Thanh Cong'))
           navigation.navigate('MainScreens');
          })
            console.log('KKK'+success.picture.data.url)
      }
     }
     const infoRequest = new GraphRequest(
         '/me',
         {
             accessToken: tokenObj.accessToken,
             parameters: {
                 fields: {
                     string: 'email,name,first_name,middle_name,last_name,gender,address,picture.type(large)',
                 },
             },
         },
        infoResponseCallback,
     );
    new GraphRequestManager().addRequest(infoRequest).start()
 }catch(err){
     console.log("error",err)
 }
  }
  const googleLogin= async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: false });
     

      // Get the users ID token
      const  data  = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential).then(()=>{
        database().ref('/User/'+auth().currentUser.uid).update({
          uid:auth().currentUser.uid,
          username:auth().currentUser.displayName,
          imgavatar:auth().currentUser.photoURL,
          email:auth().currentUser.email
  
        }).then(console.log('Thanh Cong'))
       navigation.navigate('MainScreens');
      })
     
      .catch(error => {
          console.log('Something went wrong with sign up: ', error);
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.error(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.error(error);

      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.error(error);

      } else {
        // some other error happened
        console.error(error);

      }
      }
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#4481eb', '#04befe']}
          style={styles.linearGradient}>
          <View style={{paddingTop: 89}}>
            <Text style={styles.txtwelcome}>Welcome</Text>
            <Text style={styles.txtnote}>
              Please login or sign up to countinue using our app.
            </Text>
          </View>
          <View style={styles.viewtong}>
            <View style={styles.view1}>
              <View style={{flex: 1}}>
                <Tab.Navigator initialRouteName="Login">
                  <Tab.Screen name="Login" component={Tablogin} />
                  <Tab.Screen name="Signup" component={Tabdangki} />
                </Tab.Navigator>
              </View>
            </View>
            <View style={styles.view2}>
              <View style={styles.viewcardlogin}>
                <Pressable onPress={()=> googleLogin()} style={styles.viewgoogle}>
                  <Image
                    source={ic_google}
                    resizeMode="contain"
                    style={{height: 22, width: 22}}
                  />
                </Pressable>
               
                  <Pressable style={styles.viewfb} onPress={()=> {fbLogin();}}>
                  <Image
                    source={ic_fb}
                    resizeMode="contain"
                    style={{height: 22, width: 22}}
                  />
                  </Pressable>
                 
                
                <View style={styles.viewtwiter}>
                  <Image
                    source={ic_twiter}
                    resizeMode="contain"
                    style={{height: 22, width: 22}}
                  />
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default login;
