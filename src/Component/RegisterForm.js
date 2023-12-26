import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {adjust, blueB2C, GrayMedium} from '../Assets/utils';
import {Formik} from 'formik';
import {useState} from 'react';
import {RegisterSchema} from '../Assets/ValidationSchema';
import {RegisterBasic} from '../Assets/API/postAPI';
import {colors, font} from '../config/constant';
import ToastModal from './ToastModal';
import {RFValue} from 'react-native-responsive-fontsize';

const RegisterForm = ({props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [registLoginLoading, setRegistLoginLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{name: '', phone_no: '', email: '', password: ''}}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          setRegistLoginLoading(true);
          RegisterBasic(
            {
              name: values.name,
              phone_no: values.phone_no,
              email: values.email,
              password: values.password,
            },
            response => {
              setRegistLoginLoading(false);
              if (response.status) {
                // console.log(response.response);
                props.navigate('Login');
              } else if (!response.status && response.response.email[0]) {
                setMessage('Terjadi kesalahan ulangi setelah beberapa saat');
                setModalVisible(!modalVisible);
                // console.log(response);
              } else {
                console.log(response);
              }
            },
          );
        }}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <View style={{marginTop: adjust(10)}}>
            <View style={{marginTop: adjust(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>Name</Text>
              </View>
              <TextInput
                onChangeText={handleChange('name')}
                value={values.name}
                onBlur={handleBlur('name')}
                placeholder="Jhon Dhoe"
                placeholderTextColor={font.colors.disable}
                style={styles.input}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
            <View style={{marginTop: adjust(5)}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.label}>No HP</Text>
              </View>
              <TextInput
                onChangeText={handleChange('phone_no')}
                value={values.phone_no}
                onBlur={handleBlur('phone_no')}
                placeholder="+62..."
                placeholderTextColor={font.colors.disable}
                style={styles.input}
              />
              {touched.phone_no && errors.phone_no && (
                <Text style={styles.error}>
                  {errors.phone_no} {errMessage}
                </Text>
              )}
            </View>
            <View style={{marginTop: adjust(5)}}>
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
                <Text style={styles.error}>
                  {errors.email} {errMessage}
                </Text>
              )}
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
              </View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry={true}
                onBlur={handleBlur('password')}
                placeholder="*******"
                placeholderTextColor={font.colors.disable}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              {registLoginLoading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.buttonText}>Buat Akun</Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: adjust(5),
                justifyContent: 'center',
              }}>
              <Text style={styles.directiveText}>sudah punya account?</Text>
              <Pressable onPress={() => props.navigate('Login')}>
                <Text style={styles.commandText}>Login</Text>
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
    fontSize: adjust(font.size.small),
    fontFamily: font.fontFamily.poppinsRegular,
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
  button: {
    backgroundColor: colors.primaryBlue,
    padding: RFValue(6),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(8),
  },
  buttonText: {
    fontSize: RFValue(font.size.small),
    fontWeight: 'bold',
    fontFamily: font.fontFamily.poppinsThin,
    color: colors.white,
  },
  directiveText: {
    fontSize: adjust(font.size.small),
    fontFamily: font.fontFamily.poppinsThin,
    color: font.colors.fontBlack,
  },
  commandText: {
    fontSize: adjust(font.size.small),
    fontFamily: font.fontFamily.poppinsLight,
    color: font.colors.blue,
    marginLeft: adjust(4),
  },
  error: {
    fontSize: adjust(font.size.verySmall),
    fontFamily: font.fontFamily.poppinsRegular,
    color: font.colors.danger,
    marginLeft: adjust(4),
  },
});

export default RegisterForm;
