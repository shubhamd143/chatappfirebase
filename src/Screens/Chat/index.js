import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import React, {useState, useEffect} from 'react';
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  MessageText,
} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Chat = props => {
  const [messages, setMessages] = useState([]);
  const [calling, setCalling] = useState(true);
  const [user, setUser] = useState(null);
  const route = useRoute();
  const {loginUserUid} = route.params?.loginUser;
  const {name, chatUserUid} = route.params?.chatUser;
  console.log('loginUserUid', loginUserUid);
  console.log('chatUserName', name, 'chatUserUid', chatUserUid);

  const msgDbId = loginUserUid + '-' + chatUserUid;
  const msgDbIdSwapped = chatUserUid + '-' + loginUserUid;
  useEffect(() => {
    database()
      .ref()
      .once('value', snapshot => {
        const data = snapshot.child('chats');
        if (data.hasChild(msgDbId)) {
          database()
            .ref()
            .child('chats')
            .child(msgDbId)
            .on('value', snapshot => {
              let arr = [];
              snapshot.forEach(val => arr.push(val.toJSON()));
              arr = arr.reverse();
              setMessages(arr);
            });
        } else if (data.hasChild(msgDbIdSwapped)) {
          database()
            .ref()
            .child('chats')
            .child(msgDbIdSwapped)
            .on('value', snapshot => {
              let arr = [];
              snapshot.forEach(val => arr.push(val.toJSON()));
              arr = arr.reverse();
              setMessages(arr);
            });
        } else {
          console.log('Chat not found');
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

    database()
      .ref()
      .once('value', snapshot => {
        const data = snapshot.child('chats');
        if (data.hasChild(msgDbId)) {
          database().ref().child('chats').child(msgDbId).push(myMsg);
        } else if (data.hasChild(msgDbIdSwapped)) {
          database().ref().child('chats').child(msgDbIdSwapped).push(myMsg);
        } else {
          database().ref().child('chats').child(msgDbId).push(myMsg);
          setCalling(!calling);
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
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
                    backgroundColor: '#032de2',
                  },
                  right: {
                    backgroundColor: 'maroon',
                  },
                }}
              />
            );
          }}
          onSend={messages => onSend(messages)}
          user={{
            _id: loginUserUid,
            name: name,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
