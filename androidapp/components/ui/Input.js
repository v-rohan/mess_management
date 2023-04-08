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
    // borderWidth: 1,
    // borderColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
