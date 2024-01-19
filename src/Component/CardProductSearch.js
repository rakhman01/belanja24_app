import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors, dimensions, font} from '../config/constant';
import Icon from 'react-native-vector-icons/Entypo';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const CardProduct = val => {
  return (
    <TouchableOpacity
      onPress={() => {
        val.actions(val.slug);
      }}
      style={styles.cardProduct}>
      <Image
        source={{uri: val?.img}}
        alt={'images'}
        style={styles.imagesProduct}
      />
      <View
        style={{
          padding: RFValue(5),
          display: 'flex',
        }}>
        <Text style={styles.titleProduct}>
          {val?.title.length > 20
            ? val?.title.substring(0, 23) + '...'
            : val?.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Star
            name="star-circle"
            color={colors.yellowStar}
            style={{marginRight: RFValue(1)}}
          />
          <Text style={styles.provider}>{val?.['provider.name']}</Text>
        </View>
        <View
          style={{
            marginTop: RFValue(2),
          }}>
          <Text style={styles.price}>{val?.price_f}</Text>
          {val?.discount_amount > 0 ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.discountText}>{val?.discount_amount}%</Text>
              <Text
                style={{
                  ...styles.discountText,
                  fontSize: font.size.verySmall,
                  marginLeft: RFValue(2),
                  textDecorationLine: 'line-through',
                }}>
                {val?.price_b}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: RFValue(3),
            }}>
            {/* <Text style={{fontSize: RFValue(8), color: 'black'}}>
          Stock {val?.stock === undefined ? 0 : val?.stock}
        </Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="star" color={colors.yellowStar} size={18} />
              <Text style={styles.description}>5.0</Text>
            </View>
            <Text style={styles.description}>
              terjual{' '}
              {Math.floor(Math.random() * (100 - 50 + 1)) + 20 + val?.sell}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardProduct: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: colors.primaryBlue,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(4),
    paddingVertical: RFValue(8),
    marginHorizontal: RFValue(6),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  imagesProduct: {
    width: '100%',
    height: RFValue(90),
    resizeMode: 'contain',
  },
  title: {
    fontSize: RFValue(font.size.verySmall),
    fontFamily: font.fontFamily.poppinsThin,
    color: font.colors.fontBlack,
    fontWeight: 'bold',
    marginBottom: RFValue(8),
  },

  titleProduct: {
    fontSize: RFValue(font.size.verySmall),
    fontFamily: font.fontFamily.poppinsBold,
    color: font.colors.fontGrey,
    fontWeight: 'bold',
    marginBottom: RFValue(2),
  },
  discountText: {
    fontSize: RFValue(font.size.mini),
    fontFamily: font.fontFamily.poppinsLight,
    color: font.colors.danger,
    fontWeight: '400',
    marginBottom: RFValue(2),
  },
  provider: {
    fontSize: RFValue(font.size.mini),
    fontFamily: font.fontFamily.poppinsExtraBold,
    color: font.colors.fontGrey,
    fontWeight: '400',
    marginBottom: RFValue(2),
  },

  price: {
    fontSize: RFValue(font.size.medium),
    fontFamily: font.fontFamily.poppinsLight,
    color: font.colors.fontBlack,
    fontWeight: 'bold',
    marginBottom: RFValue(4),
  },

  description: {
    fontSize: RFValue(font.size.verySmall),
    fontFamily: font.fontFamily.poppinsThin,
    color: font.colors.fontGrey,
    fontWeight: '700',
  },
});

export default CardProduct;
