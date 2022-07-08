import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from "@react-native-firebase/database";

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSignup = () => {

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log("value => ",value.user.uid)
        const userData = {
          uid:value.user.uid,
          name:name
        }
        database()
        .ref()
        .child("users")
        .child("userData")
        .push(userData);
        navigation.navigate('Login')
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{width: '90%'}}>
        <Text>Name</Text>
        <TextInput
          style={{borderWidth: 1}}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={{width: '90%'}}>
        <Text>Email</Text>
        <TextInput
          style={{borderWidth: 1}}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={{width: '90%'}}>
        <Text>Passowrd</Text>
        <TextInput
          style={{borderWidth: 1}}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button title="Create Account" onPress={() => onSignup()} />
      <Button
        title="Go to login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  
})