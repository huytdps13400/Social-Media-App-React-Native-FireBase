import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ic_online from '../../assets/images/ic_online.png';
import styles from './Styles_PostScreens';
const PostScreens = ({navigation}) => {
  const [width, setWidth] = useState();
  const [image, setImage] = useState();
  const [status, setStatus] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [data, setData] = useState([]);
  const [imgavatar, setImgavatar] = useState();
  const [username, setUsername] = useState();

  const idTokenResult = auth().currentUser.uid;

  useEffect(() => {
    database()
      .ref('/User/')
      .on('value', (snapshot) => {
        if (snapshot.val() != null) {
          setData(Object.values(snapshot.val()));
        } else {
          setData(null);
        }
      });
    setWidth(Dimensions.get('window').width - 28);
  }, []);
  function avatar() {
    for (let index = 0; index < data.length; index++) {
      if (data[index].uid == idTokenResult) {
        setImgavatar(data[index].imgavatar);
        setUsername(data[index].username);
      }
    }
  }
  useEffect(() => {
    avatar();
    return () => {};
  });
  const insertPost = (id, status, imgavatar, username, time) => {
    return new Promise(function (resolve, reject) {
      // khai bao bien key
      let key;
      if (id != null) {
        key = id;
      } else {
        key = database().ref().push().key;
      }

      if (image != null) {
        addimage(key, status, imgavatar, username, time);
      } else {
        database()
          .ref('Post/' + key)
          .update({
            id: key,
            status: status,
            imagepost: '',
            avatar: imgavatar,
            uid: idTokenResult,
            name: username,
            time: time,
          })
          .then((snapshot) => {
            resolve(snapshot);
            ToastAndroid.show('Post successful', ToastAndroid.SHORT);
            navigation.navigate('MainScreens');
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };
  const addimage = async (key, status, imgavatar, username, time) => {
    const uri = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // uploads file
    console.log('uri------' + uri);
    console.log('filename------' + filename);
    console.log('opuri--------' + uploadUri);
    const task = storage()
      .ref('ImagePost/' + filename)
      .putFile(uploadUri);
    setUploading(true);
    setTransferred(0);
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
      .ref('ImagePost/' + filename)
      .getDownloadURL();
    database()
      .ref('Post/' + key)
      .update({
        id: key,
        status: status,
        imagepost: url,
        avatar: imgavatar,
        uid: idTokenResult,
        name: username,
        time: time,
      })
      .then((snapshot) => {
        console.log(snapshot);
        ToastAndroid.show('Post successful', ToastAndroid.SHORT);
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
  const ImageCammera = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.uri) {
        setImage(response.uri);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImageCammera();
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewtoolbar}>
        <View style={styles.viewarrow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={26} style={{marginLeft: 14}}></Icon>
          </Pressable>
          <Text style={styles.txtarrow}>Create a post</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(imgavatar);
            insertPost(null, status, imgavatar, username, Date.now());
          }}
          style={styles.btnpost}>
          <Text style={styles.txtbtnpost}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewboxtong}>
        <View style={styles.viewboxnho}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.viewimgavatar}>
              <Image
                source={{
                  uri: imgavatar,
                }}
                style={[styles.viewimgavatar, {borderRadius: 45 / 2}]}></Image>
              <Image source={ic_online} style={styles.imgonline} />
            </View>
            <Text style={styles.txtname}>{username}</Text>
          </View>
          <TextInput
            placeholder="What do you think ?"
            style={styles.edtstatus}
            onChangeText={(text) => setStatus(text)}
          />
          <Image
            source={{
              uri: image,
            }}
            style={{height: 400, width: width}}
          />
          <View style={styles.viewboxaction}>
            <TouchableOpacity>
              <Icon
                name="videocam"
                size={26}
                color={'#f00'}
                style={{marginRight: 16}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ImageLibary();
              }}>
              <Icon
                name="images"
                size={26}
                color={'#5bcf05'}
                style={{marginRight: 16}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                requestCameraPermission();
              }}>
              <Icon name="camera" size={26} color={'#2FBBF0'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default PostScreens;
