import React,{useEffect,useState} from 'react';
import {StyleSheet, Text, View, StatusBar,Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatScreens from '../ChatScreens/ChatScreens';
import HomeScreens from '../HomeScreens/HomScreens';
import NotificationScreens from '../NotificationScreens/NotificationScreens';
import ProfileScreens from '../ProfileScreens/ProfileScreens';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const Tab = createMaterialBottomTabNavigator();
const MainScreens = () => {
  const [imgavatar, setImgavatar] = useState();
  const [data, setData] = useState([]);
  const idTokenResult =  auth().currentUser.uid;
  const loadData = async()=>{
    database().ref('User/'+idTokenResult).on('value', snapshot => {
      setImgavatar(snapshot.val().imgavatar);
  })
   }
  useEffect(() => {
        loadData();
    });
   
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#2FBBF0"
        inactiveColor="#7A8FA6"
        showLabel={false}
        barStyle={{backgroundColor: '#FFFF'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreens}
          options={{
            keyboardHidesTabBar: !(Platform.OS === 'ios') ,
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name="ios-home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ChatScreens"
          component={ChatScreens}
          options={{
            tabBarLabel: 'Chat',

            tabBarIcon: ({color}) => (
              <Icon name="chatbubble-ellipses" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="NotificationScreens"
          component={NotificationScreens}
          options={{
            tabBarLabel: 'Notification',

            tabBarIcon: ({color}) => (
              <Icon name="notifications" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreens"
          component={ProfileScreens}
          options={{
            tabBarLabel: '',
           
            tabBarIcon: ({color}) => (
              <Image
              style={{
                height: 30,
                width: 30,
                borderRadius:30 / 2,
                borderColor: '#ffffff',
                
              }}
              source={{
                uri:imgavatar
              }}
            />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default MainScreens;
