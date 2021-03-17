import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../ProfileScreens/stylesProfileScreens';
import ItemFlatlist from '../HomeScreens/componemnts/ItemFlatlist';

const ProfilePritaveScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [imgavatar, setImgavatar] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const idTokenResult = auth().currentUser.uid;

  const [countPost, setcountPost] = useState();
  const {uid, idpost,avatar} = route.params;

  const loadData = async () => {
    database()
      .ref('Post/')
      .orderByChild('uid')
      .equalTo(uid)
      .on('value', (snapshot) => {
        if (snapshot.val() == null) {
          setData(null);
        } else {
          setData(Object.values(snapshot.val()));
          console.log(snapshot.val().avatar)
          setImgavatar(avatar);
        }
        if (snapshot.numChildren() != null) {
          setcountPost(snapshot.numChildren());
        } else {
          setcountPost(0);
        }
      });
  };
  const loadDataUser = async () => {
    database()
      .ref('User/'+uid)
      .on('value', (snapshot) => {
       setName(snapshot.val().username);
       setPhone(snapshot.val().phone);
       setStatus(snapshot.val().status);
       setEmail(snapshot.val().email);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadDataUser();
  }, []);
  const renderItem = ({item}) => {
    return (
      <ItemFlatlist
        name={item.name}
        avatar={item.avatar}
        imagepost={item.imagepost}
        time={item.time}
        status={item.status}
        width={Dimensions.get('window').width - 60}
        id={item.id}
      />
    );
  };
  return (
    <View style={styles.containers}>
      <View style={styles.viewtoolbar}>
        <View style={styles.viewarrow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} style={{marginLeft: 14}}></Icon>
          </Pressable>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#e6e6e6ff'}}>
        <View style={[styles.boxprofile, {marginTop: 10}]}>
          <View style={{width: 121}}>
            <View>
              <Image
                style={styles.imgavatar}
                source={{
                  uri: imgavatar,
                }}
              />
              {uid!=idTokenResult ?  <Pressable
                style={[styles.btneditprofile,{flexDirection:'row',width:121}]}
                onPress={() => navigation.navigate('MessageScreens',{uid:uid})}>
                    <Icon name="chatbubbles-outline" color={'#fff'} size={18}></Icon>
                <Text style={[styles.txteditprofile,{fontSize:10,marginLeft:5}]}>Send Message</Text>
              </Pressable>:null }
           
            </View>
          </View>
          <View style={styles.boxprofileuser}>
            <Text style={styles.txtname}>{name}</Text>
            <Text style={styles.txtemail}>{email}</Text>
            <Text style={styles.txtphone}>{phone}</Text>
            <Text style={styles.txttrangthai}>{status}</Text>
          </View>
        </View>

        <View style={styles.boxflow}>
          <View style={styles.boxpost}>
            <Text style={styles.txtslpost}>{countPost}</Text>
            <Text style={styles.txtpost}>Post</Text>
          </View>
          <View style={styles.boxpost}>
            <Text style={styles.txtslpost}>1.5M</Text>
            <Text style={styles.txtpost}>Followers</Text>
          </View>
          <View style={styles.boxpost}>
            <Text style={styles.txtslpost}>71</Text>
            <Text style={styles.txtpost}>Following</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, marginTop: 25, paddingHorizontal: 10}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default ProfilePritaveScreen;
