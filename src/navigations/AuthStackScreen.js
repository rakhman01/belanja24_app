import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/Auth/LoginScreen';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import RessetPassword from '../Screens/Auth/RessetPassword';
import VerificationScreen from '../Screens/Auth/VerificationScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';

const AuthStackScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{headerShown: false}}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="RessetPassword"
        options={{headerShown: false}}
        component={RessetPassword}
      />
      <Stack.Screen
        name="VerificationPassword"
        options={{headerShown: false}}
        component={VerificationScreen}
      />
      <Stack.Screen
        name="Register"
        options={{headerShown: false}}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackScreen;
