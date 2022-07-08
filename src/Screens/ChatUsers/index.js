import {StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import database from "@react-native-firebase/database";

const ChatUsers = (props) => {
    console.log("props",props)
    const [ userList, setUserList ] = useState([]);
    useEffect(()=>{
        database()
        .ref()
        .child('users')
        .child('userData')
        .on('value', snapshot => {
          let arr = [];
          snapshot.forEach(val => {
            // if(route.params.uid !== val.uid){
                arr.push(val.toJSON())}
            // }
        );
          setUserList(arr);
        })
    },[])
  console.log(userList)
  return (
    <SafeAreaView>
      <FlatList
      style={styles.flatlistStyle}
        data={userList}
        keyExtractor={userList.uid}
        renderItem={(item) => {
            console.log(item.item.name)

            return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate("Chat",{loginUser:{loginUserUid:route.params.uid},chatUser:{name:item.item.name,chatUserUid:item.item.uid}})
        }}>
          <View style={styles.listContainer}>
            <View style={styles.listContainerImgView}>
            <Image source={{uri:"https://i.pravatar.cc/50"}} style={{width:50,height:50, borderWidth:11,borderRadius:50}} />
            </View>
            <View style={styles.listContainerTextView}>
            <Text style={styles.listContainerText}>{item.item.name}</Text>
            <Text style={styles.listContainerLastMsg}>{item.item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        )}}
      />
    </SafeAreaView>
  );
};

export default ChatUsers;

const styles = StyleSheet.create({
  flatlistStyle:{
    marginTop:10,
  },
  listContainer: {
    width: '100%',
    height:70,
    flexDirection:"row",
    backgroundColor:"#fff",
    alignItems:"center",
    marginBottom:10,
  },
  listContainerImgView:{
    width:"20%",
    alignItems:"center"
  },
  listContainerTextView:{
    width:"100%",
  },
  listContainerText: {
    fontSize: 20,
    color:"black",
  },
});
