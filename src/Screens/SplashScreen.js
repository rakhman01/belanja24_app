import {View, Text, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {logoB2CLink} from '../Assets/utils';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
const SplashScreen = props => {
  const dispatch = useDispatch();
  // const isAuth = useSelector(state => state.Authentication.isAuth);
  const {navigation} = props;

  useEffect(() => {
    const getToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (
          credentials.password !== 'null' &&
          credentials.password !== undefined
        ) {
          dispatch({
            type: 'setToken',
            data: credentials.password,
          });
          navigation.replace('AppStackScreen');
        } else {
          navigation.replace('AuthStackScreen');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
    // setTimeout(() => {
    //   navigation.dispatch(
    //     StackActions.replace(
    //       `${isAuth !== null ? 'AppStackScreen' : 'AuthStackScreen'}`,
    //     ),
    //   );
    // }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        alt="belanja24"
        source={{
          uri: logoB2CLink,
        }}
        style={{width: 150, height: 150, resizeMode: 'contain'}}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
