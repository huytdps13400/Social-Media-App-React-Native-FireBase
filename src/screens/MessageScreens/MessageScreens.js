import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageScreens = ({route}) => {
  const [messages, setMessages] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const {uid} = route.params;
  const loadData = () => {
    database()
      .ref('/Chat/')
      .orderByChild('sender')
      .equalTo(uid)
      .on('value', (snapshot) => setMessages(Object.values(snapshot.val())));
  };
  useEffect(() => {
    loadData();
  }, []);
  const onSend = (messages) => {
    let key = database().ref().push().key;
    let text = messages.map(function (item) {
      console.log(item['text']);
      return item['text'];
    });
    database()
      .ref('ChatList/' + auth().currentUser.uid)
      .child(uid)
      .update({id: uid})
      .then(() => {
        database()
          .ref('Chat/' + key)
          .update({
            isseen: false,
            messages: text,
            receiver: auth().currentUser.uid,
            sender: uid,
            time: Date.now(),
          });
      });
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',paddingHorizontal:10}}>
        <Image
        style={{width:40,height:40,borderRadius:40/2,alignSelf:'flex-end',marginRight:5}}
          source={{
            uri:
              'https://scontent-sin6-3.xx.fbcdn.net/v/t1.0-9/159155652_482922589752554_7869138835143282456_o.jpg?_nc_cat=104&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=G6jKx54c1T8AX96KqRR&_nc_ht=scontent-sin6-3.xx&oh=d272f7492a16294d3c70618efb12b314&oe=606EAD4E',
          }}
        />
        <View style={{ borderRadius: 10,width:windowWidth-100,backgroundColor:"#f00"}}>
          <Text style={{backgroundColor: 'yellow',paddingHorizontal:5,paddingVertical:5}}>
            If you are targeting 
          </Text>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          width: windowWidth,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Enter message"
          style={{height: 50, width: windowWidth - 50}}
        />
        <TouchableOpacity style={{marginRight: 10}}>
          <Icon name="send" size={26} color={'#2FBBF0'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
