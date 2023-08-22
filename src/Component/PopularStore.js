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
import {getPopularStore} from '../Assets/API/getAPI';

const PopularStore = ({props}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPopularStore('GLOBAL', val => {
      setData(val.data.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Populer Store</Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                props.navigate('DetailStore', {
                  slug: item.id,
                })
              }
              style={styles.cardStore}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: adjust(48),
                    height: adjust(48),
                    borderRadius: 100,
                    padding: 10,
                    marginRight: adjust(6),
                    backgroundColor: colors.white,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}
                    source={{uri: item.ava}}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: font.size.small,
                      color: 'black',
                      fontWeight: '800',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: adjust(10),
                      color: 'black',
                    }}>
                    {item.total_product} Product ditawarkan
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: adjust(3),
                }}>
                <Text
                  style={{
                    fontSize: adjust(12),
                    fontWeight: '700',
                    color: colors.darkGrey,
                  }}>
                  {item.city}
                </Text>
                <Text
                  style={{
                    fontSize: adjust(8),
                    color: colors.darkGrey,
                  }}>
                  Bergabung {item.created_at}
                </Text>
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
    paddingVertical: adjust(8),
    paddingHorizontal: adjust(6),
  },
  cardStore: {
    width: dimensions.width * 0.6,
    paddingVertical: adjust(6),
    paddingHorizontal: adjust(6),
    borderRadius: adjust(8),
    borderWidth: 1,
    marginRight: adjust(4),
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: adjust(font.size.small),
    fontWeight: '600',
    marginBottom: adjust(6),
    color: font.colors.fontBlack,
  },
});

export default PopularStore;
