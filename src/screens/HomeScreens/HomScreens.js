import React, {useState, useEffect} from 'react';
import {View,Text,Image,FlatList,ScrollView,Dimensions,TouchableOpacity,StatusBar
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import icellipse from '../../assets/images/icellipse.png';
import styles from './Styles_HomeScreens';
import ItemFlatlist from './componemnts/ItemFlatlist';
const HomScreens = ({navigation}) => {
  const [width, setWidth] = useState();
  const [imageheight, setImageheight] = useState();
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [imgavatar, setImgavatar] = useState();
  const [image2, setImage2] = useState();
  const idTokenResult =  auth().currentUser.uid;
  const loadData = async()=>{
     database()
    .ref('Post/').orderByChild('id')
    .on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData(Object.values(snapshot.val()));
      } else {
        setData(null);
      }
    });
  }
  const loadDatauser = async()=>{
    database()
    .ref('/User/')
    .on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setDataUser(Object.values(snapshot.val()));
      } else {
        setDataUser(null);
      }
    });
  }
  useEffect(() => {
    setWidth(Dimensions.get('window').width - 60);
    const imagehg = Math.floor(width * 1.1);
    setImageheight(image2 + '=s' + imagehg);
    let mounted = true
    if(mounted){
      loadData();
      loadDatauser();
    }
     
    
    return ()=>{
      mounted =false;
    }
  
  }, []);

  useEffect(() => {
    database().ref('User/'+idTokenResult).on('value', snapshot => {
      setImgavatar(snapshot.val().imgavatar);})
  });
  const renderItem = ({item}) => {
    return (
      <ItemFlatlist
        name={item.name}
        avatar={item.avatar}
        imagepost={item.imagepost}
        time={item.time}
        status={item.status}
        width={width}
        id={item.id}
        uid={item.uid}
       
        
      />
    );
  };
  return (
    <View style={styles.container}>
       <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.viewboxtong}>
        <View style={styles.viewboxbaonho}>
          <Text style={styles.txttieude}>Discover</Text>
          <Image source={icellipse} style={styles.imgtxttieude} />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('SettingScreens')}>
        <Image
          source={{
            uri:imgavatar
             
          }}
          style={styles.imgavatar}
        />
        </TouchableOpacity>
       
      </View>
      <View style={styles.viewboxflatlist}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
           
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostScreens')}
          activeOpacity={0.8}
          style={styles.btinsertpost}>
          <Icon name="cloud-upload" size={26} color={'#fff'}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomScreens;
