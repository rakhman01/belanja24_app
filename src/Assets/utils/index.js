import {PixelRatio, Dimensions} from 'react-native';

//height and width
export const pixelRatio = PixelRatio.get();
export const WidthScreen = Dimensions.get('window').width;
export const HeightScreen = Dimensions.get('window').height;
export const blueB2C = '#6FB3F4';
export const Gray = '#d9d9d7';
export const GrayMedium = '#8f8f8d';
export const Green = '#15cf23';

export const logoB2CLink =
  'https://shellrean.sgp1.cdn.digitaloceanspaces.com/belanja24.com/public/manual/logo%20belanja24%20b2c%20(1)%20(1).png';

export const formatter = val => {
  if (typeof val === 'string') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(parseInt(val));
  } else {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(val);
  }
};

//Fontdevices

export const adjust = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (WidthScreen < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (HeightScreen < 667) {
      return size;
      // iphone 6-6s
    }
    if (HeightScreen >= 667 && HeightScreen <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (WidthScreen <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (HeightScreen < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (HeightScreen >= 667 && HeightScreen <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (WidthScreen <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (HeightScreen < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (HeightScreen >= 667 && HeightScreen <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  return size;
};
