import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Chat from '../Screens/Chat';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import LoginComponent from '../Screens/Login/Login';
import ChatUsers from '../Screens/ChatUsers';
import MyTabs from './TabNavigator';
import AuthScreen from '../Screens/AuthScreen';
import SignupComponent from '../Screens/Signup/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Navigation = () => {
  const [data, setData] = useState(false);
  const [flag, setFlag] = useState(true);
  const getAsyncStorageItems = () => {
    console.log('object');
    AsyncStorage.getItem('uid')
      .then(val => {
        if (val) {
          console.log('val', val);
          setData(true);
        }
        setFlag(false);
      })
      .then(err => console.log(err));
  };
  useEffect(() => {
    getAsyncStorageItems();
    // const subscribe = auth().onAuthStateChanged(user => {
    //   console.log('user', user);
    //   if (user) {
    //     setData(true);
    //     setFlag(false);
    //   } else if (user === null) {
    //     setFlag(false);
    //   }
    // });
    // return subscribe;
  }, []);
  const Stack = createNativeStackNavigator();
  if (flag) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="AuthScreen"
        initialRouteName={data ? 'Home' : 'AuthScreen'}>
        <Stack.Screen
          name={'AuthScreen'}
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'LoginComponent'}
          component={LoginComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'SignupComponent'}
          component={SignupComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Home'}
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Chat'} component={Chat} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
