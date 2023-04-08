import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';
import {register, login} from '../../api/SignInApiCalls';
import {storage} from '../../App';

export const LoginLand = ({navigation, setIsSignedIn, setIsAdmin}) => {
  const styles = StyleSheet.create({
    defStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 55,
      width: Dimensions.get('window').width - 100,
      // fontFamily: "Poppins",
      paddingTop: 15,
      textAlign: 'center',
      color: '#333333',
      fontSize: 18,
      //borderWidth: 0,
      borderRadius: 20,
      borderWidth: 2,
      paddingHorizontal: 10,
    },
    input2: {
      height: 55,
      width: Dimensions.get('window').width - 100,
      fontFamily: 'Quicksand',
      paddingTop: 13,
      textAlign: 'center',
      flex: 1,
      color: '#000',
      fontWeight: '700',
      fontSize: 15,
      borderWidth: 0,
      paddingHorizontal: 10,
    },
    blurtext: {
      height: 55,
      width: Dimensions.get('window').width - 100,
      flexDirection: 'row',
      justifyContent: 'center',
      shadowOpacity: 0.5,
      shadowColor: 'grey',
      shadowRadius: 2,
      borderRadius: 45,
      backgroundColor: '#e7e9f9',
    },
    blurbtn: {
      height: 41,
      width: 143,
      flexDirection: 'row',
      shadowOffset: {width: 2, height: 2},
      justifyContent: 'center',
      shadowRadius: 4,
      borderRadius: 27.5,
      backgroundColor: 'transparent',
    },
    google: {
      height: 37,
      opacity: 0.8,
      width: 99,
      flexDirection: 'row',
      shadowOffset: {width: 1, height: 1},
      justifyContent: 'center',
      shadowRadius: 2,
      borderRadius: 10,
      backgroundColor: '#FCFCFC',
    },
    section: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 30,
    },
    neoblur: {
      shadowRadius: 2,
      borderRadius: 45,
      backgroundColor: '#E7E9F9',
      width: Dimensions.get('window').width - 45,
      height: 532,
      alignItems: 'center',
      padding: 10,
    },

    headtext: {
      fontFamily: 'Quicksand',
      fontStyle: 'normal',
      fontSize: 18,
      paddingBottom: 10,
      color: '#595959',
    },
    listCont: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      textAlign: 'center',
    },
    fab: {
      paddingBottom: 50,
    },
    topEmpty: {
      height: 90,
    },
    bottomEmpty: {
      height: 20,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      alignSelf: 'center',
    },
    text: {
      fontSize: 35,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      alignItems: 'center',
      paddingBottom: 0,
      height: 1,
      backgroundColor: 'transparent',
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });
  const [email, onChangeEmail] = React.useState('');
  const [pwd, onChangePwd] = React.useState('');

  // useEffect(()=>{
  //   setInterval(()=>{console.log(storage.getString('token'))}, 1000)
  // })

  const handleRegister = async () => {
    const data = {email, password: pwd};
    const res = await register(data);
    if (res.status === 200) {
      const {token} = await res.json();
      storage.set('token', token);
      //await AsyncStorage.setItem("token", token);
    }
  };

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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View
        style={{
          backgroundColor: '#ff00ff',
          height: '100%',
          width: '100%',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Text style={{marginTop: 30, fontSize: 20}}>Login/Register</Text>
        <View
          style={{
            height: 450,
            width: 340,
            marginTop: 20,
            backgroundColor: '#fff',
            borderRadius: 20,
            flexDirection: 'column',
            alignContent: 'center',
          }}>
          <View style={{height: 50}} />
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20}}>E-mail</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20}}>Password</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.input}
              onChangeText={onChangePwd}
              value={pwd}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'center',
            }}>
            <Button
              style={{width: 100}}
              onPress={() => {
                handleRegister();
              }}
              title="REGISTER"
            />
            <Button
              style={{width: 100}}
              onPress={() => {
                handleLogin();
              }}
              title="LOGIN"
            />
          </View>
        </View>
      </View>
    </>
  );
};
