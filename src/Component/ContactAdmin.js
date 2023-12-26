import React, {useRef} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Text,
  Linking,
  Alert,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors, font} from '../config/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactAdmin = props => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const sendWhatsAppMessage = () => {
    Linking.openURL('https://api.whatsapp.com/send?phone=628112852424')
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device');
      });
  };

  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
        zIndex: 1,
        position: 'absolute',
        bottom: 0, // Posisi di bagian bawah
        right: 0, // Posisi di bagian kanan
        marginBottom: RFValue(48),
        marginRight: RFValue(8),
      }}
      {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.box} onPress={sendWhatsAppMessage}>
        <Icon name="whatsapp" color={colors.darkGreen} size={RFValue(28)} />
        <Text style={styles.titleText}>Chat Admin</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: RFValue(font.size.mini),
    fontFamily: font.fontFamily.poppinsThin,
    fontWeight: 'bold',
    color: font.colors.green,
    marginRight: RFValue(2),
  },
  box: {
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 50,
    borderWidth: RFValue(1),
    borderColor: colors.darkGreen,
  },
});

export default ContactAdmin;
