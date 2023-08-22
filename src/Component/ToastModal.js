import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {colors, dimensions, font} from '../config/constant';
import {adjust} from '../Assets/utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ToastModal = ({props}) => {
  useEffect(() => {
    setTimeout(() => {
      props.setModalVisible(false);
    }, 3000);
  }, [props.modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
      visible={props.modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon
            name={'error'}
            style={{fontSize: font.size.title, color: font.colors.danger}}
          />
          <Text style={styles.textStyle}>{props.message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  modalView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: adjust(10),
    paddingVertical: adjust(12),
    alignItems: 'center',
    elevation: 5,
  },

  textStyle: {
    fontSize: font.size.verySmall,
    color: font.colors.danger,
    fontWeight: '600',
  },
});

export default ToastModal;
