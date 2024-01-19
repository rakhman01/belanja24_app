import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {GrayMedium, HeightScreen, WidthScreen, blueB2C} from '../Assets/utils';
import {beliSekarang} from '../Assets/API/postAPI';
import {font} from '../config/constant';

const ModalPayProduct = ({props}) => {
  const {visible, setVisible, data, token, navigation} = props;
  const [calculateItemCart, setCalculateItemCart] = useState({
    price: '',
    stock: 0,
    qty: 1,
  });

  const BuyProduct = props => {
    let arr = [];
    arr.push(props.product_ids);
    beliSekarang(
      {product_ids: arr, qty: props.qty, warehouse_id: props.warehouse_id},
      res => {
        if (res.data.message === 'inquiry success') {
          setVisible(!visible);
          navigation.navigate('Checkout');
        } else {
          alert('error');
        }
      },
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={styles.container}>
        <View style={styles.cardView}>
          <View style={styles.cartItem}>
            <View
              style={{
                width: '40%',
              }}>
              <Image
                source={{uri: data.medias[0]}}
                alt={'images product'}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  padding: RFValue(4),
                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: RFValue(8),
                }}
              />
            </View>
            <View
              style={{
                width: '60%',
                justifyContent: 'flex-end',
                paddingHorizontal: RFValue(12),
              }}>
              <Text
                style={{
                  fontSize: RFValue(20),
                  fontWeight: '500',
                  color: 'red',
                }}>
                {data.price_f}
              </Text>
              {/* <View
                style={{
                  height: RFValue(30),
                  overflow: 'scroll',
                }}> */}
              <Text
                numberOfLines={6}
                ellipsizeMode="tail"
                style={{
                  fontSize: font.size.small,
                  color: font.colors.fontBlack,
                }}>
                {data.description}
              </Text>
              {/* </View> */}
              <Text
                style={{
                  fontSize: font.size.small,
                  fontWeight: font.weight.medium,
                  color: GrayMedium,
                }}>
                Stok: {data.stock}
              </Text>
            </View>
          </View>
          {/* Stock */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginVertical: RFValue(20),
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: font.size.medium,
                  fontWeight: font.weight.medium,
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
                <Text style={{color: 'white', fontSize: RFValue(10)}}>-</Text>
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
                  if (data.stock === calculateItemCart.qty) {
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
                <Text style={{color: 'white', fontSize: RFValue(10)}}>+</Text>
              </Pressable>
            </View>
          </View>
          {/* button */}
          <TouchableOpacity
            onPress={() =>
              BuyProduct({
                token: token,
                product_ids: data.id,
                qty: calculateItemCart.qty,
                warehouse_id: data.warehouse_id,
              })
            }
            style={{
              borderWidth: 1,
              borderColor: blueB2C,
              borderRadius: RFValue(5),
              marginTop: RFValue(10),
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: RFValue(10),
            }}>
            <Text
              style={{
                color: blueB2C,
                fontWeight: 'bold',
                fontSize: RFValue(10),
              }}>
              Beli Sekarang
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{
              borderWidth: 1,
              borderColor: 'red',
              borderRadius: RFValue(5),
              marginTop: RFValue(10),
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: RFValue(10),
            }}>
            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                fontSize: RFValue(10),
              }}>
              Batalkan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardView: {
    width: WidthScreen * 1,
    height: HeightScreen * 0.5,
    padding: RFValue(8),
    backgroundColor: 'white',
    paddingHorizontal: RFValue(6),
    paddingVertical: RFValue(8),
  },
  cartItem: {
    width: '100%',
    maxHeight: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ModalPayProduct;
