import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Camera = ({navigation}) => {
  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          auth().signOut();
          AsyncStorage.removeItem('uid')
            .then(value => navigation.navigate('AuthScreen'))
            .catch(error => console.log('error', error));
        }}
      />
    </View>
  );
};

export default Camera;
