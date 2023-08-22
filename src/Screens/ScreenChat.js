import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {adjust} from '../Assets/utils';
import {useEffect} from 'react';
import {getEstablished, getProfile} from '../Assets/API/getAPI';
import {useSelector} from 'react-redux';

const ScreenChat = props => {
  const token = useSelector(state => state.Authentication.isLogin.token);
  const navigation = props.navigation;
  const [conectionEstablished, setConectionEstablished] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getEstablished(token, res => setConectionEstablished(res));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conectionEstablished}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cardStyles}
            onPress={() =>
              navigation.navigate('PersonalChat', item.provider_id)
            }>
            <View style={{width: '20%', padding: adjust(8)}}>
              <Image
                source={{uri: item.provider_ava}}
                alt={'images product'}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  padding: adjust(4),
                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: adjust(8),
                }}
              />
            </View>
            <View
              style={{
                width: '80%',
                paddingHorizontal: adjust(4),
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Text style={styles.mediumText}>{item.provider_name}</Text>
              <Text style={styles.miniText}>
                Pesan Belum di Baca <Text>{item.unread}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardStyles: {
    width: '100%',
    height: adjust(75),
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'blue',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  mediumText: {
    fontSize: adjust(13),
    fontWeight: '700',
    color: 'black',
    marginVertical: adjust(3),
  },
  miniText: {
    fontSize: adjust(10),
    fontWeight: '400',
    color: 'black',
    marginVertical: adjust(2),
  },
});

export default ScreenChat;
