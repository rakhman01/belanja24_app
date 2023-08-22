import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import AppStackScreen from './AppStackScreen';
import AuthStackScreen from './AuthStackScreen';
const RouteStackScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="AuthStackScreen"
          options={{headerShown: false}}
          component={AuthStackScreen}
        />
        <Stack.Screen
          name="AppStackScreen"
          options={{headerShown: false}}
          component={AppStackScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteStackScreen;
