import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Gray,
  Green,
  HeightScreen,
  WidthScreen,
  adjust,
  blueB2C,
} from '../Assets/utils';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFromRedux} from '../Assets/API/GetRedux';
import {useCallback} from 'react';
import {getDetailProductStore, getDetailStore} from '../Assets/API/getAPI';
import {FlatList} from 'react-native';
import LoadingPage from '../Component/LoadingPage';
import {useIsFocused} from '@react-navigation/native';

const ScreenDetailToko = props => {
  const isFocus = useIsFocused();
  const {slug} = props.route.params;
  const navigation = props.navigation;
  const istoken = useCallback(getFromRedux('token'), []);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [detailStore, setDetailStore] = useState({
    status: false,
    data: null,
  });
  const [detailProductStore, setDetailProductStore] = useState({
    status: false,
    data: null,
  });

  const LoadMoreProduct = () => {
    setLoadingMore(true);
    let pagination = page + 1;
    setPage(pagination);
    getDetailProductStore(istoken, slug, pagination, res => {
      if (res.data.hits.length !== 0) {
        setLoadingMore(false);
        setDetailProductStore({
          status: true,
          data: [...detailProductStore.data, ...res.data.hits],
        });
      } else {
        setLoadingMore(false);
        alert('data empty');
      }
    });
  };

  console.log(props);
  useEffect(() => {
    getDetailStore(istoken, slug, res => {
      setDetailStore({status: true, data: res.data.data});
    });

    getDetailProductStore(istoken, slug, page, res =>
      setDetailProductStore({
        status: true,
        data: res.data.hits,
      }),
    );
  }, [isFocus, slug]);

  console.log(detailProductStore.data);

  return (
    <SafeAreaView style={styles.container}>
      {!detailStore.status ? (
        <LoadingPage />
      ) : (
        <View style={styles.cardStore}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderBottomWidth: 2,
              paddingVertical: 4,
              borderBottomColor: Gray,
            }}>
            <Image
              style={{width: 60, height: 60, resizeMode: 'contain'}}
              source={{uri: detailStore.data.ava}}
            />
            <View style={{flex: 1, paddingHorizontal: 4}}>
              <Text
                style={{
                  fontSize: adjust(13),
                  fontWeight: '400',
                  color: 'black',
                }}>
                {detailStore.data.name}
              </Text>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: '300',
                  color: 'black',
                }}>
                {detailStore.data.address}
              </Text>
            </View>
          </View>
          <View style={styles.contact}>
            <Icon name="phone-outline" size={18} color={'black'} />
            <Text
              style={{
                fontSize: adjust(7),
                fontWeight: '400',
                color: 'black',
              }}>
              {detailStore.data.phone}
            </Text>
          </View>
          <View style={styles.contact}>
            <Icon name="email-outline" size={18} color={'black'} />
            <Text
              style={{
                fontSize: adjust(7),
                fontWeight: '400',
                color: 'black',
              }}>
              {detailStore.data.email}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 2,
              paddingVertical: 4,
              borderBottomColor: Gray,
            }}>
            <Text
              style={{
                fontSize: adjust(7),
                fontWeight: '400',
                color: 'black',
              }}>
              Tersedia di Kota:
            </Text>
            <Text
              style={{
                fontSize: adjust(7),
                padding: 4,
                borderRadius: 2,
                marginLeft: 4,
                fontWeight: '400',
                color: 'white',
                backgroundColor: Green,
              }}>
              {detailStore.data.city}
            </Text>
          </View>
          {/* <View style={{
            filter product
          }}></View> */}
          <View style={{height: HeightScreen * 0.7, paddingHorizontal: 4}}>
            <FlatList
              data={detailProductStore.data}
              numColumns={2}
              renderItem={({item}) => {
                let data = item.document;
                return (
                  <View
                    key={item.id}
                    style={{
                      width: '50%',
                      padding: adjust(5),
                    }}>
                    <TouchableOpacity
                      style={styles.CardProduct}
                      onPress={() =>
                        navigation.navigate('DetailBarang', {
                          slug: item.document.slug,
                        })
                      }>
                      <Image
                        source={{uri: data.img}}
                        alt={'images'}
                        style={{
                          width: '100%',
                          height: 90,
                          resizeMode: 'contain',
                        }}
                      />
                      <View
                        style={{
                          padding: adjust(5),
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: adjust(8),
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {data.title}
                          </Text>
                          <Text style={{fontSize: adjust(7), color: 'black'}}>
                            {data['provider.name']}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: adjust(5),
                            borderTopWidth: 1,
                            paddingTop: adjust(5),
                            // backgroundColor: 'blue',
                          }}>
                          <Text style={{fontSize: adjust(8), color: 'black'}}>
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(data.price)}
                          </Text>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: adjust(8),
                                textAlign: 'center',
                                color: 'black',
                              }}>
                              <Icon name="star" size={16} color={'#FACC15'} />
                              {data.rate}
                            </Text>
                            <Text style={{fontSize: adjust(8), color: 'black'}}>
                              terjual {data.sell}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            <TouchableOpacity
              onPress={() => LoadMoreProduct()}
              style={{
                paddingVertical: adjust(5),
                paddingHorizontal: adjust(10),
                backgroundColor: blueB2C,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              {loadingMore ? (
                <ActivityIndicator color={'white'} size={adjust(10)} />
              ) : (
                <Text
                  style={{
                    fontSize: adjust(11),
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Muat Lebih Banyak
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
    padding: adjust(5),
  },
  cardStore: {
    // width: WidthScreen * 0.9,
    padding: 4,
    borderRadius: 4,
    marginVertical: adjust(8),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingVertical: 4,
    borderBottomColor: Gray,
  },
  CardProduct: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Gray,
    borderRadius: adjust(5),
    padding: adjust(5),
    justifyContent: 'space-between',
    shadowColor: 'black',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 5,
  },
});
export default ScreenDetailToko;
