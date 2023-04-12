import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';

const InputSquareBox = React.forwardRef(
  ({value, onChangeText, nextRef, autoFocus}, ref) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleOnFocus = () => {
      setIsFocus(true);
    };

    const handleOnBlur = () => {
      setIsFocus(false);
    };

    return (
      <TextInput
        style={
          isFocus
            ? [styles.input, styles.inputFocus]
            : [styles.input, styles.inputBlur]
        }
        inputMode="numeric"
        maxLength={1}
        caretHidden
        value={value}
        autoFocus={autoFocus}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={text => {
          onChangeText(text);

          if (text.length === 1) {
            nextRef ? nextRef.current.focus() : ref.current.blur();
          }
        }}
        ref={ref}
        // returnKeyType="next"
        // onSubmitEditing={() => {
        //   if (nextRef) {
        //     nextRef.current.focus();
        //   }
        // }}
        // blurOnSubmit={nextRef ? false : true}
      />
    );
  },
);

export default InputSquareBox;

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 60,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.neutral80,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.neutral80,
  },
  inputFocus: {
    color: Colors.primary60,
    borderColor: Colors.primary60,
  },
  inputBlur: {
    color: Colors.neutral80,
    borderColor: Colors.neutral80,
  },
});
