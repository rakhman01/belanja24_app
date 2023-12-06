import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import React from 'react';
import {useEffect} from 'react';
import {getDataCart} from '../Assets/API/getAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import {useState} from 'react';
import LoadingPage from '../Component/LoadingPage';
import {blueB2C, formatter, Gray, GrayMedium} from '../Assets/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CardKeranjang from '../Component/CardKeranjang';
import {useIsFocused} from '@react-navigation/native';
import {addToCart, beliSekarang, removeToCart} from '../Assets/API/postAPI';
import {useMemo} from 'react';

const ScreenKeranjang = ({navigation}) => {
  const [dataCart, setDataCart] = useState({status: false, data: []});
  const [checklistProduct, setChecklistProduct] = useState([]);
  const token = getFromRedux('token');
  const isFocus = useIsFocused();

  useEffect(() => {
    getDataCart(token, value => {
      const data = value.map(val => {
        return {
          title: val.provider_name,
          logo: val.provider_ava,
          data: val.products,
        };
      });

      setDataCart({
        status: true,
        data,
      });
    });
  }, [isFocus]);

  const incrementQty = (id, valQty, warehouse_id) => {
    addToCart(
      {product_id: id, qty: valQty, warehouse_id: warehouse_id},
      res => {
        console.log(res);
        getDataCart(token, value => {
          const data = value.map(val => {
            return {
              title: val.provider_name,
              logo: val.provider_ava,
              data: val.products,
            };
          });
          setChecklistProduct([]);
          setDataCart({
            status: true,
            data,
          });
        });
      },
    );
  };

  const decrementQty = (id, valQty, warehouse_id) => {
    addToCart(
      {product_id: id, qty: valQty, warehouse_id: warehouse_id},
      res => {
        // console.log(res);
        getDataCart(token, value => {
          const data = value.map(val => {
            return {
              title: val.provider_name,
              logo: val.provider_ava,
              data: val.products,
            };
          });
          setChecklistProduct([]);
          setDataCart({
            status: true,
            data,
          });
        });
      },
    );
  };

  const DeleteCardItem = (product_id, cart_id) => {
    setDataCart({
      ...dataCart,
      status: false,
    });

    removeToCart(token, {product_id, cart_id}, res => {
      getDataCart(token, value => {
        const data = value.map(val => {
          return {
            title: val.provider_name,
            logo: val.provider_ava,
            data: val.products,
          };
        });
        setChecklistProduct([]);
        setDataCart({
          status: true,
          data,
        });
      });
    });
  };
  const checkItem = (status, price, id) => {
    // console.log(status, price, id);
    if (status) {
      setChecklistProduct([...checklistProduct, {id, price}]);
    } else {
      const filterTemp = checklistProduct.filter(val => val.id != id);
      setChecklistProduct(filterTemp);
    }
  };
  const calculateTotalBelanja = () => {
    if (checklistProduct.length === 0) {
      return 0;
    } else {
      const price = checklistProduct.map(val => parseFloat(val.price));
      const sum = price.reduce((acc, curr) => acc + curr, 0);

      return sum;
    }
  };
  const TotalBelanja = useMemo(
    () => calculateTotalBelanja(),
    [checklistProduct],
  );

  // console.log(checklistProduct);

  return dataCart.status ? (
    dataCart.data.length === 0 ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            marginBottom: RFValue(10),
            color: 'black',
            fontSize: RFValue(10),
          }}>
          Belum Ada Apapun di Keranjang
        </Text>
        <Button
          onPress={() => navigation.navigate('Home')}
          color={blueB2C}
          title="Mulai Berbelanja"
        />
      </View>
    ) : (
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'white', padding: RFValue(5)}}>
        <SectionList
          sections={dataCart.data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={props => {
            const {item} = props;

            return (
              <CardKeranjang
                checklistProduct={checklistProduct}
                item={item}
                incrementQty={incrementQty}
                decrementQty={decrementQty}
                deleteCartItem={() => DeleteCardItem(item.id, item.cart_id)}
                checkItem={checkItem}
              />
            );
          }}
          renderSectionHeader={props => {
            const dataHeader = props.section;
            return (
              <View
                style={{
                  backgroundColor: blueB2C,
                  padding: RFValue(5),
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: dataHeader.logo}}
                  style={{
                    width: RFValue(25),
                    height: RFValue(25),
                    borderRadius: RFValue(10),
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: RFValue(10),
                    fontWeight: 'bold',
                    marginLeft: RFValue(10),
                  }}>
                  {dataHeader.title}
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            display: 'flex',
            paddingVertical: RFValue(10),
            borderRadius: RFValue(5),
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: RFValue(10),
              fontWeight: 'bold',
            }}>
            Total Belanja : {formatter(TotalBelanja)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const product_ids = checklistProduct.map(val => val.id);
              beliSekarang({product_ids: product_ids}, res => {
                console.log(res.data.message);
                if (res.data.message === 'inquiry success') {
                  navigation.navigate('Checkout');
                } else {
                  alert(
                    'Terjadi kesalahan, Tunggu beberapa saat dan coba lagi',
                  );
                }
              });
            }}
            style={{
              backgroundColor:
                checklistProduct.length === 0 ? GrayMedium : blueB2C,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: RFValue(10),
              borderRadius: RFValue(5),
              marginTop: RFValue(5),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: RFValue(10),
                fontWeight: 'bold',
              }}>
              Beli sekarang
            </Text>
          </TouchableOpacity>
          {/* {console.log(navigation, 'navigation')} */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              backgroundColor: blueB2C,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: RFValue(10),
              borderRadius: RFValue(5),
              marginTop: RFValue(5),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: RFValue(10),
                fontWeight: 'bold',
              }}>
              Kembali Belanja
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  ) : (
    <LoadingPage />
  );
};

export default ScreenKeranjang;
