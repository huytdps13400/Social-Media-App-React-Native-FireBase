import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,ToastAndroid
} from 'react-native';
import auth from '@react-native-firebase/auth';
import ic_email from '../../assets/images/ic-img.png';
import ic_password from '../../assets/images/ic-password.png';
import styles from './stylestablogin';
function Tablogin({navigation}) {
  const [email, setEmail] = useState('kietps1245@gmail.com');
  const [password, setPassword] = useState('123456');
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const login = (email, password) => {
    if (email == null || password == null) {
      ToastAndroid.show('Vui lòng nhập đầy đủ!', ToastAndroid.SHORT);
    } else {
      if (!validateEmail(email)) {
        ToastAndroid.show('Vui lòng nhập đúng định dạng!', ToastAndroid.SHORT);
      } else if (password.length < 6) {
        ToastAndroid.show('Mật khẩu quá ngắn!', ToastAndroid.SHORT);
      } else {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then((snapshot) => {
            console.log(snapshot);
            ToastAndroid.show('Login thành Công!', ToastAndroid.SHORT);
            navigation.navigate('MainScreens');
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              ToastAndroid.show('That email address is already in use!', ToastAndroid.SHORT);
            
            }

            if (error.code === 'auth/invalid-email') {
              ToastAndroid.show('That email address is invalid!', ToastAndroid.SHORT);
            
            }

            console.error(error);
          });
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewtxtinput}>
        <Image
          source={ic_email}
          resizeMode="contain"
          style={styles.imgtxtinput}
        />
        <TextInput
          style={styles.txtinput}
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={[styles.viewtxtinput, {marginTop: 16}]}>
        <Image
          source={ic_password}
          resizeMode="contain"
          style={styles.imgtxtinput}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.txtinput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.viewfooter}>
        <Text style={{color: '#4481eb'}}>Forgot Password?</Text>
      </View>
      <View style={styles.viewbtnlogin}>
        <TouchableOpacity
          onPress={() => login(email, password)}
          style={styles.btnlogin}>
          <Text style={styles.txtlogin}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Tablogin;
