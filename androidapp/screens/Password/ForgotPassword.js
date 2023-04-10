import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../components/ui/BackButton';
import Card from '../../components/ui/Card';

const ForgotPassword = ({navigation}) => {
  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.background}>
        <View style={styles.backBtnContainer}>
          <BackButton onPress={handleBackButton} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Forgot Password</Text>
        </View>
        <Text style={styles.description}>
          Select which contact detail should we use{'\n'}to reset your password
        </Text>
        <Card iconName="envelope-o" title="Email" description="Code sent to your email" />
        <Card iconName="phone" title="Phone" description="Code sent to your phone number" />
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  backBtnContainer: {
    marginTop: 36,
  },
  titleContainer: {
    marginTop: 60,
  },
  title: {
    color: 'black',
    fontSize: 36,
    lineHeight: 44,
  },
  description: {
    marginVertical: 4,
    color: '#998E8B',
    fontSize: 12,
    lineHeight: 16,
  },
});
