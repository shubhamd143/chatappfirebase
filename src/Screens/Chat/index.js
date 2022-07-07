import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';

const Chat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const {uid} = route.params;
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello java',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'My side1',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 3,
    //     text: 'My side2',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 4,
    //     text: 'My side2',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    database()
      .ref()
      .child('chats')
      .child('12345678')
      .on('value', snapshot => {
        let arr = [];
        snapshot.forEach(val => arr.push(val.toJSON()));
        setMessages(arr);
        // let arr = [];
        // snapshot.forEach(val => {
        //   let a = val.key;
        //   arr.push(snapshot.child(a));
        // });
        // let data = arr[1].toJSON();
        // console.log(data._id);

        // console.log(snapshot.val());
      });

    console.log('fetchMsg', messages);

    const subscribe = auth().onAuthStateChanged(user => setUser(user));
    return subscribe;
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);
  const onSend = msgArray => {
    const msg = msgArray[0];
    const myMsg = {
      ...msg,
      createdAt: new Date().toDateString(),
    };
    database().ref().child('chats').child('12345678').push(myMsg);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: uid,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
