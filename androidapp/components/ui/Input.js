import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';

const Input = React.forwardRef(
  (
    {value, onChangeText, placeholder, iconName, secureTextEntry, nextRef},
    ref,
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleOnFocus = () => {
      setIsFocus(true);
    };

    const handleOnBlur = () => {
      setIsFocus(false);
    };

    return (
      <View
        style={
          isFocus
            ? [styles.inputContainer, styles.inputFocusContainer]
            : styles.inputContainer
        }>
        <View
          style={
            isFocus
              ? [styles.iconContainer, styles.iconFocusContainer]
              : styles.iconContainer
          }>
          <Icon
            name={iconName}
            size={24}
            color={isFocus ? Colors.primary60 : 'black'}
          />
        </View>
        <TextInput
          style={isFocus ? [styles.input, styles.inputFocus] : styles.input}
          cursorColor={Colors.primary60}
          placeholder={isFocus ? '' : placeholder}
          placeholderTextColor={Colors.neutral80}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={value => onChangeText(value)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={ref}
          returnKeyLabel="next"
          onSubmitEditing={() => {
            nextRef && nextRef.current.focus();
          }}
          blurOnSubmit={!nextRef}
        />
      </View>
    );
  },
);
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  inputFocusContainer: {
    borderColor: Colors.primary70,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 48,
    width: 48,
  },
  iconFocusContainer: {
    backgroundColor: Colors.primary95,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
  },
  inputFocus: {
    backgroundColor: Colors.primary95,
    color: Colors.primary60,
  },
  inputBlur: {
    backgroundColor: 'white',
  },
});
