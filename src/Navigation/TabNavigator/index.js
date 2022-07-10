import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatUsers from '../../Screens/ChatUsers';
import Status from '../../Screens/Status';
import Camera from '../../Screens/Camera';
import React from 'react';
import Logout from '../../Screens/Logout';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();
const width = Dimensions.get('window').width;

const CustomTabBar = ({state, navigation}) => {
  console.log(state.index);
  return (
    <View style={{width: width, height: vs(100), backgroundColor: '#fff'}}>
      <View
        style={{
          width: '90%',
          height: vs(60),
          backgroundColor: '#fff',
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <Image
          style={{width: s(30), height: vs(30)}}
          source={require('../../Assets/Images/logo2.png')}
        />
        <Text
          style={{
            fontSize: ms(20),
            color: '#000',
            fontWeight: '700',
            paddingHorizontal: ms(10),
          }}>
          Ample Connect
        </Text>
      </View>
      <View
        style={{
          width: width,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#032de2',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottomWidth: state.index === 0 ? 4 : 0,
              borderBottomColor: '#fff',
            }}>
            <Image
              style={{width: s(18), height: s(18)}}
              source={
                state.index === 0
                  ? require('../../Assets/Images/cameraWhite.png')
                  : require('../../Assets/Images/cameraGray.png')
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatUsers')}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottomWidth: state.index === 1 ? 4 : 0,
              borderBottomColor: '#fff',
            }}>
            <Text
              style={{
                color: state.index === 1 ? '#fff' : '#E9DCC9',
                fontSize: ms(20),
              }}>
              Chats
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Status')}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottomWidth: state.index === 2 ? 4 : 0,
              borderBottomColor: '#fff',
            }}>
            <Text
              style={{
                color: state.index === 2 ? '#fff' : '#E9DCC9',
                fontSize: ms(20),
              }}>
              Status
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              borderBottomWidth: state.index === 3 ? 4 : 0,
              borderBottomColor: '#fff',
            }}>
            <Text
              style={{
                color: state.index === 3 ? '#fff' : '#E9DCC9',
                fontSize: ms(20),
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
function MyTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="ChatUsers"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen
        name="ChatUsers"
        component={ChatUsers}
        options={{title: 'Chats'}}
      />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Logout" component={Logout} />
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
    </Tab.Navigator>
  );
}

export default MyTabs;
