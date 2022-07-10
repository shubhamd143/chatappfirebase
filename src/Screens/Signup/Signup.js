import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {s, vs, ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const SignupComponent = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const onSignup = () => {
    setLoader(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('value => ', value.user.uid);
        const userData = {
          uid: value.user.uid,
          name: name,
        };
        database().ref().child('users').child('userData').push(userData);
        setLoader(false);
        navigation.navigate('LoginComponent');
      })
      .catch(error => console.log(error));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.image}
            source={require('../../Assets/Images/logo2.png')}
          />
          <Text style={styles.logoContainerText}>Ample Connect</Text>
        </View>
        <View style={styles.signupContainer}>
          <View style={styles.signupSubContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={styles.inputBox}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.inputBox}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.inputBox}
            />
            <TouchableOpacity onPress={() => onSignup()} style={styles.button}>
              {loader ? (
                <ActivityIndicator
                  color={'#032de2'}
                  animating={loader}
                  size={'large'}
                />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupComponent;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 0.8,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: s(120),
    height: vs(120),
  },
  logoContainerText: {fontSize: 30, color: '#032de2', fontWeight: '800'},
  signupContainer: {
    flex: 1.5,
    backgroundColor: '#032de2',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  signupSubContainer: {
    flex: 0.8,
    width: '92%',
    // backgroundColor: 'red',
    justifyContent: 'space-evenly',
  },
  label: {fontSize: 18, color: '#fff'},
  inputBox: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#032de2',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    height: vs(40),
    width: s(250),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
  buttonText: {fontWeight: '900', color: '#000', fontSize: 18},
});
