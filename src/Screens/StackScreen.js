import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ScreenBeranda from './ScreenBeranda';
import SearchBarTop from '../Component/SearchBarTop';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenAccount from './ScreenAccount';
import {adjust, blueB2C, GrayMedium, HeightScreen} from '../Assets/utils';
// import StackBeranda from './StackBeranda';
import ScreenBeranda from './ScreenBeranda';
import {useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useMemo} from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {SvgUri} from 'react-native-svg';
import ScreenKeranjang from './ScreenKeranjang';
import ScreenTransaction from './ScreenTransaction';
import * as Keychain from 'react-native-keychain';
import LoginScreen from './Auth/LoginScreen';
import ForgotPassword from './Auth/ForgotPassword';
import VerificationScreen from './Auth/VerificationScreen';
import RessetPassword from './Auth/RessetPassword';
const Tab = createBottomTabNavigator();

const StackScreen = () => {
  const [isLogin, SetIslogin] = useState(true);
  const dispatch = useDispatch();
  const [tokenUser, setTokenUser] = useState();
  useEffect(() => {
    async function getToken() {
      try {
        const credentials = await Keychain.getGenericPassword();
        setTokenUser(credentials.password);
      } catch (error) {
        console.log(error);
      }
    }

    getToken();
  }, [tokenUser]);

  const {
    Authentication: {isUser},
  } = useSelector(state => state);

  return (
    <Tab.Navigator
      tabBar={props => {
        // console.log(props);
        const {
          state: {routes},
        } = props;
        const {
          state: {index},
        } = props;
        const {navigation} = props;

        // console.log(props);

        return (
          <View
            style={{
              height: HeightScreen * 0.055,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: blueB2C,
            }}>
            {routes.map((tabs, i) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(tabs.name)}
                  key={tabs.key}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {tabs.name === 'Beranda' ? (
                      <MaterialIcons
                        name="home"
                        color={i === index ? blueB2C : GrayMedium}
                        size={adjust(13)}
                      />
                    ) : tabs.name === 'Keranjang' ? (
                      <MaterialIcons
                        name="shopping-cart"
                        color={i === index ? blueB2C : GrayMedium}
                        size={adjust(13)}
                      />
                    ) : tabs.name === 'Transaction' ? (
                      <MaterialIcons
                        name="list-alt"
                        color={i === index ? blueB2C : GrayMedium}
                        size={adjust(13)}
                      />
                    ) : tabs.name === 'Account' ? (
                      isUser.ava != '' ? (
                        <SvgUri
                          width={adjust(15)}
                          height={adjust(15)}
                          uri={
                            isUser.ava === null
                              ? 'https://shellrean.sgp1.digitaloceanspaces.com/belanja24.com/public/ava/001.svg'
                              : isUser.ava
                          }
                        />
                      ) : (
                        <MaterialIcons
                          name="person"
                          color={i === index ? blueB2C : GrayMedium}
                          size={adjust(13)}
                        />
                      )
                    ) : (
                      <MaterialIcons
                        name="location-disabled"
                        color={i === index ? blueB2C : GrayMedium}
                        size={adjust(13)}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: adjust(10),
                        color: i === index ? blueB2C : GrayMedium,
                      }}>
                      {tabs.name === 'Account'
                        ? isUser.ava != ''
                          ? isUser.name
                          : 'Account'
                        : tabs.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
      screenOptions={({route}) => ({
        header: props => <SearchBarTop {...props} />,
      })}
      initialRouteName="Beranda">
      <Tab.Screen name="Beranda" component={ScreenBeranda} />
      {tokenUser != '' && (
        <Tab.Screen
          options={{headerShown: false}}
          name="Keranjang"
          component={ScreenKeranjang}
        />
      )}
      {tokenUser != '' && (
        <Tab.Screen
          options={{headerShown: false}}
          name="Transaction"
          component={ScreenTransaction}
        />
      )}
      <Tab.Screen
        options={{headerShown: false}}
        name="Account"
        component={ScreenAccount}
      />
    </Tab.Navigator>
  );
};
export default StackScreen;
