import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const LoadingPage = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingPage;
