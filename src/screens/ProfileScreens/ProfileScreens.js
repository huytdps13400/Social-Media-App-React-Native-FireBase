import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemFlatlist from '../HomeScreens/componemnts/ItemFlatlist';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from '../ProfileScreens/stylesProfileScreens';
const ProfileScreens = ({navigation}) => {
  const [data, setData] = useState([]);
  const [imgavatar, setImgavatar] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [countPost, setcountPost] = useState();
  const idTokenResult = auth().currentUser.uid;
  const loadData = async () => {
    database()
      .ref('Post/')
      .orderByChild('uid')
      .equalTo(idTokenResult)
      .on('value', (snapshot) => {
        if (snapshot.val()==null) {
          setData(null);
        }else{
          setData(Object.values(snapshot.val()));
        }
        if (snapshot.numChildren() != null) {
          setcountPost(snapshot.numChildren());
        } else {
          setcountPost(0);
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  function avatar() {
    database().ref('User/'+idTokenResult).on('value',(snapshot)=>{
    setImgavatar(snapshot.val().imgavatar) ;setName(snapshot.val().username);
    setPhone(snapshot.val().phone); setStatus(snapshot.val().status);}
    )
  }
  useEffect(() => {
    avatar();
  });
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.navigate('SettingScreens')}>
          <Icon name="options-outline" size={24} style={styles.iconsetting} />
        </Pressable>
        <View style={styles.boxprofile}>
          <View style={{width: 121}}>
            <View>
              <Image
                style={styles.imgavatar}
                source={{
                  uri: imgavatar,
                }}
              />
              <Pressable
                style={styles.btneditprofile}
                onPress={() => navigation.navigate('EditProfileScreens')}>
                <Text style={styles.txteditprofile}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.boxprofileuser}>
            <Text style={styles.txtname}>{name}</Text>
            <Text style={styles.txtemail}>{auth().currentUser.email}</Text>
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

export default ProfileScreens;
