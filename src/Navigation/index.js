import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Chat from '../Screens/Chat';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name={'Home'} component={Chat} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
