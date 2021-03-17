import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {StyleSheet,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import login from './src/screens/LoginScreens/login';
import MainScreens from './src/screens/MainScreens/MainScreens';
import PostScreens from './src/screens/PostScreens/PostScreens';
import PostScreensDetails from './src/screens/PostScreensDetails/PostScreensDetails';
import SplashScreens from './src/screens/SplashScreens/SplashScreens';
import OnboardingScreen from './src/screens/OnboardingScreens/OnboardingScreen';
import EditPostScreens from './src/screens/EditPostScreens/EditPostScreens';
import SettingScreens from './src/screens/SettingScreens/SettingScreens';
import EditProfileScreens from './src/screens/EditProfileScreens/EditProfileScreens';
import ProfilePritaveScreen from './src/screens/ProfileScreens/ProfilePritaveScreen';
import MessageScreens from './src/screens/MessageScreens/MessageScreens';

const Stack = createStackNavigator();
const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName ;
  useEffect(() => {
   AsyncStorage.getItem('Onboardingfirst').then((value) =>{
     if (value == null) {
       AsyncStorage.setItem('Onboardingfirst','true');
       setIsFirstLaunch(true);
     }else{
       setIsFirstLaunch(false);
     }
   });

  }, []);
  if (isFirstLaunch === null) {
    return null;
  }else if (isFirstLaunch == true) {
    routeName='OnboardingScreen';
  }else{
    routeName='SplashScreens';
  }
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavigationContainer >
        <Stack.Navigator initialRouteName={routeName} screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={login}  />
          <Stack.Screen name="MainScreens" component={MainScreens}  />
          <Stack.Screen name="PostScreens" component={PostScreens}  />
          <Stack.Screen name="PostScreensDetails" component={PostScreensDetails}  />
          <Stack.Screen name="SplashScreens" component={SplashScreens}  />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen}  />
          <Stack.Screen name="EditPostScreens" component={EditPostScreens}  />
          <Stack.Screen name="SettingScreens" component={SettingScreens}  />
          <Stack.Screen name="EditProfileScreens" component={EditProfileScreens}  />
          <Stack.Screen name="ProfilePritaveScreen" component={ProfilePritaveScreen}  />
          <Stack.Screen name="MessageScreens" component={MessageScreens}  />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
