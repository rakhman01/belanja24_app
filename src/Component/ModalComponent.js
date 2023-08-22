import React, {Component, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ModalComponent = ({
  ButtonCustoms = open => <Text>custom this button</Text>,
  ContentCustoms = close => <Text>custom this Content</Text>,
  ContainerStyleContent,
  isTransparent = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={isTransparent}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={ContainerStyleContent}>
          <ContentCustoms
            close={callback => {
              setModalVisible(!modalVisible);
              if (callback && typeof callback === 'function') {
                callback();
              } else {
                null;
              }
            }}
          />
        </View>
      </Modal>
      {/* <Pressable onPress={() => setModalVisible(true)}> */}
      <ButtonCustoms
        open={callback => {
          setModalVisible(true);
          if (callback && typeof callback === 'function') {
            callback();
          } else {
            null;
          }
        }}
      />
      {/* </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalComponent;
