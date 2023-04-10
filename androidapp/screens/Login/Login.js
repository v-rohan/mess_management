import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import BackButton from '../../components/ui/BackButton';

const Login = ({navigation}) => {
  const [regNo, setRegNo] = useState();
  const [pwd, setPwd] = useState();

  const handleLogin = () => {
    console.log(regNo);
    console.log(pwd);
    setRegNo('');
    setPwd('');
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleSignIn = () => {
    navigation.navigate('Registration');
  };

  const handleForgetPwd = () => {
    navigation.navigate('ForgotPassword');
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
          <Text style={styles.title}>Login To Your{'\n'}Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            inputText={regNo}
            setInputText={setRegNo}
            placeholder="Registration Number"
            iconName="user"
          />
          <Input
            inputText={pwd}
            setInputText={setPwd}
            placeholder="Password"
            iconName="lock"
            secureTextEntry={true}
          />
        </View>
        <Pressable
          style={({pressed}) =>
            pressed
              ? [styles.forgetPwdTxtContainer, styles.forgetPwdTxtPressed]
              : styles.forgetPwdTxtContainer
          }
          onPress={handleForgetPwd}>
          <Text style={styles.forgetPwdTxt}>Forgot Password?</Text>
        </Pressable>
        <View style={styles.btnContainer}>
          <Button onPress={handleLogin}>LOGIN</Button>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>Don't have an account? </Text>
          <Pressable
            style={({pressed}) => pressed && styles.pressedStyle}
            onPress={handleSignIn}>
            <Text style={[styles.txt, styles.txtLink]}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

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
    gap: 16,
  },
  forgetPwdTxtContainer: {
    alignSelf: 'flex-start',
    marginTop: -12,
    marginBottom: 24,
    marginLeft: 8,
  },
  forgetPwdTxt: {
    color: '#F16522',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  forgetPwdTxtPressed: {
    opacity: 0.8,
  },
  btnContainer: {
    marginVertical: 16,
  },
  txtContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 12,
    lineHeight: 16,
    color: 'black',
    fontWeight: '500',
  },
  txtLink: {
    color: '#F16522',
  },
  pressedStyle: {
    opacity: 0.8,
    borderBottomColor: '#F16522',
    borderBottomWidth: 1,
  },
});

export default Login;
