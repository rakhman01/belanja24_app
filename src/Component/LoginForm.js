import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Keychain from 'react-native-keychain';
import {useState} from 'react';
import {inquiryBasic, loginBasic} from '../Assets/API/postAPI';
import DeviceInfo from 'react-native-device-info';
import {LoginSchema} from '../Assets/ValidationSchema';
import {useDispatch} from 'react-redux';

import {validate} from '../Assets/API/getAPI';
import {colors, dimensions, font} from '../config/constant';
import ToastModal from './ToastModal';
import {RFValue} from 'react-native-responsive-fontsize';

const LoginForm = ({props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          DeviceInfo.getAndroidId().then(androidId => {
            setLoading(true);
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
                    validate(valid => {
                      dispatch({type: 'setUser', data: valid.data.data});
                      setLoading(false);
                      props.navigate('AppStackScreen');
                    });
                  } else {
                    setMessage(res.response);
                    setModalVisible(!modalVisible);
                    setLoading(false);
                  }
                },
              ),
            );
          });
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <View style={{marginTop: RFValue(10)}}>
            <View style={{marginTop: RFValue(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>Email</Text>
              </View>
              <TextInput
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={handleBlur('email')}
                placeholder="jhon@gmail.com"
                placeholderTextColor={font.colors.disable}
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <View style={{marginVertical: RFValue(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>Password</Text>
              </View>
              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={handleBlur('password')}
                placeholder="*******"
                placeholderTextColor={font.colors.disable}
                secureTextEntry={true}
                style={styles.input}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: RFValue(4),
                marginBottom: RFValue(8),
              }}>
              <Text style={styles.directiveText}>Lupa pasword?</Text>
              <Pressable onPress={() => props.navigate('ForgotPassword')}>
                <Text style={styles.commandText}>Klik disini</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            <Text
              onPress={() => props.navigate('AppStackScreen')}
              style={styles.skipText}>
              Skip Login
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: RFValue(12),
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
      <ToastModal props={{modalVisible, setModalVisible, message}}></ToastModal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: RFValue(font.size.small),
    fontFamily: font.fontFamily.poppinsRegular,
    color: font.colors.fontBlack,
    marginBottom: RFValue(4),
  },
  input: {
    borderWidth: 1,
    borderRadius: RFValue(5),
    borderColor: colors.disable,
    height: 40,
    color: 'black',
    paddingHorizontal: RFValue(10),
  },
  button: {
    backgroundColor: colors.primaryBlue,
    padding: RFValue(6),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(font.size.small),
    fontWeight: 'bold',
    fontFamily: font.fontFamily.poppinsThin,
    color: colors.white,
  },
  directiveText: {
    fontSize: RFValue(font.size.small),
    fontFamily: font.fontFamily.poppinsThin,
    color: font.colors.fontBlack,
  },
  skipText: {
    fontSize: RFValue(font.size.small),
    marginTop: RFValue(8),
    textAlign: 'center',
    fontFamily: font.fontFamily.poppinsBold,
    fontWeight: 'bold',
    color: font.colors.fontBlack,
  },
  commandText: {
    fontSize: RFValue(font.size.small),
    fontFamily: font.fontFamily.poppinsLight,
    color: font.colors.blue,
    marginLeft: RFValue(4),
  },
  error: {
    fontSize: RFValue(font.size.verySmall),
    fontFamily: font.fontFamily.poppinsRegular,
    color: font.colors.danger,
    marginLeft: RFValue(4),
  },
});

export default React.memo(LoginForm);
