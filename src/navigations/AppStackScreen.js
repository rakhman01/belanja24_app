import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../config/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {adjust} from '../Assets/utils';
import {
  AccountStack,
  ChartStack,
  HomeStack,
  TransactionsStack,
} from './navigations';

const AppStackScreen = () => {
  const BottomStack = createBottomTabNavigator();
  return (
    <BottomStack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        inactiveBackgroundColor: colors.white,
        // activeTintColor: colors.blackGreen,
        // inactiveTintColor: colors.primaryGreen,
        showLabel: false,
        // labelStyle: {fontWeight: 'bold'},
      }}>
      <BottomStack.Screen
        options={{
          title: 'Home',
          headerShown: false,
          tabBarActiveTintColor: colors.grey,
          tabBarActiveBackgroundColor: colors.grey,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="home"
              color={colors.primaryBlue}
              size={adjust(16)}
            />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <BottomStack.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.grey,
          tabBarActiveBackgroundColor: colors.grey,
          title: 'Chart',
          tabBarActiveTintColor: colors.grey,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="shopping-cart"
              color={colors.primaryBlue}
              size={adjust(16)}
            />
          ),
        }}
        name="ChartStack"
        component={ChartStack}
      />
      <BottomStack.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.grey,
          tabBarActiveBackgroundColor: colors.grey,
          title: 'Transactions',
          tabBarActiveTintColor: colors.grey,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="list-alt"
              color={colors.primaryBlue}
              size={adjust(16)}
            />
          ),
        }}
        name="TransactionsStack"
        component={TransactionsStack}
      />

      <BottomStack.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.grey,
          tabBarActiveBackgroundColor: colors.grey,
          title: 'Account',
          tabBarActiveTintColor: colors.grey,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="person"
              color={colors.primaryBlue}
              size={adjust(16)}
            />
          ),
        }}
        name="AccountStack"
        component={AccountStack}
      />
    </BottomStack.Navigator>
  );
};

export default AppStackScreen;
