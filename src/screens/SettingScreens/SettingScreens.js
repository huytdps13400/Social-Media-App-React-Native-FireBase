import React from 'react';
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import styles from './StylesSettingScreens';
const SettingScreens = ({navigation}) => {
  const sigout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Home');
        ToastAndroid.show('Sigout Successful', ToastAndroid.SHORT);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewtoolbar}>
        <View style={styles.viewarrow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} style={{marginLeft: 14}}></Icon>
          </Pressable>
          <Text style={styles.txtarrow}>Setting</Text>
        </View>
      </View>
      <View style={styles.viewtong}>
        <View style={styles.viewbox}>
          <Pressable style={styles.viewboxbtn}>
            <Icon name="key" size={26} style={{marginLeft: 14}} />
            <Text style={styles.txttitile}>Change password</Text>
          </Pressable>
          <Icon name="chevron-forward" size={26} style={styles.icon} />
        </View>
        <View style={styles.viewbox}>
          <Pressable style={styles.viewboxbtn} onPress={() => sigout()}>
            <Icon name="log-out-outline" size={26} style={{marginLeft: 14}} />
            <Text style={styles.txttitile}>Logout</Text>
          </Pressable>
          <Icon name="chevron-forward" size={26} style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

export default SettingScreens;
