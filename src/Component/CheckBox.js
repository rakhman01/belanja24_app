import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Material from 'react-native-vector-icons/MaterialIcons';
import {adjust} from '../Assets/utils';

const CheckBox = ({isChecked = false, size = 20, color = 'black', onPress}) => {
  return (
    <Pressable onPress={onPress}>
      {isChecked ? (
        <Material size={size} color={color} name="check-box" />
      ) : (
        <Material size={size} color={color} name="check-box-outline-blank" />
      )}
    </Pressable>
  );
};

export default CheckBox;
