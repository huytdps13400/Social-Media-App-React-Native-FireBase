import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Image, Pressable, ToastAndroid} from 'react-native';
import styles from '../Styles_HomeScreens';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import database from '@react-native-firebase/database';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import auth from '@react-native-firebase/auth';

const ItemFlatlist = React.memo((props) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const refRBSheet = useRef();
  const [countcmt, setCountcmt] = useState();
  const idTokenResult = auth().currentUser.uid;
  const [check, setCheck] = useState();

  // const check =()=>{
  //   if(idTokenResult == props.uid){
  //     setCheck(true);
  //   }
  // }
  const loadDATA = () => {
    database()
      .ref('Post/' + props.id)
      .child('Comment')
      .on('value', (snapshot) => {
        if (snapshot.numChildren() != null) {
          setCountcmt(snapshot.numChildren());
        } else {
          setCountcmt(0);
        }
      });
  };
  useEffect(() => {
    loadDATA();
  });
  const ShowAlert = () => {
    setShowAlert(true);
  };
  const hideAlert = () => {
    setShowAlert(false);
  };
  const deletepost = async (idpost) => {
    await database()
      .ref('/Post/' + idpost)
      .remove();
    ToastAndroid.show('Delete successful', ToastAndroid.SHORT);
    hideAlert();
  };
  const dateTime = (time) => {
    TimeAgo.addLocale(en);
    let timedate;
    const timeAgo = new TimeAgo('en-US');

    timeAgo.format(new Date());

    timedate = timeAgo.format(time - 60 * 1000);
    if (timedate.substring(0, 2) < 60) {
      return timedate;
    } else {
      return (timedate = timeAgo.format(time - 2 * 60 * 60 * 1000));
    }
  };
  return (
    <View style={styles.boxitem}>
      <View style={styles.viewboxitemnho}>
        <View style={styles.viewboxavatar}>
          <Pressable
            onPress={() => navigation.navigate('ProfilePritaveScreen',{idpost:props.id,uid:props.uid,avatar:props.avatar})}>
            <Image
              source={{
                uri: props.avatar,
              }}
              style={styles.imgavataritem}
            />
          </Pressable>

          <View style={{marginLeft: 13}}>
            <Pressable
              onPress={() => navigation.navigate('ProfilePritaveScreen',{idpost:props.id,uid:props.uid,avatar:props.avatar})}>
              <Text style={styles.txtnameitem}>{props.name}</Text>
            </Pressable>
            <Text style={styles.txttimeitem}>{dateTime(props.time)}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            refRBSheet.current.open();
          }}>
          <Icon name="ellipsis-vertical" color={'#7A8FA6'} size={26}></Icon>
        </Pressable>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#fff',
            },
            container: {
              paddingHorizontal: 20,
              paddingVertical: 15,
              height: 140,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: '#ffffffff',
            },
          }}>
          {props.uid == idTokenResult ? (
            <View>
              <Pressable
                style={styles.btnpopupmenu}
                onPress={() => {
                  navigation.navigate('EditPostScreens', {
                    statuss: props.status,
                    imgpost: props.imagepost,
                    id: props.id,
                  });
                  refRBSheet.current.close();
                }}>
                <Octicons name="pencil" size={24} color="#000"></Octicons>
                <Text style={styles.txtbtnpopupmenu}>Chỉnh sửa bài viết </Text>
              </Pressable>
              <Pressable
                style={[styles.btnpopupmenu, {marginTop: 20}]}
                onPress={() => {
                  refRBSheet.current.close();
                  ShowAlert();
                }}>
                <Icon name="trash" size={24} color="#000"></Icon>
                <Text style={styles.txtbtnpopupmenu}>Xoá bài viết </Text>
              </Pressable>
            </View>
          ) : null}

          <Pressable
            style={[styles.btnpopupmenu, {marginTop: 20}]}
            onPress={() => refRBSheet.current.close()}>
            <Icon name="bookmark-outline" size={24} color="#000"></Icon>
            <Text style={styles.txtbtnpopupmenu}>Lưu bài viết </Text>
          </Pressable>
        </RBSheet>
      </View>
      <View style={{marginTop: 18}}>
        <Text>{props.status}</Text>
        {!!props.imagepost && (
          <Image
            source={{
              uri: props.imagepost,
            }}
            style={[styles.imgpostitem, {width: props.width}]}
          />
        )}
      </View>
      <View style={styles.viewboxitemcmt}>
        <View style={styles.viewboxheart}>
          <Pressable onPress={() => console.log('ahah')}>
            <Icon name="heart" color={'#7A8FA6'} size={26}></Icon>
          </Pressable>
          <Text style={styles.txtimgheart}>247</Text>
        </View>
        <View style={styles.viewboxchatbubble}>
          <Pressable
            onPress={() =>
              navigation.navigate('PostScreensDetails', {
                imgpost: props.imagepost,
                idpost: props.id,
              })
            }>
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
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Thông Báo"
        message="Bạn có chắc muốn xoá bài viết này không!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          deletepost(props.id);
        }}
      />
    </View>
  );
});
export default ItemFlatlist;
