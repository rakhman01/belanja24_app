import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {adjust, Gray} from '../Assets/utils';
import {colors} from '../config/constant';
import Icon from 'react-native-vector-icons/Entypo';

const CardProduct = props => {
  const {actions} = props;

  return (
    <TouchableOpacity
      onPress={actions}
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: colors.grey,
        borderRadius: adjust(5),
        paddingHorizontal: adjust(4),
        paddingVertical: adjust(6),
        marginHorizontal: adjust(6),
        justifyContent: 'space-between',
        backgroundColor: colors.white,
      }}>
      <Image
        source={{uri: props.img}}
        alt={'images'}
        style={{width: '100%', height: 90, resizeMode: 'contain'}}
      />
      <View
        style={{
          padding: adjust(5),
          display: 'flex',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text
            style={{fontSize: adjust(8), color: 'black', fontWeight: 'bold'}}>
            {props.title}
          </Text>
          <Text style={{fontSize: adjust(7), color: 'black'}}>
            {props.provider}
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
            {props.price_f}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 6,
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Icon name="star" color={colors.yellowStar} />
              <Text style={{fontSize: adjust(8), color: 'black'}}>5.0</Text>
            </View>
            <Text style={{fontSize: adjust(8), color: 'black'}}>
              terjual {props.sell}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProduct;
