import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';

class QRScan extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <QRCodeScanner
        onRead={e => {
          try {
        //    console.log(e.data);
            async function a() {
              navigate({
                name: 'HomeScreen',
                params: {code: e.data},
                merge: true,
              });
            }
            a();
          } catch (err) {
            console.log(err);
          }
        }}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Scan the{' '}
            <Text style={styles.textBold}>QR to validate student meal</Text>
          </Text>
        }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <QRScan {...props} navigation={navigation} />;
}
