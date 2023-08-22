import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {getConection, getMessage} from '../Assets/API/getAPI';
import {useSelector} from 'react-redux';
import {Gray, GrayMedium, adjust, blueB2C} from '../Assets/utils';
import ArrowIcon from 'react-native-vector-icons/FontAwesome5';
import {getEstablished} from '../Assets/API/getAPI';
import {postMessage} from '../Assets/API/postAPI';
import LoadingPage from '../Component/LoadingPage';

const ScreenPersonalChat = proos => {
  const seller_id = proos.route.params.seller_id;
  const token = useSelector(state => state.Authentication.isLogin.token);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [consection, setConestion] = useState(null);

  useEffect(() => {
    getConection(token, seller_id, res => {
      if (res.data.data.provider_id !== '') {
        setConestion(res.data.data);
      }
    });
  }, []);

  if (consection === null) {
    return <LoadingPage />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          proos.navigation.navigate('DetailStore', {slug: seller_id})
        }
        style={styles.cartUser}>
        <View style={{width: '10%'}}>
          <ArrowIcon name="arrow-left" size={20} color={'white'} />
        </View>
        <View
          style={{
            width: adjust(40),
            height: adjust(40),
          }}>
          <Image
            source={{uri: consection.provider_ava}}
            style={{
              width: '100%',
              height: '100%',
              // borderRadius: '50%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: adjust(4),
          }}>
          <Text
            style={{fontSize: adjust(13), fontWeight: '700', color: 'black'}}>
            {consection.provider_name}
          </Text>
          <Text style={{fontSize: adjust(10), color: 'black'}}>
            Terakhir online sejam yang lalu
          </Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            {item.is_you ? (
              <View style={styles.messageMe}>
                <Text style={styles.messageText}>{item.body}</Text>
              </View>
            ) : (
              <View style={styles.MessegeReply}>
                <Text style={{color: 'black'}}>{item.body}</Text>
              </View>
            )}
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            postMessage(
              token,
              {
                body: inputText,
                connection_id: consection.connection_id,
              },
              res => {
                if (res.data.message === 'approved') {
                  if (messages.length > 0) {
                    let pointer = messages.length - 1;
                    getMessage(
                      token,
                      {
                        id: consection.connection_id,
                        pointer_id: messages[pointer].id,
                      },
                      res => setMessages([...messages, ...res.data.data]),
                    );
                  } else {
                    getMessage(
                      token,
                      {id: consection.connection_id, pointer_id: 0},
                      res => setMessages(res.data.data),
                    );
                  }
                }
              },
            );
            setInputText('');
          }}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartUser: {
    width: '100%',
    height: adjust(60),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: adjust(8),
    backgroundColor: Gray,
  },
  messageMe: {
    display: 'flex',
    alignItems: 'flex-end',
    backgroundColor: '#EFF6FF',
    padding: adjust(8),
    borderTopWidth: 1,
    borderTopColor: Gray,
  },

  MessegeReply: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: adjust(8),
    borderTopWidth: 1,
    borderTopColor: Gray,
  },

  messageText: {
    fontSize: adjust(13),
    color: 'black',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    color: 'black',
  },
  sentText: {
    color: 'green',
  },
  receivedText: {
    color: 'black',
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScreenPersonalChat;
