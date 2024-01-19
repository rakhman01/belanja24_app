import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {searchQueryProduct} from '../Assets/API/getAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingPage from '../Component/LoadingPage';
import {adjust} from '../Assets/utils';
import CardProductSearch from '../Component/CardProductSearch';
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
  let actions = callback => {
    return navigation.push('DetailBarang', {
      slug: callback,
    });
  };

  useEffect(() => {
    searchQueryProduct(isToken, searchQuery, res => {
      setDataSearch(res);
    });
  }, [searchQuery, isFocus]);

  return dataSearch.status ? (
    dataSearch.data.length < 1 ? (
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
            return item.document.id;
          }}
          data={dataSearch.data}
          numColumns={2}
          renderItem={({item}) => {
            let {document} = item;
            document.actions = actions;
            return (
              <View
                style={{
                  width: '50%',
                  padding: adjust(5),
                }}>
                <CardProductSearch {...document} />
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
