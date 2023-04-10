import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Input = ({
  inputText,
  setInputText,
  placeholder,
  iconName,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color="black" />
      </View>
      <TextInput
        style={styles.input}
        cursorColor="black"
        placeholder={placeholder}
        placeholderTextColor={'#D0C4C0'}
        secureTextEntry={secureTextEntry}
        value={inputText}
        onChangeText={value => setInputText(value)}
      />
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    height: 48,
    width: 48,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
