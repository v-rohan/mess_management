import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Success from '../../assets/svgs/Success';
import Button from '../../components/ui/Button';
import Colors from '../../constants/Colors';

const PasswordResetSuccess = () => {
  const handleNextButton = () => {
    console.log('NEXT');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#f0f0f0"
      />
      <View style={styles.background}>
        <View style={styles.svgContainer}>
          <Success />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Congrats!</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Password reset successful</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={handleNextButton}>NEXT</Button>
        </View>
      </View>
    </>
  );
};

export default PasswordResetSuccess;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0f0f0',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {},
  titleContainer: {
    marginTop: 24,
  },
  title: {
    color: Colors.primary60,
    fontSize: 44,
    lineHeight: 52,
  },
  subtitleContainer: {},
  subtitle: {
    color: Colors.neutral60,
    fontSize: 24,
    lineHeight: 32,
  },
  btnContainer: {
    marginTop: 48,
  },
});
