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

// login with google
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect} from 'react';

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

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '"530479274730-lt0uq801ehu22317nn9ff1o24ibjrah4.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);

  // Somewhere in your code
  let signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // setState({userInfo});
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progres');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not avaliable');
      } else {
        console.log('lol');
      }
    }
  };

  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Image source={image.logo} style={styles.logo} /> */}
        <Text style={styles.title}>Masuk ke akun anda</Text>
      </View>
      <View style={{width: dimensions.width * 0.9}}>
        <LoginForm props={navigation} />
        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        /> */}
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
