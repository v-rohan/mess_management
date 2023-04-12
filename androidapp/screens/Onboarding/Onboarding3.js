import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Button from '../../components/ui/Button';
import Colors from '../../constants/Colors';

const Onboarding3 = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('Registration');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.background}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/online-pay-nobg.png')}
            />
          </View>
          <View style={styles.featureContainer}>
            <Text style={styles.title}>Pay Online</Text>
            <Text style={styles.description}>
              Avoid the hassle and pay for your{'\n'}coupons on the internet
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <Button onPress={handlePress}>GET STARTED</Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default Onboarding3;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '75%',
  },
  image: {
    aspectRatio: 1.125,
    resizeMode: 'contain',
  },
  featureContainer: {
    marginTop: -24,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 28,
    color: 'black',
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: Colors.neutral60,
    margin: 4,
  },
  btnContainer: {
    marginTop: 42,
  },
});
