import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const Button = ({children, onPress, isSecondary}) => {
  const buttonInnerContainerStyle = isSecondary
    ? styles.secondaryButtonInnerContainer
    : styles.primaryButtonInnerContainer;
  const buttonTextStyle = isSecondary
    ? styles.secondaryButtonText
    : styles.primaryButtonText;
  const pressedStyle = isSecondary
    ? styles.secondaryPressed
    : styles.primaryPressed;

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({pressed}) =>
          pressed
            ? [buttonInnerContainerStyle, pressedStyle]
            : buttonInnerContainerStyle
        }
        onPress={onPress}>
        <Text style={buttonTextStyle}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  primaryButtonInnerContainer: {
    backgroundColor: Colors.primary60,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  secondaryButtonInnerContainer: {
    backgroundColor: Colors.primary90,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary60,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryPressed: {
    opacity: 0.85,
  },
  secondaryPressed: {
    backgroundColor: Colors.primary80,
  },
});
