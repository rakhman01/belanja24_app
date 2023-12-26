import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {adjust, blueB2C, formatter} from '../Assets/utils';
import ModalComponent from './ModalComponent';
import {CheckShipping} from '../Assets/API/postAPI';
import {getFromRedux} from '../Assets/API/GetRedux';

const CompoCheckOut = ({
  section,
  addressDefault,
  dataShipping,
  setDataShipping,
  selectShipping,
  setSelectShipping,
}) => {
  const token = getFromRedux('token');
  const [viewShipping, setViewShipping] = useState({
    status: false,
    data: {},
  });

  return (
    <View
      style={{
        // backgroundColor: blueB2C,
        borderColor: blueB2C,
        borderWidth: 1,
        padding: adjust(5),
        display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: adjust(5),
        }}>
        <Image
          source={{uri: section.logo}}
          style={{
            width: adjust(25),
            height: adjust(25),
            borderRadius: adjust(10),
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: adjust(10),
            fontWeight: 'bold',
            marginLeft: adjust(10),
          }}>
          {section.title}
        </Text>
      </View>
      <ModalComponent
        ButtonCustoms={({open}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                CheckShipping(
                  token,
                  {
                    // provider_id: section.id,
                    address_id: addressDefault.id,
                    warehouse_id: section.data[0].warehouse.id,
                  },
                  res => {
                    // console.log(res);
                    setDataShipping({
                      id: section.data[0].provider_id,
                      data: res.data.data,
                    });
                    open();
                  },
                );
              }}
              style={{
                backgroundColor: blueB2C,
                padding: adjust(5),
                borderRadius: adjust(3),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: adjust(10),
                  fontWeight: 'bold',
                }}>
                Pilih Pengiriman
              </Text>
            </TouchableOpacity>
          );
        }}
        ContentCustoms={({close}) => {
          return (
            <FlatList
              data={dataShipping.data}
              contentContainerStyle={{padding: adjust(10)}}
              renderItem={({item}) => {
                // console.log(item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      const filter = [...selectShipping];

                      filter[section.indexSection] = {
                        ...item,
                        id_provider: section.id,
                      };
                      setSelectShipping(filter);
                      close();
                      //   const filter = selectShipping.filter(
                      //     val => val.id === section.id,
                      //   );
                      //   //   console.log(filter);
                      //   setViewShipping({
                      //     status: true,
                      //     data: item,
                      //   });

                      //   if (filter.length === 0) {
                      //     console.log('ora ono');

                      //     setSelectShipping([
                      //       ...selectShipping,
                      //       {
                      //         id: section.id,
                      //         data: item,
                      //       },
                      //     ]);
                      //     close();
                      //   } else {
                      //     const filterora = selectShipping.filter(
                      //       val => val.id != section.data[0].provider_id,
                      //     );
                      //     filterora.push({
                      //       id: section.data[0].provider_id,
                      //       data: item,
                      //     });
                      //     setSelectShipping(filterora);
                      //     close();
                      //   }
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      marginBottom: adjust(5),
                      padding: adjust(5),
                    }}>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: adjust(10),
                          fontWeight: 'bold',
                        }}>
                        {item.group_f}
                      </Text>
                      <View>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: adjust(10),
                            fontWeight: 'bold',
                          }}>
                          {item.service_name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: adjust(10),
                            fontWeight: 'bold',
                          }}>
                          {item.service}
                        </Text>
                      </View>
                      {/* <Text
                        style={{
                          color: 'black',
                          fontSize: adjust(10),
                          fontWeight: 'bold',
                        }}>
                        {item.etd_f}
                      </Text> */}
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: adjust(10),
                          fontWeight: 'bold',
                        }}>
                        {formatter(item.cost)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            // <FlatList/>
          );
        }}
      />

      {selectShipping[section.indexSection] != undefined ? (
        <View style={{marginTop: adjust(5)}}>
          <Text
            style={{
              color: 'black',
              fontSize: adjust(10),
              fontWeight: 'bold',
            }}>
            {selectShipping[section.indexSection].group_f}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: adjust(10),
                fontWeight: 'bold',
              }}>
              {selectShipping[section.indexSection].service_name}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: adjust(10),
                fontWeight: 'bold',
              }}>
              {formatter(selectShipping[section.indexSection].cost)}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CompoCheckOut;
