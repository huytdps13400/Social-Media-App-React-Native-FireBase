import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {paddingTop: 50, flex: 1},
  iconsetting: {alignSelf: 'flex-end', marginRight: 27},
  boxprofile: {paddingHorizontal: 28, flexDirection: 'row'},
  imgavatar: {
    height: 121,
    width: 121,
    borderRadius: 121 / 2,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  btneditprofile: {
    backgroundColor: '#2FBBF0',
    height: 23,
    width: 83,
    alignSelf: 'center',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  txteditprofile: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppin-Regular',
  },
  boxprofileuser: {marginLeft: 20, paddingVertical: 20},
  txtname: {fontSize: 21, fontFamily: 'Poppins-Bold', fontWeight: '700'},
  txtemail: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: '100',
    marginTop: 5,
    color: '#7A8FA6',
  },
  txtphone: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: '100',
    marginTop: 5,
    color: '#7A8FA6',
  },
  txttrangthai: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    fontWeight: '100',
    marginTop: 5,
    color: '#7A8FA6',
  },
  boxflow: {
    marginTop: 25,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    marginHorizontal: 36,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 11,
  },
  boxpost: {alignItems: 'center', flex: 1},
  txtslpost: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#1B1B1B',
  },
  txtpost: {fontSize: 13, fontFamily: 'Poppins-Regular', color: '#7A8FA6'},
  containers: {paddingTop: 30, flex: 1, backgroundColor: 'white'},
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
});

export default styles;
