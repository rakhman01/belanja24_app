import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {adjust, blueB2C, formatter, Gray, GrayMedium} from '../Assets/utils';
import {useState} from 'react';
import {addToCart} from '../Assets/API/postAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from './CheckBox';

const CardKeranjang = ({
  item,
  incrementQty,
  deleteCartItem,
  decrementQty,
  checkItem,
  checklistProduct,
}) => {
  const isCheckList = checklistProduct.map(val => val.id);
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: GrayMedium,
        marginVertical: adjust(5),
        borderRadius: adjust(5),
      }}>
      <View
        style={{
          padding: adjust(5),
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            source={{uri: item.images[0]}}
            style={{
              width: adjust(55),
              height: adjust(55),
              marginRight: adjust(5),
              resizeMode: 'contain',
            }}
          />
          <View>
            <Text
              style={{
                fontSize: adjust(10),
                fontWeight: 'bold',
                color: 'black',
              }}>
              {item.title.length > 20
                ? item.title.substring(0, item.title.length) + '...'
                : item.title}
            </Text>
            <Text
              style={{
                fontSize: adjust(10),
                fontWeight: 'bold',
                color: 'black',
              }}>
              {formatter(item.price)}
            </Text>
          </View>
        </View>

        {/* <BouncyCheckbox
          isChecked={false}
          style={{marginLeft: adjust(10)}}
          size={adjust(15)}
          fillColor={blueB2C}
          unfillColor="#FFFFFF"
          iconStyle={{borderColor: 'red'}}
          innerIconStyle={{borderWidth: 1, borderRadius: adjust(5)}}
          textStyle={{fontFamily: 'JosefinSans-Regular'}}
          onPress={e => {
            checkItem(e, item.price * item.qty, item.id);
          }}
        /> */}
        <CheckBox
          isChecked={isCheckList.includes(item.id)}
          color={blueB2C}
          onPress={() => {
            checkItem(
              !isCheckList.includes(item.id),
              item.price * item.qty,
              item.id,
            );
          }}
        />
      </View>
      <View
        style={{
          padding: adjust(5),
          borderTopWidth: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopColor: GrayMedium,
        }}>
        <View>
          <Text
            style={{fontSize: adjust(10), fontWeight: 'bold', color: 'black'}}>
            Stock: {item.stock - item.qty}
          </Text>
        </View>
        <TouchableOpacity
          onPress={deleteCartItem}
          style={{
            borderWidth: 1,
            padding: adjust(5),
            borderRadius: adjust(5),
            borderColor: 'red',
          }}>
          <Material name="trash-can" color={'red'} />
        </TouchableOpacity>
        <View
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (item.qty != 1) {
                decrementQty(item.id, item.qty - 1, item.warehouse_id);
              } else {
              }
            }}
            style={{
              borderColor: 'red',
              borderWidth: 1,
              width: adjust(20),
              height: adjust(20),
              borderRadius: adjust(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: 'red', fontWeight: 'bold', fontSize: adjust(10)}}>
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{color: 'black', fontWeight: 'bold', fontSize: adjust(10)}}>
            {item.qty}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (item.stock - item.qty != 0) {
                incrementQty(item.id, item.qty + 1, item.warehouse_id);
              }
            }}
            style={{
              borderColor: blueB2C,
              borderWidth: 1,
              width: adjust(20),
              height: adjust(20),
              borderRadius: adjust(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: blueB2C,
                fontWeight: 'bold',
                fontSize: adjust(10),
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(CardKeranjang);
