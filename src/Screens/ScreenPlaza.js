import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  adjust,
  Gray,
  GrayMedium,
  HeightScreen,
  WidthScreen,
} from '../Assets/utils';
import {Picker} from '@react-native-picker/picker';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getPlaza} from '../Assets/API/getAPI';
import LoadingPage from '../Component/LoadingPage';

const ScreenPlaza = () => {
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const isFocus = useIsFocused();
  const [selectedValue, setSelectedValue] = React.useState('SEMUA KOTA');
  const [plazaData, setPlazaData] = React.useState({
    isLoading: true,
    data: null,
  });
  const [filter, setFilter] = React.useState({status: false, data: []});

  useEffect(() => {
    getPlaza(isToken, res =>
      setPlazaData({
        isLoading: false,
        data: res.data.data,
      }),
    );
  }, [isFocus]);

  return plazaData.isLoading ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: WidthScreen * 0.9,
          padding: adjust(8),
        }}>
        <Text style={{fontSize: adjust(13), fontWeight: '400', color: 'black'}}>
          Pasar Tradisional
        </Text>
        <View
          style={{
            borderRadius: 4,
            borderWidth: 1,
            marginVertical: 8,
            backgroundColor: 'white',
          }}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === 'SEMUA KOTA') {
                setSelectedValue(itemValue),
                  setFilter({status: true, data: plazaData.data});
              } else {
                setSelectedValue(itemValue);
                let arr = plazaData.data.filter(item => {
                  return item.city === itemValue;
                });
                setFilter({status: true, data: arr});
              }
            }}
            style={{
              color: 'black',
              backgroundColor: Gray,
            }}>
            <Picker.Item
              style={styles.itemPicker}
              label="SEMUA KOTA"
              value="SEMUA KOTA"
            />
            <Picker.Item
              style={styles.itemPicker}
              label="SLEMAN"
              value="SLEMAN"
            />
            <Picker.Item
              style={styles.itemPicker}
              label="YOGYAKARTA"
              value="YOGYAKARTA"
            />
          </Picker>
        </View>
        <View style={{height: HeightScreen * 0.7}}>
          <FlatList
            data={filter.status === false ? plazaData.data : filter.data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: adjust(50),
                      height: adjust(50),
                      resizeMode: 'contain',
                    }}
                    source={{uri: item.ava}}
                  />
                </View>
                <View style={{flex: 4, paddingLeft: 8}}>
                  <Text
                    style={{
                      fontSize: adjust(10),
                      color: 'black',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: adjust(8),
                      color: GrayMedium,
                    }}>
                    {item.city}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemPicker: {
    fontSize: adjust(7),
    fontWeight: '400',
  },
  card: {
    width: WidthScreen * 0.9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    borderRadius: 4,
    marginVertical: adjust(8),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default ScreenPlaza;
