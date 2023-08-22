import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {searchQueryProduct} from '../Assets/API/getAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingPage from '../Component/LoadingPage';
import {adjust} from '../Assets/utils';
import CardProduct from '../Component/CardProduct';
const ScreenPencarian = props => {
  const [dataSearch, setDataSearch] = useState({status: false, data: []});
  const isFocus = useIsFocused();
  const isToken = getFromRedux('token');
  const {
    route: {
      params: {searchQuery},
    },
  } = props;

  const {navigation} = props;

  useEffect(() => {
    searchQueryProduct(isToken, searchQuery, res => {
      setDataSearch(res);
    });
  }, [searchQuery, isFocus]);

  return dataSearch.status ? (
    dataSearch.data.length === 0 ? (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'black', fontSize: adjust(10)}}>
          Tidak Ada Result
        </Text>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          keyExtractor={item => {
            // console.log(item.document.id);
            return item.document.id;
          }}
          data={dataSearch.data}
          numColumns={2}
          renderItem={({item}) => {
            // console.log(item);
            const {document} = item;

            return (
              <View
                style={{
                  width: '50%',
                  padding: adjust(5),
                }}>
                <CardProduct
                  actions={() => {
                    // console.log(item);
                    navigation.push('DetailBarang', {
                      slug: document.slug,
                    });
                  }}
                  {...document}
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    )
  ) : (
    <LoadingPage />
  );
};

export default ScreenPencarian;
