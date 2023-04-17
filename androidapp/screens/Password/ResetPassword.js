import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Button from '../../components/ui/Button';
import BackButton from '../../components/ui/BackButton';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

const ResetPassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [oldPwd, setOldPwd] = useState();
  const [newPwd, setNewPwd] = useState();

  const newPwdRef = useRef();

  const handleBackButton = () => {
    console.log('BACK');
  };

  const handleNextButton = () => {
    console.log('NEXT', {
      old: oldPwd,
      new: newPwd,
    });

    if (oldPwd && oldPwd === newPwd) {
      console.log('NAVIGATE NEXT SCREEN');
    } else {
      console.log('RE-ENTER AGAIN');
      setIsModalVisible(!isModalVisible);
    }

    setOldPwd();
    setNewPwd();
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#f0f0f0"
      />
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="Incorrect password match"
        description="Please re-enter your passwords correctly."
      />
      <View style={styles.background}>
        <View style={styles.backBtnContainer}>
          <BackButton onPress={handleBackButton} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter Your Phone{'\n'}Number</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Input
            value={oldPwd}
            onChangeText={setOldPwd}
            placeholder="Enter new password"
            iconName="lock"
            secureTextEntry
            nextRef={newPwdRef}
          />
          <Input
            value={newPwd}
            onChangeText={setNewPwd}
            placeholder="Re-enter the password"
            iconName="lock"
            secureTextEntry
            ref={newPwdRef}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={handleNextButton}>NEXT</Button>
        </View>
      </View>
    </>
  );
};

export default ResetPassword;

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
  inputsContainer: {
    marginVertical: 20,
    rowGap: 16,
  },
  btnContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 20,
  },
});
