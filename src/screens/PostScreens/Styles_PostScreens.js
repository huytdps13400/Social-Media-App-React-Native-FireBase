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
  },
  btnpost: {
    marginRight: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtbtnpost: {fontSize: 18, fontFamily: 'Poppins-Bold'},
  viewboxtong: {flex: 1, backgroundColor: '#f4f4f4'},
  viewboxnho: {
    backgroundColor: 'white',
    marginTop: 8,
    paddingTop: 7,
    paddingHorizontal: 14,
    paddingBottom: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 0.5,
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  viewimgavatar: {width: 45, height: 45, borderRadius: 45},
  imgonline: {
    width: 10,
    height: 10,
    position: 'absolute',
    bottom: 0,
    left: 3,
  },
  txtname: {
    alignSelf: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  edtstatus: {height: 40, width: '100%', paddingHorizontal: 10},
  viewboxaction: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default styles;
