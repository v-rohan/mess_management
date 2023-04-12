import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../constants/Colors";

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
        <Icon name="arrow-left" size={24} color={Colors.primary60} />
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
    backgroundColor: Colors.primary90,
    padding: 8,
  },
  buttonText: {
    color: Colors.primary60,
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: Colors.primary90,
  },
});
