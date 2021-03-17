import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
  viewtong: {paddingHorizontal: 8, backgroundColor: '#e6e6e6ff', flex: 1},
  viewbox: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
  },
  viewboxbtn: {alignItems: 'center', flexDirection: 'row'},
  txttitile: {marginLeft: 10, fontFamily: 'Poppin-Regular', fontSize: 16},
  icon: {alignSelf: 'center', marginRight: 10},
});
export default styles;
