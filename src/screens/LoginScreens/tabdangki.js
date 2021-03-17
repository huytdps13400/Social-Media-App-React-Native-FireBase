import React,{useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,ToastAndroid
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ic_email from '../../assets/images/ic-img.png';
import ic_password from '../../assets/images/ic-password.png';
import ic_user from '../../assets/images/ic_user.png';
import styles from './stylestabdangki';
const Tabdangki = ({navigation}) => {
  const[username,setUsername] = useState();
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
    const[imgavatar,setImgavatar] = useState();
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const sigup=(username,email,password,imgavatar)=>{
  if (username == null || email == null || password == null) {
    ToastAndroid.show('Vui lòng nhập đầy đủ!', ToastAndroid.SHORT);
  }else{
    if (!validateEmail(email)) {
      ToastAndroid.show('Vui lòng nhập đúng định dạng email!', ToastAndroid.SHORT);
    }else if(password.length <6){
      ToastAndroid.show('Mật khẩu quá ngắn!', ToastAndroid.SHORT);
    }else{
      auth()
  .createUserWithEmailAndPassword(email,password)
  .then(() => {
    const idTokenResult =  auth().currentUser.uid;
   database().ref('User/'+idTokenResult).update({
     uid:idTokenResult,
     username:username,
     email:email,
     imgavatar:imgavatar,
     

   }).then((snapshot)=> console.log(snapshot)).catch((err)=>console.log(err));
    ToastAndroid.show('Sigup thành Công!', ToastAndroid.SHORT);
    navigation.navigate('Login');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
    }
  }
}
  return (
    <View style={styles.container}>
      <View style={styles.viewtxtinput}>
        <Image
          source={ic_user}
          resizeMode="contain"
          style={styles.imgtxtinput}
        />
        <TextInput
          style={styles.txtinput}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={[styles.viewtxtinput, {marginTop: 10}]}>
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
      <View style={[styles.viewtxtinput, {marginTop: 10}]}>
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
        <Text style={{color: '#8A9EAD', fontSize: 12}}>
          By pressing “submit” you agree to our
        </Text>
        <Text
          style={{
            color: '#4481eb',
            textDecorationLine: 'underline',
            fontSize: 12,
          }}>
          terms {'&'} conditions
        </Text>

        <TouchableOpacity onPress={()=> {sigup(username,email,password,imgavatar)}} style={styles.btnsigup}>
          <Text style={styles.txtsigup}>SIGUP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Tabdangki;
