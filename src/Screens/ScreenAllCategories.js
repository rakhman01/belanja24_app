import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getCategories} from '../Assets/API/getAPI';
import LoadingPage from '../Component/LoadingPage';
import {Gray, GrayMedium, adjust, blueB2C} from '../Assets/utils';

const ScreenAllCategories = ({navigation}) => {
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const isFocus = useIsFocused();
  const [categories, setCategories] = useState({isLoading: true, data: []});
  const [detailCategories, setDetailCategories] = useState({
    active: false,
    data: [],
  });

  useEffect(() => {
    getCategories(isToken, val => {
      setCategories({isLoading: false, data: val.data.data});
      setDetailCategories({active: true, data: val.data.data[1].children});
    });
  }, [isFocus, categories.isLoading]);

  return categories.isLoading ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{color: 'black'}}>Categories</Text> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          // backgroundColor: blueB2C,
        }}>
        <ScrollView
          style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: 2,
          }}>
          {categories.data.map(val => (
            <TouchableOpacity
              key={val.id}
              onPress={() =>
                setDetailCategories({...detailCategories, data: val.children})
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: adjust(8),
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 2,
                borderColor: GrayMedium,
                backgroundColor: '#f0ffff',
              }}>
              <Text
                style={{
                  fontSize: adjust(10),
                  fontWeight: '300',
                  color: 'black',
                }}>
                {val.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          style={{
            width: '70%',
            paddingHorizontal: 4,
            display: 'flex',
            backgroundColor: '#f0ffff',
            // flexDirection: 'row',
            // flexWrap: 'wrap',
          }}>
          {/* {console.log(detailCategories, 'detail categories')} */}
          {detailCategories.active === true &&
            detailCategories.data.map(val => (
              <View
                key={val.id}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  marginVertical: adjust(4),
                  // backgroundColor: '#f0ffff',
                }}>
                <Text
                  style={{
                    padding: 2,
                    borderBottomWidth: 1,
                    borderBottomColor: blueB2C,
                    fontSize: adjust(13),
                    fontWeight: '350',
                    color: 'black',
                  }}>
                  {val.name}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    // backgroundColor: Gray,
                  }}>
                  {val.children.map(val => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Pencarian', {
                          searchQuery: val.name,
                        })
                      }
                      key={val.id}
                      style={{
                        width: '45%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4,
                        margin: 2,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: GrayMedium,
                        backgroundColor: '#f0f8ff',
                      }}>
                      <Text
                        style={{
                          fontSize: adjust(10),
                          fontWeight: '300',
                          color: 'black',
                        }}>
                        {val.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
      {/* <SectionList
        sections={categories.data}
        keyExtractor={({item, index}) => index}
        renderItem={({item}) => (
          <View>
            <Text style={{color: 'black'}}>Categories</Text>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ScreenAllCategories;
