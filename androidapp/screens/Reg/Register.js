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

const Register = ({navigation}) => {
  const [regNo, setRegNo] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  const handleRegister = () => {
    console.log(regNo);
    console.log(email);
    console.log(pwd);
    setRegNo('');
    setEmail('');
    setPwd('');
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleSignIn = () => {
    navigation.navigate('LoginLand');
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
          <Text style={styles.title}>Create Your{'\n'}Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            inputText={regNo}
            setInputText={setRegNo}
            placeholder="Registration Number"
            iconName="user"
          />
          <Input
            inputText={email}
            setInputText={setEmail}
            placeholder="Email"
            iconName="envelope"
          />
          <Input
            inputText={pwd}
            setInputText={setPwd}
            placeholder="Password"
            iconName="lock"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btnContainer}>
          <Button onPress={handleRegister}>REGISTER</Button>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>Already Have An Account? </Text>
          <Pressable
            style={({pressed}) => pressed && styles.pressedStyle}
            onPress={handleSignIn}>
            <Text style={[styles.txt, styles.txtLink]}>Sign In</Text>
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
    borderBottomColor: "#F16522",
    borderBottomWidth: 1,
  },
});

export default Register;
