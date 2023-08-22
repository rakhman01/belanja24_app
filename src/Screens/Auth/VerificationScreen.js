import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors, dimensions, font} from '../../config/constant';
import {adjust} from '../../Assets/utils';
import VerificationForm from '../../Component/VerificationForm';

const VerificationScreen = props => {
  // const {
  //   route: {
  //     params: {params},
  //   },
  // } = props;

  // console.log(params);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.text}>
          Silakan masukkan kode OTP yang telah kami kirimkan ke alamat email
          Anda. Kode OTP adalah kombinasi unik yang hanya berlaku untuk satu
          kali pemakaian dan akan kadaluarsa setelah jangka waktu tertentu.
        </Text>
        <VerificationForm props={props} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: dimensions.width * 0.9,
  },
  title: {
    fontSize: adjust(font.size.extraLarge),
    fontWeight: '600',
    color: colors.darkGrey,
  },
  text: {
    fontSize: adjust(font.size.verySmall),
    fontWeight: '600',
    color: colors.black,
  },
});

export default VerificationScreen;
