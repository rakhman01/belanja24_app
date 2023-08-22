import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import Slick from 'react-native-slick';
import {adjust} from '../Assets/utils';
import {getBannerHero} from '../Assets/API/getAPI';
import {useSelector} from 'react-redux';
import {colors, dimensions} from '../config/constant';

const Slider = () => {
  const [bannerHero, setBannerHero] = useState([]);

  useEffect(() => {
    getBannerHero(res => setBannerHero(res.data.data));
  }, []);

  return (
    <View style={styles.container}>
      <Slick showsButtons={true}>
        {bannerHero.length > 0 &&
          bannerHero.map((val, index) => (
            <ImageBackground
              key={index}
              style={{
                height: '100%',
                width: '100%',
              }}
              resizeMode="contain"
              imageStyle={{borderRadius: 10}}
              source={{uri: val.cover}}
            />
          ))}
      </Slick>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.width * 1,
    height: dimensions.height * 0.25,
    backgroundColor: colors.background, // Warna lapisan transparan di atas gambar
    justifyContent: 'center',
    alignItems: 'center',
    padding: adjust(10),
  },
});

export default React.memo(Slider);
