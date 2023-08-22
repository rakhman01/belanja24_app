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

const RegisterForm = ({props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [registLoginLoading, setRegistLoginLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{name: '', email: '', password: ''}}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          setRegistLoginLoading(true);
          RegisterBasic(
            {
              name: values.name,
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
                <Text style={styles.label}>Name</Text>
                <Text style={{color: 'red', fontSize: adjust(10)}}>
                  {errors.name}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                value={values.name}
              />
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
                <Text style={{color: 'red', fontSize: adjust(10)}}>
                  {errors.email} {errMessage}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                value={values.email}
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
                style={styles.input}
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                width: '100%',
                backgroundColor: blueB2C,
                paddingVertical: adjust(10),
                display: 'flex',
                marginTop: adjust(10),
                alignItems: 'center',
              }}>
              {registLoginLoading ? (
                <ActivityIndicator color={'white'} size={adjust(10)} />
              ) : (
                <Text
                  style={{
                    fontSize: adjust(10),
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Buat Akun
                </Text>
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
              <Text style={{color: GrayMedium, fontSize: adjust(10)}}>
                sudah punya account?
              </Text>
              <Pressable onPress={() => props.navigate('Login')}>
                <Text
                  style={{
                    color: blueB2C,
                    fontSize: adjust(10),
                    marginLeft: adjust(3),
                  }}>
                  Login
                </Text>
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
    fontWeight: '600',
    color: font.colors.disable,
  },
  commandText: {
    fontSize: adjust(font.size.small),
    fontWeight: '600',
    color: font.colors.blue,
    marginLeft: adjust(4),
  },
});

export default RegisterForm;
