import {StyleSheet, Text, View, SafeAreaView,Image} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import React, {useState, useEffect} from 'react';
import {GiftedChat, InputToolbar, Bubble} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';

const Chat = ({route},props) => {
  const [messages, setMessages] = useState([]);
  const [calling, setCalling] = useState(true)
  const [user, setUser] = useState(null);
  const { loginUserUid } = route.params?.loginUser;
  const { name, chatUserUid } = route.params?.chatUser;
  console.log("loginUserUid",loginUserUid)
  console.log("chatUserName",name,"chatUserUid",chatUserUid)

  const msgDbId = loginUserUid + "-" +chatUserUid;
  const msgDbIdSwapped = chatUserUid + "-" +loginUserUid;
  useEffect(() => {
    database().ref().once('value', (snapshot) => {
      const data = snapshot.child("chats"); 
      if (data.hasChild(msgDbId)) {
      database()
      .ref()
      .child('chats')
      .child(msgDbId)
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(val => arr.push(val.toJSON()));
        arr = arr.reverse()
        setMessages(arr);
      });
    }else if(data.hasChild(msgDbIdSwapped)){
      database()
      .ref()
      .child('chats')
      .child(msgDbIdSwapped)
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(val => arr.push(val.toJSON()));
        arr = arr.reverse()
        setMessages(arr);
      });
    }
      else{
        console.log("Chat not found");
      }
  });


    // database()
    //   .ref()
    //   .child('chats')
    //   .child('12345678')
    //   .on('value', snapshot => {
    //     let arr = [];
    //     snapshot.forEach(val => arr.push(val.toJSON()));
    //     arr = arr.reverse()
    //     setMessages(arr);
    //   });

    const subscribe = auth().onAuthStateChanged(user => setUser(user));
    return subscribe;
  }, [calling]);

  const onSend = msgArray => {
    const msg = msgArray[0];
    const myMsg = {
      ...msg,
      createdAt: new Date().toDateString(),
    };
    // database().ref().child('chats').child('12345678').push(myMsg);

    database().ref().once('value', (snapshot) => {
      const data = snapshot.child("chats");
      if (data.hasChild(msgDbId)) {
      database()
      .ref()
      .child('chats')
      .child(msgDbId)
      .push(myMsg);
    } else if(data.hasChild(msgDbIdSwapped)){
      database()
      .ref()
      .child('chats')
      .child(msgDbIdSwapped)
      .push(myMsg);
    }
    else{
        database().ref().child('chats').child(msgDbId).push(myMsg);
        setCalling(!calling)
    }
  });
  };


//  const onSnd = (onSendProp,text) => {
//   console.log("texttexttexttexttext",text)
//   onSendProp(messages => setMessages(previousMessages => GiftedChat.append(previousMessages, messages)))
//  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          // renderSend = {props => {
          //   return(
          //     <View style={{flex:1, backgroundColor:"white", maxWidth:"24%",alignItems:"center", justifyContent:"space-around", height:"100%", flexDirection:"row"}}>
          //       <View style={{}}>
          //         <Image style={{width:30, height:40}} source={require("./image.png")}/>
          //       </View>
          //       <View style={{}}>
          //         <Text onPress={(text)=>onSnd(props.onSend,text)} style={{fontSize:16, fontWeight:"800", color:"blue"}}>Send</Text>
          //       </View>

          //     </View>
          //   )
          // }}
          // renderInputToolbar = {props => {
          //   return(
          //     <InputToolbar />
          //   )
          // }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  left: {
                    color: 'white',
                  },
                  right: {
                    color: 'white',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: 'maroon',
                  },
                  right: {
                    backgroundColor: 'green',
                  },
                }}
              />
            );
          }}
          onSend={messages => onSend(messages)}
          user={{
            _id: loginUserUid,
            name:name
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
