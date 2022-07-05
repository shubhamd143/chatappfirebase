import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

const App = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello java',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'My side1',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'My side2',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'My side2',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  // database()
  //   .refFromURL('https://chatapp-fe4f5-default-rtdb.firebaseio.com/')
  //   .once()
  //   .then(value => console.log('value', value))
  //   .catch(error => console.log('error', error));

  // database()
  //   .ref('https://chatapp-fe4f5-default-rtdb.firebaseio.com/')
  //   .then(value => console.log(value))
  //   .then(err => console.log(err));

  database()
    .ref('/chats/')
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
    });

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
