import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const BackButton = ({onPress}) => {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}>
        <Icon name="arrow-left" size={24} color="#F16522" />
      </Pressable>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  buttonInnerContainer: {
    backgroundColor: '#FFDBCE',
    padding: 8,
  },
  buttonText: {
    color: '#F16522',
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: '#FFB598',
  },
});
