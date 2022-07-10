import {View, Text, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ms, s, vs} from 'react-native-size-matters';

const Logout = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#032de2',
          width: s(100),
          height: vs(40),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
            fontSize: 20,
            textAlign: 'center',
          }}
          onPress={() => {
            auth().signOut();
            AsyncStorage.removeItem('uid')
              .then(value => navigation.navigate('AuthScreen'))
              .catch(error => console.log('error', error));
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
