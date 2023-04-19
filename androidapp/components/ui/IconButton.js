import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const IconButton = ({text, iconName, onPress}) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.container, styles.containerPressed]
          : [styles.container]
      }
      onPress={onPress}
      >
      <Icon name={iconName} size={24} color={Colors.primary60} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 4,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.primary90,
  },
  text: {
    color: Colors.primary60,
    fontSize: 16,
    lineHeight: 20,
  },
  containerPressed: {
    backgroundColor: Colors.primary80,
  },
});
