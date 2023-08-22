import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, dimensions, font, image} from '../../config/constant';
import LoginForm from '../../Component/LoginForm';

const LoginScreen = props => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //     webClientId:
  //       '530479274730-lt0uq801ehu22317nn9ff1o24ibjrah4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  //     offlineAccess: true,
  //     forceCodeForRefreshToken: true,
  //   });
  // GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //   webClientId:
  //     '530479274730-lt0uq801ehu22317nn9ff1o24ibjrah4.apps.googleusercontent.com',
  //   // androidClientId:
  //   //   '45178597324-0821lmk4nor1e1mouudiuc764ikeu35k.apps.googleusercontent.com',
  //   offlineAccess: true,
  //   forceCodeForRefreshToken: true,
  // });

  // isSignedIn();
  // }, []);

  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Image source={image.logo} style={styles.logo} /> */}
        <Text style={styles.title}>Masuk ke akun anda</Text>
      </View>
      <View style={{width: dimensions.width * 0.9}}>
        <LoginForm props={navigation} />
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

export default LoginScreen;
