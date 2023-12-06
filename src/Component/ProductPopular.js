import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {adjust} from '../Assets/utils';
import {colors, dimensions, font} from '../config/constant';
import {getPopularProduct} from '../Assets/API/getAPI';
import Icon from 'react-native-vector-icons/Entypo';

const ProductPopular = ({props}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPopularProduct('GLOBAL', val => {
      setData(val.data.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Produk Populer</Text>
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
                    style={{
                      fontSize: adjust(8),
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: adjust(7), color: 'black'}}>
                    {item.provider}
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
                    {item.price_f}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 6,
                    }}>
                    {/* <Text style={{fontSize: adjust(8), color: 'black'}}>
                    Stock {props.stock === undefined ? 0 : props.stock}
                  </Text> */}
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Icon name="star" color={colors.yellowStar} />
                      <Text style={{fontSize: adjust(8), color: 'black'}}>
                        5.0
                      </Text>
                    </View>
                    <Text style={{fontSize: adjust(8), color: 'black'}}>
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
    paddingHorizontal: adjust(8),
    marginTop: adjust(8),
  },
  content: {
    width: '100%',
    height: dimensions.height * 0.35,
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(6),
    backgroundColor: colors.grey,
  },
  cardProduct: {
    width: dimensions.width * 0.4,
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: adjust(5),
    paddingHorizontal: adjust(4),
    paddingVertical: adjust(6),
    marginHorizontal: adjust(6),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: adjust(font.size.small),
    fontWeight: '600',
    marginBottom: adjust(6),
    color: font.colors.fontBlack,
  },
  text: {
    fontSize: adjust(8),
    fontWeight: '400',
    marginTop: 4,
    color: font.colors.fontBlack,
  },
});

export default ProductPopular;
