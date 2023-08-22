import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, font} from '../config/constant';
import {adjust} from '../Assets/utils';
import {VerificationOtp} from '../Assets/API/postAPI';
import ToastModal from './ToastModal';

const VerificationForm = ({props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  let {navigation, route} = props;

  return (
    <>
      <Formik
        initialValues={{otp: ''}}
        validationSchema={() =>
          Yup.object().shape({
            otp: Yup.string().required('Required'),
          })
        }
        onSubmit={values => {
          let data = {otp: values.otp, reference_id: route.params.params};
          console.log(data);
          VerificationOtp(data, async val => {
            let response = await val;
            if (response.message === 'Approved') {
              navigation.navigate('RessetPassword', {
                params: route.params.params,
              });
            } else {
              alert('otp kadaluarsa');
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
            <Text style={styles.label}>OTP</Text>
            <TextInput
              placeholder="----"
              keyboardType="name-phone-pad"
              autoCapitalize="none"
              returnKeyType="next"
              blurOnSubmit={false}
              leftIconContainerStyle={{marginRight: 5}}
              value={values.otp}
              onChangeText={handleChange('otp')}
              onBlur={handleBlur('otp')}
              style={styles.input}
            />
            {touched.otp && errors.otp && (
              <Text style={styles.errorText}>{errors.otp}</Text>
            )}
            <Button title="Kirim" onPress={handleSubmit}></Button>
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

export default VerificationForm;
