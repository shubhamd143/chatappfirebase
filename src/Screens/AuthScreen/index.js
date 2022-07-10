import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {s, vs, ms} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const AuthScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flex: 1.6,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: s(120),
            height: vs(120),
          }}
          source={require('../../Assets/Images/logo2.png')}
        />
        <Text style={{fontSize: 30, color: '#032de2', fontWeight: '800'}}>
          Ample Connect
        </Text>
      </View>
      <View style={styles.authButtonsContainerMain}>
        <View style={styles.authButtonsContainerChild}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginComponent')}
            style={styles.authButtons}>
            <Text style={styles.authButtonsText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupComponent')}
            style={styles.authButtons}>
            <Text style={styles.authButtonsText}>Signup</Text>
          </TouchableOpacity>
          <View style={styles.socialIconContainer}>
            <TouchableOpacity style={styles.socialIconButtons}>
              <Image
                style={{width: s(25), height: vs(25)}}
                source={require('../../Assets/Images/smartphone.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconButtons}>
              <Image
                style={{width: s(20), height: vs(20)}}
                source={require('../../Assets/Images/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconButtons}>
              <Image
                style={{width: s(20), height: vs(20)}}
                source={require('../../Assets/Images/facebook.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  authButtons: {
    backgroundColor: '#fff',
    height: vs(40),
    width: s(250),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
  authButtonsText: {
    fontWeight: '900',
    color: '#000',
    fontSize: 18,
  },
  authButtonsContainerMain: {
    flex: 1,
    backgroundColor: '#032de2',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  authButtonsContainerChild: {
    flex: 0.9,
    width: '92%',
    justifyContent: 'space-evenly',
  },
  socialIconContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  socialIconButtons: {
    backgroundColor: '#fff',
    height: vs(45),
    width: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
});
