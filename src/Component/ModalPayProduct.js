import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import {
  GrayMedium,
  HeightScreen,
  WidthScreen,
  adjust,
  blueB2C,
} from '../Assets/utils';
import {beliSekarang} from '../Assets/API/postAPI';

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
                  padding: adjust(4),
                  borderWidth: 1,
                  borderColor: 'red',
                  borderRadius: adjust(8),
                }}
              />
            </View>
            <View
              style={{
                width: '60%',
                justifyContent: 'flex-end',
                paddingHorizontal: adjust(12),
              }}>
              <Text
                style={{
                  fontSize: adjust(20),
                  fontWeight: '500',
                  color: 'red',
                }}>
                {data.price_f}
              </Text>
              <Text
                style={{
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
              marginVertical: adjust(20),
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: adjust(13),
                  marginVertical: adjust(5),
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
                  paddingVertical: adjust(5),
                  paddingHorizontal: adjust(10),
                  borderRadius: adjust(5),
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: adjust(10)}}>-</Text>
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
                    fontSize: adjust(10),
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
                  paddingVertical: adjust(5),
                  paddingHorizontal: adjust(10),
                  borderRadius: adjust(5),
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: adjust(10)}}>+</Text>
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
              borderRadius: adjust(5),
              marginTop: adjust(10),
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: adjust(10),
            }}>
            <Text
              style={{
                color: blueB2C,
                fontWeight: 'bold',
                fontSize: adjust(10),
              }}>
              Beli Sekarang
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{
              borderWidth: 1,
              borderColor: 'red',
              borderRadius: adjust(5),
              marginTop: adjust(10),
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: adjust(10),
            }}>
            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                fontSize: adjust(10),
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
    height: HeightScreen * 0.4,
    padding: adjust(8),
    backgroundColor: 'white',
  },
  cartItem: {
    width: '100%',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ModalPayProduct;
