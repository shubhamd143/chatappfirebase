import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Chat from '../Screens/Chat';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
const Navigation = () => {
  const [flag, setFlag] = useState(false);
  // console.log('isLogin', isLogin);
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(user => {
      console.log('user', user);
      if (user) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    });
    return subscribe;
  }, []);
  const Stack = createNativeStackNavigator();
  // console.log(isLogin);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name={'Home'} component={Chat} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
