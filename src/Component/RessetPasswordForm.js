import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, font} from '../config/constant';
import {adjust} from '../Assets/utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RessetPassword} from '../Assets/API/postAPI';
import ToastModal from './ToastModal';

const RessetPasswordForm = ({props}) => {
  let {navigation, route} = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{password: '', confirm_password: ''}}
        validationSchema={() =>
          Yup.object().shape({
            password: Yup.string()
              .min(8, 'Password to Short')
              .required('Required'),
            confirm_password: Yup.string()
              .min(8, 'Password to Short')
              .required('Required'),
          })
        }
        onSubmit={values => {
          RessetPassword(
            {
              password: values.password,
              reference_id: route.params.params,
            },
            async val => {
              let response = await val;
              if (response.message === 'Approved') {
                navigation.navigate('Login');
              } else {
                setMessage('Terjadi kesalahan ulangi setelah beberapa saat');
                setModalVisible(!modalVisible);
              }
            },
          );
        }}>
        {({
          touched,
          errors,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <View style={styles.content}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.wraperInput}>
              <TextInput
                label="Password"
                placeholder="********"
                textContentType="password"
                autoCapitalize="none"
                secureTextEntry={!isVisible}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Icon
                  name={`${isVisible ? 'eye' : 'eye-slash'}`}
                  size={18}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={styles.wraperInput}>
              <TextInput
                label="Password"
                placeholder="********"
                textContentType="confirm_password"
                autoCapitalize="none"
                secureTextEntry={!isVisible2}
                value={values.confirm_password}
                onChangeText={handleChange('confirm_password')}
                onBlur={handleBlur('confirm_password')}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setIsVisible2(!isVisible2)}>
                <Icon
                  name={`${isVisible2 ? 'eye' : 'eye-slash'}`}
                  size={18}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
            {touched.confirm_password && errors.confirm_password && (
              <Text style={styles.errorText}>{errors.confirm_password}</Text>
            )}
            <Button title="Reset Password" onPress={handleSubmit}></Button>
          </View>
        )}
      </Formik>
      <ToastModal props={{modalVisible, setModalVisible, message}}></ToastModal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: adjust(12),
  },
  label: {
    fontSize: adjust(font.size.medium),
    fontWeight: '600',
    color: font.colors.fontBlack,
    marginBottom: adjust(4),
  },
  wraperInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: adjust(5),
    borderColor: colors.disable,
    height: 40,
    paddingHorizontal: adjust(10),
    marginBottom: adjust(12),
  },
  input: {
    fontSize: font.size.small,
    color: colors.black,
  },
  errorText: {
    marginLeft: 8,
    marginBottom: 16,
    color: colors.maroon,
  },
  submitButton: {
    color: colors.darkGreen,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 4,
  },
});

export default RessetPasswordForm;
