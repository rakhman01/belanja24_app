import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useEffect} from 'react';
import {adjust, blueB2C, GrayMedium} from '../Assets/utils';
import {Formik} from 'formik';
import * as Keychain from 'react-native-keychain';
import {useState} from 'react';
import {inquiryBasic, loginBasic} from '../Assets/API/postAPI';
import DeviceInfo from 'react-native-device-info';
import {LoginSchema} from '../Assets/ValidationSchema';
import {useSelector, useDispatch} from 'react-redux';
// import {useTheme, CommonActions} from '@react-navigation/native';

import {validate} from '../Assets/API/getAPI';
import {colors, font} from '../config/constant';
import ToastModal from './ToastModal';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginForm = ({props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '963878736631-lhsfi8rphq29i7f1g855etifoofkomev.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const Login = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          DeviceInfo.getAndroidId().then(androidId => {
            setIsLoadingLogin(true);
            inquiryBasic(response =>
              loginBasic(
                {
                  device_id: androidId,
                  email: values.email,
                  inquiry_key: response.data.data,
                  password: values.password,
                  role: 'USER',
                },
                async res => {
                  if (res.status) {
                    let token = res.response;
                    await Keychain.setGenericPassword('belanja24', token);
                    console.log(token, 'token');
                    validate(valid => {
                      dispatch({type: 'setUser', data: valid.data.data});
                      setIsLoadingLogin(false);
                      props.navigate('AppStackScreen');
                    });
                  } else {
                    setMessage(res.response);
                    setModalVisible(!modalVisible);
                    setIsLoadingLogin(false);
                  }
                },
              ),
            );
          });
        }}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View style={{marginTop: adjust(10)}}>
            <View style={{marginTop: adjust(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>Email</Text>
                <Text style={{color: 'red', fontSize: adjust(10)}}>
                  {errors.email}
                </Text>
              </View>
              <TextInput
                onChangeText={handleChange('email')}
                value={values.email}
                style={styles.input}
              />
            </View>
            <View style={{marginVertical: adjust(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>Password</Text>
                <Text style={{color: 'red', fontSize: adjust(10)}}>
                  {errors.password}
                </Text>
              </View>
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry={true}
                style={styles.input}
              />
            </View>
            {/* <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'red', fontSize: adjust(10)}}>{message}</Text>
          </View> */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: adjust(4),
                marginBottom: adjust(8),
              }}>
              <Text style={styles.directiveText}>Lupa pasword?</Text>
              <Pressable onPress={() => props.navigate('ForgotPassword')}>
                <Text style={styles.commandText}>Klik disini</Text>
              </Pressable>
            </View>
            <Button title="Masuk" onPress={handleSubmit} />

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: adjust(12),
                justifyContent: 'center',
              }}>
              <Text style={styles.directiveText}>belum punya akun?</Text>
              <Pressable onPress={() => props.navigate('Register')}>
                <Text style={styles.commandText}>Daftar</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={Login}
        // disabled={false}
      />
      <ToastModal props={{modalVisible, setModalVisible, message}}></ToastModal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: adjust(font.size.small),
    fontWeight: '600',
    color: font.colors.fontBlack,
    marginBottom: adjust(4),
  },
  input: {
    borderWidth: 1,
    borderRadius: adjust(5),
    borderColor: colors.disable,
    height: 40,
    color: 'black',
    paddingHorizontal: adjust(10),
  },
  directiveText: {
    fontSize: adjust(font.size.small),
    // fontWeight: adjust(font.weight.light),
    color: font.colors.disable,
  },
  commandText: {
    fontSize: adjust(font.size.small),
    // fontWeight: adjust(font.weight.medium),
    color: font.colors.blue,
    marginLeft: adjust(4),
  },
});

export default React.memo(LoginForm);
