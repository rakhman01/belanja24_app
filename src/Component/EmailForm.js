import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, font} from '../config/constant';
import {adjust} from '../Assets/utils';
import {ForgotPassword} from '../Assets/API/postAPI';
import ToastModal from './ToastModal';

const EmailForm = ({props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{email: ''}}
        validationSchema={() =>
          Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
          })
        }
        onSubmit={values => {
          ForgotPassword(values, val => {
            console.log(val);
            if (val.status) {
              props.navigate('VerificationPassword', {
                params: val.data.data.reference_id,
              });
            } else {
              setModalVisible(!modalVisible);
              setMessage('Invalid Email');
            }
          });
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
            <Text style={styles.label}>Email Akun Anda</Text>
            <TextInput
              placeholder="user@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
              leftIcon={{type: 'material-community', name: 'email'}}
              leftIconContainerStyle={{marginRight: 5}}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Button title="Cari Email" onPress={handleSubmit}></Button>
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
    marginBottom: adjust(12),
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

export default EmailForm;
