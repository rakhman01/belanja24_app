import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors, dimensions, font} from '../../config/constant';
import {adjust} from '../../Assets/utils';
import RessetPasswordForm from '../../Component/RessetPasswordForm';

function RessetPassword(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Buat password baru</Text>
        <Text style={styles.text}>
          Setelah membuat password baru, pastikan untuk menyimpannya dengan aman
          dan tidak membagikannya kepada siapapun. Jangan lupa untuk secara
          berkala mengganti password Anda sebagai langkah tambahan dalam menjaga
          keamanan akun Anda.
        </Text>
        <RessetPasswordForm props={props} />
      </View>
    </SafeAreaView>
  );
}

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
    fontWeight: '400',
    color: colors.black,
  },
});

export default RessetPassword;
