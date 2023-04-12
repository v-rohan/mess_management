import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import TopRightDark from '../../assets/svgs/TopRightDark';
import TopRightLight from '../../assets/svgs/TopRightLight';
import BottomLeftDark from '../../assets/svgs/BottomLeftDark';
import BottomLeftLight from '../../assets/svgs/BottomLeftLight';
import Colors from '../../constants/Colors';

const TitleScreen = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('Onboarding1');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <TouchableWithoutFeedback style={{}} onPress={handlePress}>
        <View style={styles.background}>
          <View style={styles.content}>
            <TopRightLight style={styles.topRightVector} />
            <TopRightDark style={styles.topRightVector} />
            <BottomLeftDark style={styles.bottomLeftVector} />
            <BottomLeftLight style={styles.bottomLeftVector} />
            <View style={styles.mainContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/mainlogo-nobg.png')}
              />
              <Text style={styles.title}>MESS MANAGER</Text>
              <Text style={styles.subTitle}>
                Organize mess facilities in an efficient way
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default TitleScreen;

const styles = StyleSheet.create({
  tch: {
    borderWidth: 5,
  },
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
  mainContainer: {
    alignItems: 'center',
  },
  topRightVector: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftVector: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 36,
    color: Colors.primary60,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: 'black',
  },
  image: {
    height: 80,
    width: 80,
  },
});
