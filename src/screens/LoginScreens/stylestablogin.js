import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

var styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
  viewtxtinput: {
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#707070',
    marginTop: 32,
    flexDirection: 'row',
  },
  imgtxtinput: {width: 16, height: 50, marginLeft: 15, marginRight: 14},
  txtinput: {height: 50, flex: 1, fontFamily: 'Mosk Medium 500'},
  viewfooter: {alignItems: 'flex-end', marginTop: 16},
  viewbtnlogin: {alignSelf: 'center'},
  btnlogin: {
    marginTop: 10,
    height: 44,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#04befe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtlogin: {color: 'white', fontFamily: 'Mosk Medium 500', fontWeight: 'bold'},
});

export default styles;
