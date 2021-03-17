import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  ScrollView,
  FlatList,
  TextInput,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
const Item = ({item}) =>{
  const dateTime=(time)=>{
    TimeAgo.addLocale(en);
    let timedate;
    const timeAgo = new TimeAgo('en-US');

    timeAgo.format(new Date());
   
    
 
    timedate= timeAgo.format(time - 60 * 1000) ;
    if (timedate.substring(0,2) <60) {
      return  timedate;
    }else{
  return timedate=  timeAgo.format(time - 2 * 60 * 60 * 1000);
    }
  
  }
return (
  
  <View
    style={{
      paddingVertical: 15,
      backgroundColor: 'White',
      paddingLeft: 10,
      flex: 1,
     
    }}>
    <View style={{flexDirection: 'row'}}>
      <Text
        style={{
          fontFamily: 'Poppin-Regular',
          fontSize: 10,
          color: '#ACACAC',
          position: 'absolute',
          right: 20,
        }}>
        {dateTime(item.time)}
      </Text>
      <Image
        style={{width: 50, height: 50, borderRadius: 50 / 2}}
        source={{
          uri: item.avatar,
        }}
      />
      <View style={{marginLeft: 12}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 12,
              fontWeight: '700',
              color: '#7A8FA6',
              width:150
            }}>
            {item.name}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Poppin-Regular',
            fontSize: 12,
            color: '#7A8FA6',
            width: '70%',
          }}>
          {item.status}
        </Text>
      </View>
    </View>
  </View>
);
        }
const PostScreensDetails = ({navigation,route}) => {
  const { imgpost,idpost } = route.params;
  const [width, setWidth] = useState();
  const [imagepost, setImagepost] = useState(imgpost);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const idTokenResult = auth().currentUser.uid;
  const [status, setStatus] = useState();
  const [DATA, setDATA] = useState([]);
  const [countcmt,setCountcmt] = useState();

  useEffect(() => {
    setWidth(Dimensions.get('window').width);

    return () => {};
  });
  useEffect(()=>{
    database().ref('User/'+idTokenResult).on('value',(snapshot)=>{setAvatar(snapshot.val().imgavatar); setName(snapshot.val().username)});

  },[]);
  const loadDATA =()=>{
    database().ref('Post/'+idpost).child('Comment').on('value',(snapshot) => {if(snapshot.val()!=null){
      setDATA(Object.values(snapshot.val()));
    }else{
      setDATA(null);
    }})

  }
  useEffect(()=>{
    loadDATA();
  },[]);
  const load =()=>{
    database().ref('Post/'+idpost).child('Comment').on('value',(snapshot) => {if(snapshot.numChildren()!=null){
      setCountcmt(snapshot.numChildren());
    }else{
      setCountcmt(0);
    }});

  }
  useEffect(()=>{
    load();
  })
  const insertPost = (idpost,id, status, imgavatar, username, time) => {
    return new Promise(function (resolve, reject) {
      // khai bao bien key
      let key;
      if (id != null) {
        key = id;
      } else {
        key = database().ref().push().key;
      }
        database()
          .ref('Post/' + idpost).child('Comment/'+key)
          .update({
            id: key,
            status: status,
            avatar: imgavatar,
            uid: idTokenResult,
            name: username,
            time: time,
          })
          .then((snapshot) => {
            resolve(snapshot);
            ToastAndroid.show('Post successful', ToastAndroid.SHORT);
           setStatus(null);
          })
          .catch((err) => {
            reject(err);
          });
   
    });
  };
 
  const renderItem = ({item}) => {
    return (
      <Item item={item}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
        <Image
          style={{
            height: 385,
            width: width,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          source={{
            uri:
            imagepost,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 35,
            flexDirection: 'row',
            height: 40,
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} color="#fff"></Icon>
          </Pressable>
          <Pressable onPress={() => console.log('kaka')}>
            <Icon name="ellipsis-vertical" color={'#fff'} size={26}></Icon>
          </Pressable>
        </View>
      </View>
      <View style={styles.viewboxitemcmt}>
        <View style={styles.viewboxheart}>
          <Pressable onPress={() => console.log('ahah')}>
            <Icon name="heart" color={'#FF5757'} size={26}></Icon>
          </Pressable>
          <Text style={styles.txtimgheart}>247</Text>
        </View>
        <View style={styles.viewboxchatbubble}>
          <Pressable onPress={() => console.log('ahah')}>
            <Icon name="chatbubble" color={'#7A8FA6'} size={26}></Icon>
          </Pressable>
          <Text style={styles.txtimgheart}>{countcmt}</Text>
        </View>
        <View style={styles.viewboxchatbubble}>
          <Pressable onPress={() => console.log('ahah')}>
            <Icon name="arrow-redo" color={'#7A8FA6'} size={26}></Icon>
          </Pressable>
          <Text style={styles.txtimgheart}>34</Text>
        </View>
      </View>
      {DATA ?<ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <FlatList
          data={DATA}
          style={{flex: 1}}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView> :
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
 <Text style={{fontFamily:'Poppins-Bold',fontSize:20}}>Chưa có bình luận nào</Text>
      </View>}
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingVertical: 10,
          borderTopWidth: 0.2,
          borderColor: '#7A8FA6'
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50 / 2, marginLeft: 10}}
          source={{
            uri:
              avatar
          }}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:1,paddingRight:10}}>
        <TextInput
          style={{
            marginLeft: 12,
            backgroundColor: '#F8F8F8',
            height: 40,
            width: 280,
            borderRadius: 20,
          }}
          placeholderTextColor="#A3A1A1"
          placeholder="Add a comment"
          onChangeText={(text)=> setStatus(text)}
          value={status}
          multiline={true}
        />
        <Pressable onPress={() => insertPost(idpost,null,status,avatar,name,Date.now())}>
            <Icon name="send" color={'#2FBBF0'}  size={26}></Icon>
          </Pressable>
        </View>
       
      </View>
     
    </View>
  );
};

export default PostScreensDetails;

const styles = StyleSheet.create({
  viewboxitemcmt: {marginTop: 10, flexDirection: 'row', paddingLeft: 10,
  borderBottomWidth: 0.2,paddingBottom:5,
  borderColor: '#7A8FA6'},
  viewboxheart: {flexDirection: 'row', alignItems: 'center'},
  txtimgheart: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7A8FA6',
    marginLeft: 4,
  },
  viewboxchatbubble: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 34,
  },
});
