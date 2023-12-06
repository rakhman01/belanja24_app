import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import sample from '../Assets/Images/clothes.png';
import {colors, font} from '../config/constant';
import {adjust} from '../Assets/utils';
import {useEffect} from 'react';
import {useState} from 'react';
import {getDataPopular} from '../Assets/API/getAPI';
import AllLogo from '../Assets/Images/gridicon.png';

const CategoryPopular = ({props}) => {
  const [data, setData] = useState([
    {name: 'Semua Kategory', ava: AllLogo, title: 'Semua Categori'},
  ]);
  useEffect(() => {
    getDataPopular(callback => {
      const newData = [...data];

      // Menambahkan elemen-elemen dari callback ke newData
      newData.push(...callback);

      // Mengatur newData sebagai nilai baru untuk state data
      setData(newData);
    });
  }, []);
  console.log(data);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Kategori Populer</Text> */}
      {/* <View style={styles.content}>
        {[
          {name: 'BukAllLogo: '/'},
          {name: 'ClothinAllLogo: '/'},
          {name: 'Personal CarAllLogo: '/'},
          {name: 'Rumah & DapuAllLogo: '/'},
          {name: 'ElektroniAllLogo: '/'},
          {name: 'SportAllLogo: '/'},
          {name: 'Semua KategorAllLogo: '/'},
        ].map((val, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                val.name === 'Semua Kategory'
                  ? navigation.navigate('Categories')
                  : navigation.navigate('Pencarian', {
                      searchQuery: val.name,
                    })
              }
              key={index}
              style={{
                width: adjust(40),
                borderWidth: 1,
                paddingVertical: adjust(8),
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                margin: adjust(2),
                borderRadius: 5,
                borderColor: colors.grey,
              }}>
              <Image source={AllLogo} style={{width: adjust(50)}} />
              <Text
                style={{
                  fontSize: adjust(8),
                  textAlign: 'center',
                  color: 'black',
                }}>
                {val.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View> */}
      <FlatList
        style={{width: '100%'}}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              item.name === 'Semua Kategory'
                ? props.navigate('Categories')
                : props.navigate('Pencarian', {
                    searchQuery: item.title,
                  })
            }
            style={styles.menuItem}>
            {item.name === 'Semua Kategory' ? (
              <Image
                source={item.ava}
                style={{width: adjust(28), height: adjust(28)}}
              />
            ) : (
              <Image
                source={{uri: item.ava}}
                style={{width: adjust(28), height: adjust(28)}}
              />
            )}
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: adjust(8),
    marginTop: adjust(8),
  },
  title: {
    fontSize: adjust(font.size.small),
    fontWeight: '600',
    color: font.colors.fontBlack,
  },
  text: {
    fontSize: adjust(8),
    fontWeight: '400',
    marginTop: 4,
    color: font.colors.fontBlack,
  },
  menuItem: {
    width: adjust(48),
    height: adjust(64),
    marginTop: adjust(4),
    padding: 2,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  content: {
    overflow: 'scroll',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CategoryPopular;
