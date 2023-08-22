import {View, Text} from 'react-native';
import React from 'react';
import Routes from './src/Routes/Routes';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import AuthStackScreen from './src/navigations/AuthStackScreen';
import RouteStackScreen from './src/navigations/RouteStackScreen';

const App = () => {
  return (
    <Provider store={Store}>
      {/* <Routes /> */}
      <RouteStackScreen />
    </Provider>
  );
};

export default App;
