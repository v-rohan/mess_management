import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from './Button';
import Colors from '../../constants/Colors';

const Modal = ({isModalVisible, setIsModalVisible}) => {
  const handleButton = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    isModalVisible && (
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Incorrect password match</Text>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.description}>
              Please re-enter your passwords correctly
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <Button onPress={handleButton}>OK</Button>
          </View>
        </View>
      </View>
    )
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(52, 52, 52, 0.65)',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  titleContainer: {},
  title: {
    color: 'black',
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  descContainer: {
    width: '90%',
    marginVertical: 32,
  },
  description: {
    color: Colors.neutral60,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  btnContainer: {
    alignSelf: 'flex-end',
  },
});
