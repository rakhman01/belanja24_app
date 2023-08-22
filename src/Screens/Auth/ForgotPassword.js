import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors, dimensions, font} from '../../config/constant';
import {adjust} from '../../Assets/utils';
import EmailForm from '../../Component/EmailForm';

const ForgotPassword = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.text}>
          Jika Anda lupa kata sandi akun Anda, jangan khawatir. Masukkan alamat
          email terdaftar di akun Anda di bawah ini, dan kami akan mengirimkan
          instruksi untuk mereset kata sandi.
        </Text>
        <EmailForm props={navigation} />
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
    fontSize: adjust(font.size.large),
    // fontWeight: adjust(font.weight.medium),
    color: colors.darkGrey,
  },
  text: {
    fontSize: adjust(font.size.verySmall),
    // fontWeight: adjust(font.weight.light),
    color: colors.black,
  },
});

export default ForgotPassword;
