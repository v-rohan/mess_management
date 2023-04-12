import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackButton from '../../components/ui/BackButton';
import Colors from '../../constants/Colors';
import Button from '../../components/ui/Button';
import InputSquareBox from '../../components/ui/InputSquareBox';

const Verification = ({route, navigation, title, text, content}) => {
  const [box1, setBox1] = useState();
  const [box2, setBox2] = useState();
  const [box3, setBox3] = useState();
  const [box4, setBox4] = useState();

  const box2Ref = useRef();
  const box3Ref = useRef();
  const box4Ref = useRef();

  const handleOnVerify = () => {
    const code = Number(box1 + box2 + box3 + box4);
    setBox1();
    setBox2();
    setBox3();
    setBox4();

    console.log(code);

    // navigation.navigate('ResetPassword');
  };

  const handleSendAgain = () => {
    navigation.push(route.name);
  };

  const handleBackButton = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View>
        <View style={styles.background}>
          <View style={styles.backBtnContainer}>
            <BackButton onPress={handleBackButton} />
          </View>
          <View style={styles.container}>
            <View style={styles.featureContainer}>
              <Text style={styles.title}>Verify {title}</Text>
              <Text style={styles.description}>
                We have sent a code to your {text}
              </Text>
            </View>
            <Text style={styles.highlightText}>{content}</Text>
            <View style={styles.inputContainer}>
              <InputSquareBox
                value={box1}
                onChangeText={setBox1}
                nextRef={box2Ref}
                autoFocus
              />
              <InputSquareBox
                value={box2}
                onChangeText={setBox2}
                ref={box2Ref}
                nextRef={box3Ref}
              />
              <InputSquareBox
                value={box3}
                onChangeText={setBox3}
                ref={box3Ref}
                nextRef={box4Ref}
              />
              <InputSquareBox
                value={box4}
                onChangeText={setBox4}
                ref={box4Ref}
              />
              <Text style={styles.time}>(04:21)</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSendAgain} isSecondary>
                SEND AGAIN
              </Button>
              <Button onPress={handleOnVerify}>VERIFY</Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Verification;

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
  container: {
    marginTop: 72,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
    padding: 20,
  },
  featureContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    lineHeight: 28,
  },
  description: {
    color: Colors.neutral60,
    fontSize: 12,
    lineHeight: 16,
  },
  highlightText: {
    color: Colors.primary60,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    justifyContent: 'center',
  },
  time: {
    color: Colors.neutral80,
    flexBasis: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: 24,
  },
});
