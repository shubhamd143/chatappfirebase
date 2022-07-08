import { View, Text, Button } from 'react-native'
import auth from "@react-native-firebase/auth";
import React from 'react'

const Camera = ({navigation}) => {
  return (
    <View>
      <Button title='Logout' onPress={()=>{auth().signOut(); navigation.navigate("Login")}}/>
    </View>
  )
}

export default Camera