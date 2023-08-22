import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenDashboard from '../Screens/ScreenBeranda';
import {colors} from '../config/constant';
import ScreenKeranjang from '../Screens/ScreenKeranjang';
import ScreenAccount from '../Screens/ScreenAccount';
import ScreenDetailBarang from '../Screens/ScreenDetailBarang';
import ScreenPencarian from '../Screens/ScreenPencarian';
import SearchBarTop from '../Component/SearchBarTop';
import ScreenDetailToko from '../Screens/ScreenDetailToko';
import ScreenChat from '../Screens/ScreenChat';
import ScreenPersonalChat from '../Screens/ScreenPersonalChat';
import ScreenCheckout from '../Screens/ScreenCheckout';
import ScreenTransaction from '../Screens/ScreenTransaction';
import ScreenPayment from '../Screens/ScreenPayment';
// screen

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
        headerStyle: {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: props => <SearchBarTop {...props} />,
        }}
        name="Home"
        component={ScreenDashboard}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="DetailBarang"
        component={ScreenDetailBarang}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: props => <SearchBarTop {...props} />,
        }}
        name="Pencarian"
        component={ScreenPencarian}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="DetailStore"
        component={ScreenDetailToko}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Chat"
        component={ScreenChat}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PersonalChat"
        component={ScreenPersonalChat}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Keranjang"
        component={ScreenKeranjang}
      />
      <Stack.Screen
        // options={{headerShown: false}}
        name="Checkout"
        component={ScreenCheckout}
      />

      <Stack.Screen
        // options={{headerShown: false}}
        name="Payment"
        component={ScreenPayment}
      />
    </Stack.Navigator>
  );
};

export const ChartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chart"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
        headerStyle: {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}>
      <Stack.Screen
        name="Chart"
        component={ScreenKeranjang}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const TransactionsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TransactionsStack"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
        headerStyle: {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}>
      <Stack.Screen
        name="Transactions"
        component={ScreenTransaction}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const AccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountStack"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
        headerStyle: {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}>
      <Stack.Screen
        name="Account"
        component={ScreenAccount}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
