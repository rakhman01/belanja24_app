import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

export const colors = {
  background: '#FFFFFF',
  primaryBlue: `#6FB3F4`,
  primaryGreen: '#16A34A',
  darkGreen: '#196155',
  maroon: '#c30b0b',
  yellowStar: '#FFC107',
  lightGrey: '#989898',
  white: '#ffffff',
  darkWhite: '#F3F4F6',
  darkGrey: '#706f6f',
  primaryGrey: '#C4C4C4',
  darkTheme: '#545454',
  black: '#000000',
  blackGreen: '#021413',
  fontBlack: '#585858',
  disable: '#bebebe',
  disableGrey: 'rgba(196,196,196,0.59)',
  disableDark: 'rgba(84,84,84,0.59)',
  disableGreen: 'rgba(11,132,123,0.5)',
  grey: '#ededed',
};

export const font = {
  colors: {
    fontBlack: '#585858',
    disable: '#bebebe',
    fontGrey: '#706f6f',
    danger: '#dc3545',
    green: '#1F6559',
    blue: '#6FB3F4',
  },
  size: {
    mini: RFValue(10),
    verySmall: RFValue(12),
    small: RFValue(14),
    medium: RFValue(16),
    large: RFValue(18),
    extraLarge: RFValue(20),
    title: RFValue(24),
  },
  weight: {
    light: '200',
    medium: '500',
    bold: '700',
  },
};
export const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const image = {
  logo: require('../Assets/Images/logo.png'),
};
