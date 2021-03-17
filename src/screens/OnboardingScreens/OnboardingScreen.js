import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../LoginScreens/login';
const Item = ({image, title, text}) => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={image}
        style={{
          resizeMode: 'contain',
          height: '73%',
          width: '100%',
        }}
      />
      <Text
        style={{
          paddingTop: 25,
          paddingBottom: 10,
          fontSize: 23,
          fontWeight: 'bold',
          color: '#21465b',
          alignSelf: 'center',
        }}>
        {title}
      </Text>

      <Text
        style={{
          textAlign: 'center',
          color: '#b5b5b5',
          fontSize: 15,
          paddingHorizontal: 30,
        }}>
        {text}
      </Text>
    </View>
  );
};
const OnboardingScreen = ({navigation}) => {
  const slides = [
    {
      key: 'one',
      title: 'SOCIAL MEDIA DISCOVER',
      text:
        'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
      image: require('../../assets/images/images1.png'),
    },
    {
      key: 'two',
      title: 'CONNECT STORY WITH FRIENDS',
      text:
        'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
      image: require('../../assets/images/image2.png'),
    },
    {
      key: 'three',
      title: 'MEETTING WITH FRIENDS',
      text:
        'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
      image: require('../../assets/images/images3.png'),
    },
  ];
  const renderItem = ({item}) => {
    return <Item image={item.image} title={item.title} text={item.text} />;
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{fontSize: 17, color: '#21465b', fontWeight: '200'}}>
          Done
        </Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{fontSize: 17, color: '#21465b', fontWeight: '200'}}>
          Next
        </Text>
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{fontSize: 17, color: '#21465b', fontWeight: '200'}}>
          Skip
        </Text>
      </View>
    );
  };
  const _onDone = () => {
    navigation.navigate('SplashScreens');
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      style={{backgroundColor: '#fff'}}
      activeDotStyle={{
        backgroundColor: '#21465b',
        width: 30,
      }}
      showSkipButton={true}
      onDone={_onDone}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
    />
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
