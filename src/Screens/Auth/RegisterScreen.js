import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {colors, dimensions, font, image} from '../../config/constant';
import RegisterForm from '../../Component/RegisterForm';
const RegisterScreen = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Image source={image.logo} style={styles.logo} /> */}
        <Text style={styles.title}>Buat akun Belanja24</Text>
      </View>
      <View style={{width: dimensions.width * 0.9}}>
        <RegisterForm props={navigation} />
        {/* <LoginForm /> */}
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
  logo: {
    width: dimensions.width * 0.3,
    height: dimensions.height * 0.1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: font.size.extraLarge,
    fontWeight: '600',
    color: colors.black,
  },
});

export default RegisterScreen;
