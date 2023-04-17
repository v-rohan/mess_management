import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';

const Card = ({iconName, title, description, onPress}) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.mainContainer, styles.pressedStyle]
          : styles.mainContainer
      }
      onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color={Colors.primary60} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
    borderWidth: 1,
    borderColor: 'white',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  description: {
    color: Colors.neutral60,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
  },
  pressedStyle: {
    borderColor: Colors.primary60,
    backgroundColor: Colors.primary95,
  },
});
