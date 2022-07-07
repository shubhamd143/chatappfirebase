import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {s, vs, ms} from 'react-native-size-matters';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(value => navigation.navigate('Home'))
      .catch(error => console.log(error));
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
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
      <Button title="Login" onPress={() => onLogin()} />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default Login;
