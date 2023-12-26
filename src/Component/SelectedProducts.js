import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {colors, dimensions, font} from '../config/constant';
import {getSelectedProduct} from '../Assets/API/getAPI';
import Icon from 'react-native-vector-icons/Entypo';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const ProductSelected = ({props}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSelectedProduct(val => {
      setData(val.data.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Produk Pilihan</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                props.push('DetailBarang', {
                  slug: item.slug,
                });
              }}
              style={styles.cardProduct}>
              <Image
                source={{uri: item.img}}
                alt={'images'}
                style={styles.imagesProduct}
              />
              <View
                style={{
                  padding: RFValue(5),
                  display: 'flex',
                }}>
                <Text style={styles.titleProduct}>
                  {item.title.length > 20
                    ? item.title.substring(0, 23) + '...'
                    : item.title}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Star
                    name="star-circle"
                    color={colors.yellowStar}
                    style={{marginRight: RFValue(1)}}
                  />
                  <Text style={styles.provider}>{item.provider}</Text>
                </View>
                <View
                  style={{
                    marginTop: RFValue(2),
                  }}>
                  <Text style={styles.price}>{item.price_f}</Text>
                  {item.discount_amount > 0 ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.discountText}>
                        {item.discount_amount}%
                      </Text>
                      <Text
                        style={{
                          ...styles.discountText,
                          fontSize: font.size.verySmall,
                          marginLeft: RFValue(2),
                          textDecorationLine: 'line-through',
                        }}>
                        {item.price_b}
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
                    Stock {props.stock === undefined ? 0 : props.stock}
                  </Text> */}
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="star" color={colors.yellowStar} />
                      <Text style={styles.description}>5.0</Text>
                    </View>
                    <Text style={styles.description}>
                      terjual{' '}
                      {Math.floor(Math.random() * (100 - 50 + 1)) +
                        20 +
                        item.sell}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: RFValue(8),
    marginTop: RFValue(8),
  },
  content: {
    width: '100%',
    height: dimensions.height * 0.32,
    paddingVertical: RFValue(3),
    paddingHorizontal: RFValue(2),
    backgroundColor: colors.grey,
  },
  cardProduct: {
    width: dimensions.width * 0.4,
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
    fontSize: RFValue(font.size.mini),
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
    fontSize: RFValue(font.size.small),
    fontFamily: font.fontFamily.poppinsLight,
    color: font.colors.fontBlack,
    fontWeight: 'bold',
    marginBottom: RFValue(4),
  },

  description: {
    fontSize: RFValue(font.size.mini),
    fontFamily: font.fontFamily.poppinsThin,
    color: font.colors.fontGrey,
    fontWeight: '700',
  },
});

export default ProductSelected;
