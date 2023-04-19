import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconButton from './IconButton';

const Nav = ({buttons}) => {
  return (
    <View style={styles.container}>
      {buttons.map(button => (
        <IconButton text={button.text} iconName={button.iconName} />
      ))}
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 8,
    width: '80%',
    justifyContent: 'space-evenly',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
