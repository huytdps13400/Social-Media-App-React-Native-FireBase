import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
const SplashScreens = ({navigation}) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
        <LottieView
                    source={require('../../assets/Lottie/logodiscover.json')}
                    autoPlay
                    loop={false}
                    speed={1}
                    onAnimationFinish={() => {
                       user ? navigation.replace('MainScreens'):navigation.replace('Home');
                    }}
                />
        </View>
    )
}

export default SplashScreens
