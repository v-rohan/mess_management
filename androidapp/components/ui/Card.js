import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({iconName, title, description}) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed
          ? [styles.mainContainer, styles.pressedStyle]
          : styles.mainContainer
      }>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color="#F16522" />
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
    marginVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFDBCE',
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
    color: '#998E8B',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
  },
  pressedStyle: {
    opacity: 0.75,
    // borderColor: '##F16522',
    // borderWidth: 1,
  },
});
