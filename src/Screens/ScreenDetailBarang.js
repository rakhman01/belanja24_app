import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useEffect} from 'react';
import {
  getDetailProduct,
  getRelatedProduct,
  getReview,
  getSummaryReview,
} from '../Assets/API/getAPI';
import {useState} from 'react';
import {
  blueB2C,
  formatter,
  Gray,
  GrayMedium,
  Green,
  HeightScreen,
  WidthScreen,
} from '../Assets/utils';
import {SafeAreaView} from 'react-native-safe-area-context';
import CardProduct from '../Component/CardProduct';
import LoadingPage from '../Component/LoadingPage';
import ModalComponent from '../Component/ModalComponent';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import {useMemo} from 'react';
import {useCallback} from 'react';
import {addToCart, beliSekarang} from '../Assets/API/postAPI';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarImage from 'react-native-vector-icons/FontAwesome';
import UserImage from 'react-native-vector-icons/FontAwesome5';
import Cart from 'react-native-vector-icons/MaterialIcons';
import Chat from 'react-native-vector-icons/Ionicons';
import ModalPayProduct from '../Component/ModalPayProduct';
import Bag from 'react-native-vector-icons/SimpleLineIcons';
import {dimensions, font} from '../config/constant';

export default function ScreenDetailBarang(props) {
  const [detailBarang, setDetailBarang] = useState({
    isLoading: true,
    data: null,
  });

  const {navigation} = props;
  const [relatedProduct, setRelatedProduct] = useState({
    isLoading: true,
    data: null,
  });

  const [calculateItemCart, setCalculateItemCart] = useState({
    price: '',
    stock: 0,
    qty: 1,
  });

  const [summaryReview, setSummaryReview] = useState({
    isLoading: true,
    data: null,
  });

  const [review, setReview] = useState({
    isLoading: true,
    data: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBuy, setModalBuy] = useState(false);
  const [token, setToken] = useState('');

  const {
    route: {
      params: {slug},
    },
  } = props;

  const {
    route: {
      params: {id},
    },
  } = props;
  // const token = useCallback(getFromRedux('token'), []);
  const isFocus = useIsFocused();

  useEffect(() => {
    const getToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        console.log(credentials);
        if (
          credentials.password !== 'null' &&
          credentials.password !== undefined
        ) {
          setToken(credentials.password);
        } else {
          setToken('');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
    getDetailProduct(token, slug, barang => {
      setDetailBarang({
        isLoading: false,
        data: barang.data.data,
      });
      setCalculateItemCart({
        ...calculateItemCart,
        price: barang.data.data.price,
        stock: barang.data.data.stock,
      });
    });

    getRelatedProduct(token, slug, related =>
      setRelatedProduct({
        isLoading: false,
        data: related.data.data,
      }),
    );

    if (detailBarang.data !== null) {
      getSummaryReview(
        token,
        detailBarang.data.id,
        async summaryReview =>
          await setSummaryReview({
            isLoading: false,
            data: summaryReview.data.data,
          }),
      );

      getReview(
        token,
        detailBarang.data.id,
        async review =>
          await setReview({
            isLoading: false,
            data: review.data.data,
          }),
      );
    }
  }, [isFocus, detailBarang.id]);

  const calculateStock = useMemo(() => {
    return calculateItemCart.stock - calculateItemCart.qty;
  }, [calculateItemCart.qty, calculateItemCart.stock]);
  const calculatePrice = useMemo(() => {
    return parseInt(calculateItemCart.price) * calculateItemCart.qty;
  }, [calculateItemCart.price, calculateItemCart.qty]);

  return detailBarang.isLoading ||
    (detailBarang.data === null && relatedProduct.isLoading) ||
    relatedProduct.data === null ? (
    <LoadingPage />
  ) : (
    // <ScrollView>

    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', padding: RFValue(5)}}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <View>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    padding: RFValue(5),
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: RFValue(5),
                  }}>
                  <Image
                    style={{
                      width: WidthScreen * 0.6,
                      height: HeightScreen * 0.2,
                      resizeMode: 'contain',
                    }}
                    source={{uri: detailBarang.data.medias[0]}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: RFValue(15),
                    fontWeight: 'bold',
                    color: blueB2C,
                    marginVertical: RFValue(5),
                  }}>
                  {detailBarang.data.title}
                </Text>
                <View
                  style={{
                    display: 'flex',

                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: 'bold',
                      color: GrayMedium,
                      marginVertical: RFValue(5),
                    }}>
                    {detailBarang.data.price_b}
                  </Text>
                  <Text
                    style={{
                      color: GrayMedium,
                      marginLeft: RFValue(5),
                      fontSize: RFValue(10),
                    }}>
                    stock {detailBarang.data.stock}
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    paddingVertical: RFValue(5),
                    borderBottomWidth: 1,
                    borderBottomColor: GrayMedium,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: 'bold',
                      color: GrayMedium,
                      marginVertical: RFValue(5),
                    }}>
                    Deskripsi
                  </Text>
                </View>
                <Text
                  style={{
                    marginVertical: RFValue(5),
                    fontSize: RFValue(10),
                    color: GrayMedium,
                    marginVertical: RFValue(5),
                  }}>
                  {detailBarang.data.description}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    paddingVertical: RFValue(5),
                    borderBottomWidth: 1,
                    borderBottomColor: GrayMedium,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: 'bold',
                      color: GrayMedium,
                      marginVertical: RFValue(5),
                    }}>
                    Info Toko
                  </Text>
                </View>
                {/* Card Store */}
                <View
                  style={{
                    width: WidthScreen * 0.9,
                    borderColor: GrayMedium,
                    paddingHorizontal: RFValue(7),
                    paddingVertical: RFValue(2),
                    marginVertical: RFValue(6),
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailStore', {
                        slug: detailBarang.data.provider.id,
                      })
                    }
                    style={{
                      width: '50%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: RFValue(32),
                        height: RFValue(32),
                        resizeMode: 'contain',
                      }}
                      source={{uri: detailBarang.data.provider.ava}}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: RFValue(58),
                        padding: RFValue(4),
                        marginLeft: RFValue(2),
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(13),
                          color: GrayMedium,
                          fontWeight: '800',
                        }}>
                        {detailBarang.data.provider.name.length > 14
                          ? detailBarang.data.provider.name.substring(0, 11) +
                            '...'
                          : detailBarang.data.provider.name}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Bag name="bag" size={20} color={'black'} />
                        <Text
                          style={{
                            fontSize: RFValue(9),
                            color: GrayMedium,
                          }}>
                          Kunjungi toko
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{width: '50%'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          color: GrayMedium,
                        }}>
                        Penilaian{' '}
                        <Text
                          style={{
                            fontSize: RFValue(10),
                            color: blueB2C,
                          }}>
                          {detailBarang.data.provider.total_review}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          color: GrayMedium,
                        }}>
                        Produk{' '}
                        <Text
                          style={{
                            fontSize: RFValue(10),
                            color: blueB2C,
                          }}>
                          {detailBarang.data.provider.total_product}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontSize: RFValue(10),
                          color: GrayMedium,
                        }}>
                        Bergabung{' '}
                        <Text
                          style={{
                            fontSize: RFValue(10),
                            color: blueB2C,
                          }}>
                          {detailBarang.data.provider.created_at}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Ratting */}
                <View>
                  <View
                    style={{
                      paddingVertical: RFValue(5),
                      borderBottomWidth: 1,
                      borderBottomColor: GrayMedium,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(12),
                        fontWeight: 'bold',
                        color: GrayMedium,
                        marginVertical: RFValue(5),
                      }}>
                      Ratting
                    </Text>
                  </View>

                  <View
                    style={{
                      width: WidthScreen * 0.4,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 4,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        marginRight: 4,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      {[...Array(5).keys()].map(val => (
                        <StarImage
                          // onPress={() => setRatting(val + 1)}
                          name="star"
                          size={12}
                          color={'#FACC15'}
                          key={val}
                        />
                      ))}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: RFValue(10),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      {summaryReview.data !== null &&
                        summaryReview.data.avg_rate}{' '}
                      out of 5
                    </Text>
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: RFValue(10),
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {summaryReview.data !== null &&
                      summaryReview.data.total_review}{' '}
                    global ratings
                  </Text>
                  {/* jumlah pengulas */}
                  <View
                    style={{
                      width: WidthScreen * 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      5 star
                    </Text>
                    <View
                      style={{
                        width: '50%',
                        padding: 3,
                        borderRadius: 10,
                        backgroundColor: '#FACC15',
                        marginHorizontal: 8,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      50%
                    </Text>
                  </View>
                  <View
                    style={{
                      width: WidthScreen * 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      4 star
                    </Text>
                    <View
                      style={{
                        width: '50%',
                        padding: 3,
                        borderRadius: 10,
                        backgroundColor: '#FACC15',
                        marginHorizontal: 8,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      50%
                    </Text>
                  </View>
                  <View
                    style={{
                      width: WidthScreen * 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      3 star
                    </Text>
                    <View
                      style={{
                        width: '50%',
                        padding: 3,
                        borderRadius: 10,
                        backgroundColor: '#FACC15',
                        marginHorizontal: 8,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      50%
                    </Text>
                  </View>
                  <View
                    style={{
                      width: WidthScreen * 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      2 star
                    </Text>
                    <View
                      style={{
                        width: '50%',
                        padding: 3,
                        borderRadius: 10,
                        backgroundColor: '#FACC15',
                        marginHorizontal: 8,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      50%
                    </Text>
                  </View>
                  <View
                    style={{
                      width: WidthScreen * 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      1 star
                    </Text>
                    <View
                      style={{
                        width: '50%',
                        padding: 3,
                        borderRadius: 10,
                        backgroundColor: '#FACC15',
                        marginHorizontal: 8,
                      }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontSize: RFValue(7),
                        fontWeight: 'bold',
                        color: GrayMedium,
                      }}>
                      50%
                    </Text>
                  </View>
                  {/* Summary */}
                  {review.data !== null && (
                    <FlatList
                      data={review.data}
                      renderItem={({item}) => (
                        <View
                          style={{
                            width: WidthScreen * 0.7,
                            padding: 6,
                            borderRadius: 4,
                            marginVertical: RFValue(8),
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOffset: {width: 1, height: 1},
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            elevation: 5,
                          }}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}>
                            <UserImage
                              name="user-circle"
                              size={20}
                              color="black"
                            />
                            <View style={{marginLeft: 4}}>
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: RFValue(10),
                                  fontWeight: 'bold',
                                  color: 'black',
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: RFValue(7),
                                  fontWeight: 'bold',
                                  color: GrayMedium,
                                }}>
                                Joined on {item.joined_date}
                              </Text>
                            </View>
                          </View>
                          {/*  */}
                          <View
                            style={{
                              marginRight: 4,
                              marginVertical: 4,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {[...Array(5).keys()].map(val => (
                              <StarImage
                                // onPress={() => setRatting(val + 1)}
                                name="star"
                                size={12}
                                color={val + 1 <= item.rate ? '#FACC15' : Gray}
                                key={val}
                              />
                            ))}
                          </View>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: RFValue(7),
                              fontWeight: '300',
                              color: GrayMedium,
                            }}>
                            Reviewed on {item.reviewed_at}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: RFValue(7),
                              fontWeight: '300',
                              color: GrayMedium,
                            }}>
                            {item.body}
                          </Text>
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  paddingVertical: RFValue(8),
                }}>
                {/* add product */}
                {token !== '' ? (
                  <View
                    style={{
                      // position: 'absolute',
                      width: '100%',
                      // height: dimensions.height * 0.2,
                      // bottom: 0,
                    }}>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            padding: RFValue(10),
                            backgroundColor: 'white',
                            width: WidthScreen * 0.8,
                            borderRadius: RFValue(5),
                          }}>
                          {/* IMAGES PREVIEW */}
                          <View
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                width: WidthScreen * 0.5,
                                height: HeightScreen * 0.2,
                                resizeMode: 'contain',
                              }}
                              source={{uri: detailBarang.data.medias[0]}}
                            />
                          </View>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: font.size.small,
                              fontWeight: font.weight.light,
                            }}>
                            {detailBarang.data.description}
                          </Text>
                          {/* STOCK AND HARGA */}
                          <View
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: RFValue(10),
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: RFValue(13),
                              }}>
                              {formatter(calculatePrice)}
                            </Text>
                            <Text
                              style={{
                                color: GrayMedium,
                                fontSize: RFValue(10),
                              }}>
                              stock {calculateStock}
                            </Text>
                          </View>

                          {/* ATUR JUMLAH */}
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: RFValue(10),
                                  marginVertical: RFValue(5),
                                }}>
                                Atur Jumlah
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                              }}>
                              <Pressable
                                onPress={() => {
                                  if (calculateItemCart.qty === 1) {
                                  } else {
                                    setCalculateItemCart({
                                      ...calculateItemCart,
                                      qty: calculateItemCart.qty - 1,
                                    });
                                  }
                                }}
                                style={{
                                  backgroundColor: 'red',
                                  paddingVertical: RFValue(5),
                                  paddingHorizontal: RFValue(10),
                                  borderRadius: RFValue(5),
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: RFValue(10),
                                  }}>
                                  -
                                </Text>
                              </Pressable>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: RFValue(10),
                                  }}>
                                  {calculateItemCart.qty}
                                </Text>
                              </View>
                              <Pressable
                                onPress={() => {
                                  if (
                                    calculateItemCart.stock ===
                                    calculateItemCart.qty
                                  ) {
                                  } else {
                                    setCalculateItemCart({
                                      ...calculateItemCart,
                                      qty: calculateItemCart.qty + 1,
                                    });
                                  }
                                }}
                                style={{
                                  backgroundColor: blueB2C,
                                  paddingVertical: RFValue(5),
                                  paddingHorizontal: RFValue(10),
                                  borderRadius: RFValue(5),
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: RFValue(10),
                                  }}>
                                  +
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                          {/* BUTTON MASUKAN KERANJANG DAN BATAL */}
                          <ModalComponent
                            ButtonCustoms={props => {
                              const SubModal = props.open;
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    addToCart(
                                      {
                                        product_id: detailBarang.data.id,
                                        qty: calculateItemCart.qty,
                                        warehouse_id:
                                          detailBarang.data.warehouse_id,
                                      },
                                      response => {
                                        if (!response) {
                                          alert(
                                            'terjadi kesalahan coba kembali setelah beberapa saat',
                                          );
                                        } else {
                                          SubModal();
                                        }
                                      },
                                    );
                                  }}
                                  style={{
                                    borderWidth: 1,
                                    borderColor: blueB2C,
                                    borderRadius: RFValue(5),
                                    marginTop: RFValue(15),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: RFValue(5),
                                  }}>
                                  <Text
                                    style={{
                                      color: blueB2C,
                                      paddingVertical: RFValue(4),
                                      fontWeight: 'bold',
                                      fontSize: RFValue(10),
                                    }}>
                                    + Keranjang
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                            isTransparent={true}
                            ContainerStyleContent={{
                              flex: 1,
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              justifyContent: 'center',
                              alignItems: 'center',
                              // backgroundColor: 'red',
                            }}
                            ContentCustoms={props => {
                              const subClose = props.close;
                              return (
                                <View
                                  style={{
                                    backgroundColor: 'white',
                                    width: WidthScreen * 0.8,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: RFValue(5),
                                    borderRadius: RFValue(5),
                                  }}>
                                  <MaterialIcons
                                    name="add-shopping-cart"
                                    size={RFValue(40)}
                                    color={Green}
                                  />
                                  <Text
                                    style={{
                                      color: GrayMedium,
                                      fontWeight: 'bold',
                                      fontSize: RFValue(10),
                                      marginVertical: RFValue(10),
                                    }}>
                                    Product Berhasil Dimasukan Ke Dalam
                                    Keranjang
                                  </Text>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      // justifyContent: 'space-between',
                                    }}>
                                    <TouchableOpacity
                                      onPress={() =>
                                        navigation.navigate('Home')
                                      }
                                      style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: blueB2C,
                                        padding: RFValue(1),
                                        borderRadius: RFValue(5),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: RFValue(2),
                                      }}>
                                      <Text
                                        style={{
                                          color: blueB2C,
                                          fontSize: RFValue(10),
                                          marginVertical: RFValue(10),
                                        }}>
                                        Lanjut Belanja
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() => {
                                        navigation.navigate('Keranjang');
                                        setModalVisible(!modalVisible);
                                      }}
                                      style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: Green,
                                        padding: RFValue(1),
                                        borderRadius: RFValue(5),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginLeft: RFValue(2),
                                      }}>
                                      <Text
                                        style={{
                                          color: Green,
                                          fontSize: RFValue(10),
                                          marginVertical: RFValue(10),
                                        }}>
                                        Lihat Keranjang
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            }}
                          />

                          <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{
                              borderWidth: 1,
                              borderColor: 'red',
                              borderRadius: RFValue(5),
                              marginTop: RFValue(10),
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingVertical: RFValue(5),
                            }}>
                            <Text
                              style={{
                                color: 'red',
                                fontWeight: 'bold',
                                paddingVertical: RFValue(4),
                                fontSize: RFValue(10),
                              }}>
                              Batalkan
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                    <ModalPayProduct
                      props={{
                        visible: modalBuy,
                        setVisible: setModalBuy,
                        data: detailBarang.data,
                        token: token,
                        navigation: navigation,
                      }}
                    />
                    <View
                      style={{
                        // position: 'absolute',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        // bottom: 0,
                      }}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={[
                          styles.buttonCheckout,
                          {
                            // borderTopLeftRadius: RFValue(8),
                            // borderBottomLeftRadius: RFValue(8),
                            borderRightWidth: 1,
                            borderRightColor: 'white',
                          },
                        ]}>
                        {/* <Cart
                          name="add-shopping-cart"
                          size={24}
                          color={'white'}
                        /> */}
                        <Text style={styles.buttonTitle}> keranjang</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PersonalChat', {
                            seller_id: detailBarang.data.provider_id,
                          })
                        }
                        style={styles.buttonCheckout}>
                        {/* <Chat
                          name="ios-chatbubble-ellipses-outline"
                          size={24}
                          color={'white'}
                        /> */}
                        <Text style={styles.buttonTitle}> Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setModalBuy(true)}
                        style={[
                          styles.buttonCheckout,
                          {
                            // borderTopRightRadius: RFValue(8),
                            // borderBottomRightRadius: RFValue(8),
                            borderRightWidth: 1,
                            borderLeftColor: 'white',
                          },
                        ]}>
                        <Text style={styles.buttonTitle}> Beli</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <ModalComponent
                    ButtonCustoms={({open}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => console.log(open())}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: RFValue(8),
                            backgroundColor: blueB2C,
                            borderRadius: RFValue(5),
                          }}>
                          <Text style={{color: 'white'}}> Pesan Sekarang</Text>
                        </TouchableOpacity>
                      );
                    }}
                    isTransparent={true}
                    ContainerStyleContent={{
                      flex: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                    }}
                    ContentCustoms={({close}) => {
                      return (
                        <View
                          style={{
                            padding: RFValue(10),
                            backgroundColor: 'white',
                            width: WidthScreen * 0.8,
                            borderRadius: RFValue(5),
                          }}>
                          <Text
                            style={{
                              fontSize: RFValue(12),
                              fontWeight: 'bold',
                              color: GrayMedium,
                              marginBottom: RFValue(10),
                            }}>
                            Login Untuk Mulai Berbelanja?
                          </Text>
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <TouchableOpacity
                              onPress={close}
                              style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: 'red',
                                padding: RFValue(5),
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: RFValue(2),
                              }}>
                              <Text
                                style={{fontSize: RFValue(10), color: 'red'}}>
                                Cencel
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => navigation.navigate('Login')}
                              style={{
                                flex: 1,
                                backgroundColor: blueB2C,
                                padding: RFValue(5),
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: RFValue(2),
                              }}>
                              <Text
                                style={{fontSize: RFValue(10), color: 'white'}}>
                                Ke Menu Login
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: font.size.medium,
                  fontWeight: font.weight.medium,
                  color: font.colors.fontBlack,
                  marginTop: RFValue(8),
                }}>
                Produk Serupa
              </Text>
            </View>
          );
        }}
        data={relatedProduct.data}
        numColumns={2}
        contentContainerStyle={{backgroundColor: 'white'}}
        renderItem={({item}) => {
          return (
            <View
              key={item.id}
              style={{
                width: '50%',
                padding: RFValue(5),
              }}>
              <CardProduct props={{...item, navigation}} />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonCheckout: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFValue(4),
    backgroundColor: blueB2C,
    borderWidth: 1,
    borderColor: 'white',
    // borderRadius: RFValue(5),
  },

  buttonTitle: {
    fontSize: RFValue(13),
    color: 'white',
    fontWeight: '800',
  },
});
