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
import Button from '../../components/ui/Button';
import BackButton from '../../components/ui/BackButton';
import { handleGoogleLogin } from './handleGoogle';
import Colors from '../../constants/Colors';
import {storage} from '../../App';
import {login} from '../../api/SignInApiCalls';

const Login = ({navigation, setIsSignedIn, setIsAdmin}) => {
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  const emailRef = useRef();
  const pwdRef = useRef();

  const handleLogin = async () => {
    const data = {email, password: pwd};
    const res = await login(data);
    if (res.status === 200) {
      const a = await res.json();
      storage.set('token', a.token);
      console.log(a);
      if (a.role === 'admin') {
        setIsAdmin(true);
      }
      setIsSignedIn(true);
      //await AsyncStorage.setItem("token", token);
    }
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
        backgroundColor="#f0f0f0"
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
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            iconName="envelope"
            keyboardType="email-address"
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
        {/* <Pressable
          style={({pressed}) =>
            pressed
              ? [styles.forgetPwdTxtContainer, styles.pressedStyle]
              : styles.forgetPwdTxtContainer
          }
          onPress={handleForgetPwd}>
          <Text style={styles.forgetPwdTxt}>Forgot Password?</Text>
        </Pressable> */}
        <View style={styles.btnContainer}>
          <Button onPress={handleLogin}>LOGIN</Button>
        </View>
        <View
          style={{
            marginTop: 18,
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'QuickSand',
              fontWeight: '800',
              color: '#595959',
              fontSize: 13,
              marginTop: 7,
            }}>
            Or Sign in with{'   '}
          </Text>
          <TouchableOpacity onPress={() => handleGoogleLogin(setIsSignedIn)}>
            <View style={{padding:10, borderRadius:15 , borderWidth:1.5, borderColor:'#000000', alignItems:'center'}}>
              <Image
                source={require('../../assets/images/googl.png')}
                style={{marginTop: 7, opacity: 1, marginRight: 3}}
              />
              <Text style={{fontFamily: 'Poppins', marginTop: 8, color:'#000'}}>Google</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>Don't have an account? </Text>
          <Pressable
            style={({pressed}) =>
              pressed
                ? [styles.linkContainer, styles.pressedStyle]
                : styles.linkContainer
            }
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  forgetPwdTxt: {
    color: Colors.primary60,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
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
    color: Colors.primary60,
  },
  linkContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pressedStyle: {
    opacity: 0.8,
    borderBottomColor: Colors.primary60,
    borderBottomWidth: 1,
  },
});

export default Login;
