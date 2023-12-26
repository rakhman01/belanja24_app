import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Slider from '../Component/Slider';
import {adjust, blueB2C, WidthScreen} from '../Assets/utils';
import {
  getCity,
  getMostLikeProduct,
  getPopularProduct,
  getPopularStore,
  getProvinces,
} from '../Assets/API/getAPI';
import CardProduct from '../Component/CardProduct';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import {getFromRedux} from '../Assets/API/GetRedux';
import Marker from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../Component/ModalComponent';
import {Picker} from '@react-native-picker/picker';
import {postCityPreferenc} from '../Assets/API/postAPI';
import CategoryPopular from '../Component/CategoryPopular';
import ProductPopular from '../Component/ProductPopular';
import ProductSelected from '../Component/SelectedProducts';
import PopularStore from '../Component/PopularStore';
import {colors, dimensions, font} from '../config/constant';
import {RFValue} from 'react-native-responsive-fontsize';
import ContactAdmin from '../Component/ContactAdmin';

const ScreenDashboard = props => {
  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectCity, setSelectCity] = useState('GLOBAL');
  const [load, setLoad] = useState(1);
  const [dataPopular, setDataPopular] = useState({
    status: false,
    data: [],
  });

  const [dataPopularStore, setDataPopularStore] = useState({
    status: false,
    data: [],
  });
  const [dataMostLikeProduct, setDataMostLikeProduct] = useState({
    status: false,
    data: [],
  });

  const [muatbanyakLoading, setMuatBanyakLoading] = useState(false);
  const {navigation} = props;
  const token = useCallback(getFromRedux('token'), []);

  // const {
  //   Authentication: {isUser},
  // } = useSelector(state => state);

  // console.log(Authentication, 'auth');

  useEffect(() => {
    getPopularProduct(token, selectCity, val => {
      setDataPopular({
        status: true,
        data: val.data.data,
      });
    });

    getPopularStore(token, selectCity, val => {
      setDataPopularStore({
        status: true,
        data: val.data.data,
      });
    });

    getMostLikeProduct(token, load, selectCity, val => {
      setDataMostLikeProduct({
        status: true,
        data: val.data.data,
      });
    });
  }, [selectCity]);

  const LoadMoreProduct = () => {
    setMuatBanyakLoading(true);
    if (dataMostLikeProduct.data.length === 0) {
      alert('data empty');
    } else {
      setLoad(load + 1);
      getMostLikeProduct(token, load, selectCity, val => {
        setMuatBanyakLoading(false);
        console.log(val, 'value');
        setDataMostLikeProduct({
          status: true,
          data: [...dataMostLikeProduct.data, ...val.data.data],
        });
      });
    }
  };

  return !dataPopular.status &&
    !dataPopularStore.status &&
    !dataMostLikeProduct ? (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
      }}>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <Slider />
              {/* KATEGORI CONTENT */}
              <View>
                <CategoryPopular props={navigation} />
                {/* PRODUCT POPULAR CONTENT */}
                <ProductPopular props={navigation} />
                {/* PRODUCT PILIHAN */}
                <ProductSelected props={navigation} />
                {/* TOKO POPULAR CONTENT */}
                <PopularStore props={navigation} />
                {/* CONTACT ADMIN */}

                <Text
                  style={{
                    fontSize: adjust(font.size.small),
                    fontWeight: '600',
                    marginBottom: adjust(6),
                    color: font.colors.fontBlack,
                    paddingVertical: adjust(8),
                    marginHorizontal: adjust(8),
                  }}>
                  Produk Yang Mungkin Kamu Suka
                </Text>
                {dataMostLikeProduct.data.length > 0 ? null : (
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: adjust(8),
                      paddingHorizontal: adjust(6),
                      display: 'flex',
                      alignItems: 'center',
                      // backgroundColor: 'blue',
                    }}>
                    <View
                      style={{
                        width: WidthScreen * 0.5,
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../Assets/Images/popularProducts.png')}
                        style={{
                          width: adjust(100),
                          height: adjust(100),
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: adjust(13),
                          fontWeight: '300',
                          textAlign: 'center',
                          color: 'black',
                        }}>
                        Oops tidak ada produk pada kota yang dipilih, coba kota
                        lain yuk
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        }}
        numColumns={2}
        data={dataMostLikeProduct.data}
        renderItem={({item}) => {
          return dataMostLikeProduct.data.length > 0 ? (
            <View
              key={item.id}
              style={{
                width: '50%',
                height: dimensions.height * 0.32,
                paddingHorizontal: adjust(4),
                paddingVertical: adjust(6),
                marginVertical: adjust(6),
              }}>
              <CardProduct
                actions={() => {
                  navigation.push('DetailBarang', {
                    slug: item.slug,
                  });
                }}
                {...item}
              />
            </View>
          ) : null;
        }}
        keyExtractor={item => item.id}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: adjust(10),
              }}>
              <TouchableOpacity
                onPress={LoadMoreProduct}
                style={{
                  backgroundColor: colors.primaryBlue,
                  padding: RFValue(6),
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {muatbanyakLoading ? (
                  <ActivityIndicator color={'white'} />
                ) : (
                  <Text
                    style={{
                      fontSize: RFValue(font.size.mini),
                      fontWeight: 'bold',
                      fontFamily: font.fontFamily.poppinsThin,
                      color: colors.white,
                    }}>
                    Muat Lebih Banyak
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <ContactAdmin props={navigation} />
    </SafeAreaView>
  );
};

export default ScreenDashboard;
