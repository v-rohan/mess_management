import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Input from '../../components/ui/Input';
import {handleGoogleLogin} from '../Login/handleGoogle';
import Button from '../../components/ui/Button';
import BackButton from '../../components/ui/BackButton';
import IconButton from '../../components/ui/IconButton';
import Colors from '../../constants/Colors';
import {register} from '../../api/Api';
import {storage} from '../../App';

const Register = ({navigation, setIsSignedIn, setIsAdmin, setIsRegistered}) => {
  const [regNo, setRegNo] = useState();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  const emailRef = useRef();
  const pwdRef = useRef();

  const handleRegister = async () => {
    const data = {email, password: pwd};
    const res = await register(data);
    if (res.status === 200) {
      navigation.navigate('Login');

      //await AsyncStorage.setItem("token", token);
    }
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
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
          <Text style={styles.title}>Create Your{'\n'}Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            iconName="envelope"
            // keyboardType="email-address"
            ref={emailRef}
            nextRef={pwdRef}
          />
          <Input
            value={pwd}
            onChangeText={setPwd}
            placeholder="Password"
            iconName="lock"
            secureTextEntry={true}
            ref={pwdRef}
          />
        </View>
        <View style={styles.btnsContainer}>
          <Button onPress={handleRegister}>REGISTER</Button>
          <Text style={styles.txt}>Or</Text>
          <IconButton
            text="Sign Up With Google"
            iconName="logo-google"
            onPress={() =>
              handleGoogleLogin(setIsSignedIn, setIsAdmin, setIsRegistered)
            }
          />
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>Already Have An Account? </Text>
          <Pressable
            style={({pressed}) =>
              pressed
                ? [styles.linkContainer, styles.pressedStyle]
                : styles.linkContainer
            }
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
  btnsContainer: {
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
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
    color: Colors.primary60,
  },
  linkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pressedStyle: {
    opacity: 0.8,
    borderBottomColor: Colors.primary60,
  },
});

export default Register;
