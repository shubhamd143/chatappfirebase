import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatUsers from '../../Screens/ChatUsers';
import Status from '../../Screens/Status';
import Camera from '../../Screens/Camera';
import React from "react";

const Tab = createMaterialTopTabNavigator();

function MyTabs({route}) {
  // console.log("route.params",route.params.uid)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="ChatUsers" component={ChatUsers} options={{title:"Chats"}}>
        <ChatUsers {...route.params.uid}/>
      </Tab.Screen>
      <Tab.Screen name="Status" component={Status} />
    </Tab.Navigator>
  );
}

export default MyTabs;