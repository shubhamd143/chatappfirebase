import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Chat from '../Screens/Chat';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import ChatUsers from '../Screens/ChatUsers';
import MyTabs from "./TabNavigator"
const Navigation = () => {
  const [data, setData] = useState(false);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(user => {
      console.log('user', user);
      if (user) {
        setData(true)
        setFlag(false);
      }else if(user === null){
        setFlag(false)
      }
    });
    return subscribe;
  }, []);
  const Stack = createNativeStackNavigator();
  if(flag){
    return null;
  }
  // console.log(isLogin);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={data ? "Home" : "Login"}>
        <Stack.Screen name={'Chat'} component={Chat} />
        <Stack.Screen name={'Home'} component={MyTabs} options={{headerShown:false}} />
        {/* <Stack.Screen name={'Home'} component={ChatUsers} options={{title:"Chats"}} /> */}
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
