import {View, Text, StatusBar, Dimensions, StyleSheet} from 'react-native';
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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.background}>
        <View style={{marginTop: 36}}>
          <BackButton onPress={handleBackButton} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={{color: 'black', fontSize: 36}}>Create Your</Text>
          <Text style={{color: 'black', fontSize: 36}}>Account</Text>
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
        <View style={{marginVertical: 16}}>
          <Button onPress={handleRegister}>REGISTER</Button>
        </View>
        <View style={{marginTop: 16}}>
          <Text
            style={{textAlign: 'center', color: 'black', fontWeight: '400'}}>
            Already Have An Account? Sign In
          </Text>
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
  titleContainer: {
    marginTop: 60,
  },
  inputContainer: {
    marginVertical: 20,
    gap: 16,
  },
});

export default Register;
