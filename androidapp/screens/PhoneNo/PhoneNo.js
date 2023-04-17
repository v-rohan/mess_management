import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/ui/Button';
import BackButton from '../../components/ui/BackButton';
import Input from '../../components/ui/Input';

const PhoneNo = () => {
  const [phnNo, setPhnNo] = useState();

  const handleBackButton = () => {
    console.log('Back');
  };

  const handleRegisterButton = () => {
    console.log(phnNo);
    setPhnNo();
  };

  const handleLaterButton = () => {
    console.log('LATER');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#f0f0f0"
      />
      <View style={styles.background}>
        <View style={styles.backBtnContainer}>
          <BackButton onPress={handleBackButton} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter Your Phone{'\n'}Number</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={phnNo}
            onChangeText={setPhnNo}
            placeholder="Phone Number"
            iconName="phone"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.btnsContainer}>
          <Button isSecondary onPress={handleLaterButton}>
            LATER
          </Button>
          <Button onPress={handleRegisterButton}>REGISTER</Button>
        </View>
      </View>
    </>
  );
};

export default PhoneNo;

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
  inputContainer: {
    marginVertical: 20,
  },
  btnsContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: "center",
    columnGap: 20,
  },
});
