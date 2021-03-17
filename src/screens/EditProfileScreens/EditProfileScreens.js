import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioButton from "rn-radio-button";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

const EditProfileScreens = ({navigation}) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const idTokenResult =  auth().currentUser.uid;
  const [birthday, setBirthday] = useState();
  const [val, setVal] = useState();
  const [status, setStatus] = useState();
  const [image, setImage] = useState();
  const [data, setData] = useState([]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(birthday);
  
  };
 
useEffect(() => {
 database().ref('/User/'+idTokenResult).on('value', (snapshot) => {
   if(snapshot.val()!=null){
    setUsername( snapshot.val().username);
    setPhone( snapshot.val().phone);
    setBirthday(snapshot.val().birthday);
    setVal(snapshot.val().gender);
    setStatus(snapshot.val().status);
    setImage(snapshot.val().imgavatar);
   }
  
 })
}, []);
const loaddata=()=>{
  database().ref('/Post/').orderByChild('uid').equalTo(idTokenResult).on('value',(snapshot)=>{if(snapshot.val()!=null){ setData(Object.values(snapshot.val()))}})

}
useEffect(()=>{
  loaddata();
 
},[]);

useEffect(()=>{
  
  converttodate(date);
});

const test=(avatar,username)=>{
  for(let i=0;i<data.length;i++){
    console.log(data[i].id);
    database().ref('Post/'+data[i].id).update({avatar:avatar,name:username});
  }

}
const addimage = async (key, status, imgavatar, username, phone,gender,birthday) => {
  const uri = image;
  const filename = uri.substring(uri.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  // uploads file
  console.log('uri------' + uri);
  console.log('filename------' + filename);
  console.log('opuri--------' + uploadUri);
  const task = storage()
    .ref('UserImage/' + filename)
    .putFile(uploadUri);
  task.on('state_changed', (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );

    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
    );
  });

  try {
    await task;
  } catch (e) {
    console.error(e);
  }
  const url = await storage()
    .ref('UserImage/' + filename)
    .getDownloadURL();
  database()
    .ref('User/' + idTokenResult)
    .update({
      status: status,
      imgavatar: url,
      uid: idTokenResult,
      username: username,
      phone: phone,
      birthday:birthday,
      gender:gender
    })
    .then((snapshot) => {
      console.log(snapshot);
     test(url,username);
      ToastAndroid.show('Edit successful', ToastAndroid.SHORT);
      navigation.navigate('MainScreens');
    })
    .catch((err) => {
      console.log(err);
    });
};
const ImageLibary = () => {
  const options = {
    noData: true,
  };
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);
    if (response.uri) {
      setImage(response.uri);
    }
  });
};
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const listData = [
    { label: "Single", value: 'Single' },
    { label: "Date", value: 'Date' },
    { label: "Marriage", value: 'Marriage' },
  
  ];
  const listDatastatus = [
    { label: "Male", value: 'Male' },
    { label: "Female", value: 'Female' },
    { label: "Other", value: 'Other' },
  
  ];
  const converttodate =(birthday)=>{
    if(birthday==null){
      return null;
    }else{
   const dateee = new Date(birthday);
let year = dateee.getFullYear();
let month = dateee.getMonth()+1;
let dt = dateee.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}
return setBirthday(dt+'-' + month + '-'+year);
    }
  }
 
  
  function pressCircle(i) {
    setVal(i);
  }  
  function pressCirclestatus(i) {
    setStatus(i);
  } return (
    <View style={styles.container}>
     
      <View style={styles.viewtoolbar}>
        <View style={styles.viewarrow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} style={{marginLeft: 14}}></Icon>
          </Pressable>
          <Text style={styles.txtarrow}>Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={() => {addimage(idTokenResult,status,image,username,phone,val,birthday);}} style={styles.btnpost}>
          <Text style={styles.txtbtnpost}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{width:121,height:121,marginTop:30,alignSelf:'center'}}>
        <Image
          source={{
            uri: image
          }}
          style={{height: 121, width: 121,borderRadius:121/2}}
        />
        <Pressable onPress={()=>ImageLibary()} style={{height:30,width:30,position:'absolute',bottom:0,backgroundColor:'#e6e6e6ff',borderRadius:30/2,alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
        <Image style={{height:20,width:20}} source={require('../../assets/images/cammeraaa.png')} />
        </Pressable>
        </View>
          <View style={{paddingHorizontal:16}}>
            <Text  style={{marginLeft:10,fontSize:15,fontWeight:'600',marginTop:10}}>Username</Text>
            <View style={{flexDirection:'row',height:50,alignItems:'center',borderRadius:30,backgroundColor:'#e6e6e6ff',paddingLeft:10,elevation: 5}}>
            <Icon name="person-outline" size={26}></Icon>
            <TextInput style={{marginLeft:20}} placeholder="Username" value={username} onChangeText={(text)=>{setUsername(text)}}/>
            </View>
            <Text  style={{marginLeft:10,fontSize:15,fontWeight:'600',marginTop:10}}>Phone</Text>
            <View style={{flexDirection:'row',height:50,alignItems:'center',borderRadius:30,backgroundColor:'#e6e6e6ff',paddingLeft:10,elevation: 5}}>
            <Icon name="call-outline" size={26}></Icon>
            <TextInput style={{marginLeft:20}} placeholder="Phone" value={phone} onChangeText={(text)=>{setPhone(text)}}/>
            </View>
            <Text  style={{marginLeft:10,fontSize:15,fontWeight:'600',marginTop:10}}>Birthday</Text>
            <View style={{flexDirection:'row',height:50,alignItems:'center',borderRadius:30,backgroundColor:'#e6e6e6ff',paddingLeft:10,elevation: 5}}>
           <Pressable onPress={()=>{showDatepicker()}}>
           <Icon name="calendar-outline" size={26}></Icon>
           </Pressable>
           {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
            <Text style={{marginLeft:20}}>{birthday}</Text>
        
            </View>
            <View>
            <Text  style={{marginLeft:10,fontSize:15,fontWeight:'600',marginTop:10}}>Chosse Gender</Text>

            <RadioButton
          outerWidth={30}
          innerWidth={20}
          borderWidth={1}
          data={listDatastatus}
          color={"#000"}
          onPress={pressCircle}
          wrapperStyle={{ paddingLeft: 22,marginTop:5}}
          horizontal={true}
        />
            </View>
            <View>
            <Text  style={{marginLeft:10,fontSize:15,fontWeight:'600',marginTop:10}}>Relationship status</Text>

            <RadioButton
          outerWidth={30}
          innerWidth={20}
          borderWidth={1}
          data={listData}
          color={"#000"}
          onPress={pressCirclestatus}
          wrapperStyle={{ paddingLeft: 22,marginTop:5}}
          horizontal={true}
        />
            </View>
          </View>
      </View>
    </View>
  );
};

export default EditProfileScreens;

const styles = StyleSheet.create({
  container: {paddingTop: 30, flex: 1, backgroundColor: 'white'},
  viewtoolbar: {
    height: 48,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewarrow: {alignItems: 'center', flexDirection: 'row', flex: 1},
  txtarrow: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginLeft: 9,
    fontWeight: 'bold',
  },
  btnpost: {
    marginRight: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnpost: {fontSize: 18, fontFamily: 'Poppins-Bold', fontWeight: 'bold'},
});
