import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import React from 'react';
import {useState} from 'react';
import {
  blueB2C,
  Gray,
  GrayMedium,
  HeightScreen,
  logoB2CLink,
  WidthScreen,
} from '../Assets/utils';
import LoginForm from '../Component/LoginForm';
import RegisterForm from '../Component/RegisterForm';
import {useDispatch, useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';
import {
  deleteAddress,
  setPrimaryAddress,
  UpdateProfile,
} from '../Assets/API/postAPI';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getAddress, getProfile} from '../Assets/API/getAPI';
import ModalComponent from '../Component/ModalComponent';
import AddressForm from '../Component/AddressForm';
import LoadingPage from '../Component/LoadingPage';
import * as Keychain from 'react-native-keychain';

const ScreenAccount = props => {
  const [screenView, setScreenView] = useState('login');
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const isFocus = useIsFocused();
  const {navigation} = props;
  const [dataUser, setDataUser] = useState({
    ava: '',
    name: '',
    email: '',
    phone: '',
  });
  const [page, setPage] = useState('account');
  const [address, setAddress] = useState({status: true, data: []});
  const [add, setHandleRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile(isToken, profile => {
      setDataUser({
        ava: profile.ava,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });
    });
    const getToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        dispatch({
          type: 'setToken',
          data: credentials.password,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getToken();

    getAddress(isToken, setAddress);
  }, [isToken != '', address.status, isFocus]);

  const handleLogout = async () => {
    await Keychain.setGenericPassword('belanja24', 'null');
    navigation.navigate('AuthStackScreen');
    dispatch({type: 'logout'});
  };

  return isToken != null ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: RFValue(10),
      }}>
      <View
        style={{
          width: '100%',
          height: '10%',
          marginTop: RFValue(18),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgUri
          width={'100%'}
          height={'100%'}
          uri={
            dataUser.ava === null
              ? 'https://shellrean.sgp1.digitaloceanspaces.com/belanja24.com/public/ava/001.svg'
              : dataUser.ava
          }
        />
      </View>
      <Text
        style={{
          fontSize: RFValue(16),
          fontWeight: 'bold',
          color: blueB2C,
          marginTop: RFValue(8),
        }}>
        Detail Profile
      </Text>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: RFValue(8),
            marginVertical: RFValue(12),
          }}>
          <Text
            onPress={() => setPage('account')}
            style={
              page === 'account'
                ? [
                    styles.page,
                    {borderBottomColor: blueB2C, borderBottomWidth: 1},
                  ]
                : styles.page
            }>
            Setting Akun
          </Text>
          <Text
            onPress={() => setPage('address')}
            style={
              page === 'address'
                ? [
                    styles.page,
                    {borderBottomColor: blueB2C, borderBottomWidth: 1},
                  ]
                : styles.page
            }>
            Alamat Pengiriman
          </Text>
        </View>
        {page === 'account' ? (
          address.status === true ? (
            <View style={{marginTop: RFValue(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(10),
                    fontWeight: 'bold',
                    color: GrayMedium,
                  }}>
                  Name
                </Text>
              </View>
              <TextInput
                value={dataUser.name}
                onChangeText={e => {
                  setDataUser({
                    ...dataUser,
                    name: e,
                  });
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: RFValue(5),
                  borderColor: GrayMedium,
                  height: 40,
                  color: 'black',
                  paddingHorizontal: RFValue(10),
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: RFValue(10),
                }}>
                <Text
                  style={{
                    fontSize: RFValue(10),
                    fontWeight: 'bold',
                    color: GrayMedium,
                  }}>
                  Email
                </Text>
              </View>
              <TextInput
                editable={false}
                value={dataUser.email}
                style={{
                  borderWidth: 1,
                  borderRadius: RFValue(5),
                  borderColor: GrayMedium,
                  height: 40,
                  color: 'black',
                  paddingHorizontal: RFValue(10),
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: RFValue(10),
                }}>
                <Text
                  style={{
                    fontSize: RFValue(10),
                    fontWeight: 'bold',
                    color: GrayMedium,
                  }}>
                  Mobile Phone
                </Text>
              </View>
              <TextInput
                keyboardType={'phone-pad'}
                onChangeText={e => {
                  setDataUser({
                    ...dataUser,
                    phone: e,
                  });
                }}
                value={dataUser.phone}
                style={{
                  borderWidth: 1,
                  borderRadius: RFValue(5),
                  borderColor: GrayMedium,
                  height: 40,
                  color: 'black',
                  paddingHorizontal: RFValue(10),
                }}
              />
              {dataUser.name === '' || dataUser.phone === '' ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: RFValue(10),
                    backgroundColor: GrayMedium,
                    marginTop: RFValue(15),
                    borderRadius: RFValue(5),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Perbarui Profile
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    UpdateProfile(
                      isToken,
                      {
                        ava: dataUser.ava,
                        email: dataUser.email,
                        name: dataUser.name,
                        phone: dataUser.phone,
                      },
                      response => {
                        alert('update succes');
                      },
                    )
                  }
                  style={{
                    paddingVertical: RFValue(10),
                    backgroundColor: blueB2C,
                    marginTop: RFValue(15),
                    borderRadius: RFValue(5),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Perbarui Profile
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  paddingVertical: RFValue(10),
                  backgroundColor: 'red',
                  marginTop: RFValue(15),
                  borderRadius: RFValue(5),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                height: HeightScreen * 0.68,
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: 'black',
              }}>
              <LoadingPage />
            </View>
          )
        ) : address.status === true ? (
          <View style={{height: HeightScreen * 0.68}}>
            <Text
              style={{
                fontSize: RFValue(14),
                fontWeight: '400',
                color: 'black',
              }}>
              Alamat Pengiriman
            </Text>
            <FlatList
              data={address.data}
              renderItem={({item}) =>
                item.is_main === true ? (
                  <View
                    style={[
                      styles.addressCard,
                      {borderBottomWidth: 2, borderBottomColor: blueB2C},
                    ]}>
                    <View>
                      <Text style={[styles.addres, {fontWeight: '600'}]}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginVertical: RFValue(2),
                        }}>
                        <Text
                          style={[
                            styles.addres,
                            {fontWeight: '400', marginRight: RFValue(2)},
                          ]}>
                          {item.recipient_name}
                        </Text>
                        <Text style={styles.addres}>({item.phone_number})</Text>
                      </View>
                      <Text style={styles.addres}>{item.shipping_address}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={styles.addres}>{item.district}</Text>
                        <Text style={[styles.addres, {marginHorizontal: 2}]}>
                          {item.city}
                        </Text>
                        <Text style={[styles.addres, {marginHorizontal: 2}]}>
                          {item.province}
                        </Text>
                        <Text style={[styles.addres, {marginHorizontal: 2}]}>
                          {item.postal_code}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.addressCard, {flexDirection: 'row'}]}>
                    <View style={{flex: 3}}>
                      <Text style={[styles.addres, {fontWeight: '400'}]}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginVertical: RFValue(2),
                        }}>
                        <Text
                          style={[
                            styles.addres,
                            {fontWeight: '400', marginRight: RFValue(2)},
                          ]}>
                          {item.recipient_name}
                        </Text>
                        <Text style={styles.addres}>({item.phone_number})</Text>
                      </View>
                      <Text style={styles.addres}>{item.shipping_address}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={styles.addres}>{item.district}</Text>
                        <Text style={[styles.addres, {marginHorizontal: 2}]}>
                          {item.city}
                        </Text>
                        <Text style={[styles.addres, {marginHorizontal: 2}]}>
                          {item.province}
                        </Text>
                        <Text style={[styles.addres, {marginHorizontal: 2}]}>
                          {item.postal_code}
                        </Text>
                      </View>
                    </View>
                    {/* hapua */}
                    <View style={{flex: 1}}>
                      <ModalComponent
                        ButtonCustoms={open => {
                          return (
                            <TouchableOpacity onPress={() => open.open()}>
                              <Text
                                style={{
                                  fontSize: RFValue(12),
                                  color: 'black',
                                }}>
                                Hapus
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                        isTransparent={true}
                        ContainerStyleContent={{
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        ContentCustoms={close => {
                          return (
                            <View
                              style={{
                                padding: RFValue(10),
                                backgroundColor: 'white',
                                width: WidthScreen * 0.8,
                                borderRadius: RFValue(5),
                              }}>
                              <Text
                                style={{
                                  fontSize: RFValue(14),
                                  fontWeight: '400',
                                  color: 'black',
                                }}>
                                Hapus alamat yang di pilih?
                              </Text>
                              <Text
                                style={{
                                  fontSize: RFValue(12),
                                  fontWeight: '300',
                                  marginTop: RFValue(4),
                                  color: GrayMedium,
                                }}>
                                Aksi ini akan menghapus alamat yang di pilih
                                beserta data relasi yang terkait
                              </Text>
                              {/*  */}
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  marginTop: RFValue(10),
                                }}>
                                <TouchableOpacity
                                  onPress={close.close}
                                  style={{
                                    flex: 1,
                                    borderRadius: 4,
                                    backgroundColor: Gray,
                                    padding: RFValue(6),
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: RFValue(2),
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: RFValue(12),
                                      color: GrayMedium,
                                    }}>
                                    Cencel
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    deleteAddress(isToken, item.id, setAddress)
                                  }
                                  style={{
                                    flex: 1,
                                    backgroundColor: 'red',
                                    borderRadius: 4,
                                    padding: RFValue(6),
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: RFValue(2),
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: RFValue(12),
                                      color: 'white',
                                    }}>
                                    Lanjutkan
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        }}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          setPrimaryAddress(isToken, item.id, setAddress)
                        }>
                        <Text
                          style={{
                            fontSize: RFValue(10),
                            color: 'white',
                            padding: 4,
                            borderRadius: 2,
                            marginTop: 8,
                            backgroundColor: blueB2C,
                          }}>
                          Jadikan Utama
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }
              keyExtractor={item => item.id}
            />
            <ModalComponent
              ButtonCustoms={open => {
                return (
                  <TouchableOpacity
                    onPress={() => open.open()}
                    style={{
                      paddingVertical: RFValue(10),
                      backgroundColor: blueB2C,
                      marginTop: RFValue(15),
                      marginBottom: RFValue(10),
                      borderRadius: RFValue(5),
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(12),
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      Tambah Alamat
                    </Text>
                  </TouchableOpacity>
                );
              }}
              isTransparent={true}
              ContainerStyleContent={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              ContentCustoms={close => {
                return (
                  <View
                    style={{
                      padding: RFValue(10),
                      backgroundColor: 'white',
                      width: WidthScreen * 0.9,
                      borderRadius: RFValue(5),
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        color: blueB2C,
                      }}>
                      Tambah Alamat Pengiriman
                    </Text>
                    <AddressForm props={{close: close, address: setAddress}} />
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View
            style={{
              height: HeightScreen * 0.68,
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'black',
            }}>
            <LoadingPage />
          </View>
        )}
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: logoB2CLink}}
        style={{
          width: WidthScreen * 0.4,
          height: 50,
          resizeMode: 'contain',
          marginVertical: RFValue(10),
        }}
      />
      {/* SCREENVIEW */}
      <View
        style={{
          width: WidthScreen * 0.9,
          borderRadius: RFValue(10),
          // height: HeightScreen * 0.6,
          backgroundColor: 'white',
          paddingHorizontal: RFValue(15),
          paddingVertical: RFValue(15),
        }}>
        <Text
          style={{
            fontSize: RFValue(12),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          {screenView === 'login'
            ? 'Login Ke Akun Anda'
            : 'Daftarkan Akun Anda'}
        </Text>
        <Text
          style={{
            fontSize: RFValue(12),
            fontWeight: 'bold',
            color: blueB2C,
          }}>
          Selamat datang di belanja 24
        </Text>
        {/* FORM VIEW */}
        {screenView === 'register' && (
          <RegisterForm
            navigation={navigation}
            gotoLogin={() => setScreenView('login')}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blueB2C,
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#fffafa',
    shadowRadius: 10,
    shadowColor: 'black',
  },
  page: {
    fontSize: RFValue(14),
    fontWeight: '500',
    color: 'black',
  },
  addressCard: {
    width: WidthScreen * 0.9,
    padding: 4,
    borderRadius: 4,
    marginVertical: RFValue(8),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  addres: {
    fontSize: RFValue(12),
    fontWeight: '300',
    color: 'black',
  },
});

export default ScreenAccount;
