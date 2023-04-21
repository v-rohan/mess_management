import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../constants/Colors';
import Button from '../../components/ui/Button';
import QRCode from 'react-native-qrcode-svg';
import IconButton from '../../components/ui/IconButton';
import {checkQR, codegen, logout, stats} from '../../api/Api';
import {scan} from '../../api/Api';
import {storage} from '../../App';

const HomeScreen = ({
  navigation,
  route,
  isRegistered,
  isStudent,
  userData,
  setIsSignedIn,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [name, setName] = useState('New User');
  const [qr, setQR] = useState(null);

  const [code, onChangeCode] = React.useState('');

  // useEffect(()=>{
  //   setInterval(()=>{console.log(storage.getString('token'))}, 1000)
  // })

  React.useEffect(() => {
    if (route.params?.code) {
      console.log('scanb', route.params.code);
      onChangeCode(route.params.code);
      route.params.code = null;
    }
  }, [route.params?.code]);

  useEffect(() => {
    if (code !== '') {
      console.log(code);
      scan(code);
      onChangeCode('');
    }
  }, [code]);

  useEffect(() => {
    if (qr !== '' && qr !== null && qr !== undefined) {
      const interval = setInterval(async () => {
        const res = await checkQR(qr);
        console.log('IMPORTANT ->>>>>>>>', res.status);
        if (res.status === 200) {
          setShowQR(false);
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [qr]);

  useEffect(() => {
    if (showQR == false) setQR(null);
  }, [showQR]);

  const handleCodeGen = async () => {
    if (showQR == true) {
      setShowQR(false);
    } else {
      const res = await codegen();
      if (res.status === 200) {
        const a = await res.json();
        setQR(a.code);
        console.log(a);
        setShowQR(true);
      }
    }
  };
  const handleLogoutButton = () => {
    logout();
    setIsSignedIn(false);
    console.log('LOGOUT');
  };

  const handleProfileButton = () => {
    console.log('TO PROFILE');
    navigation.navigate('Account');
  };

  useEffect(() => {
    if (userData && userData.name) setName(userData.name);
  });

  useEffect(()=> {
    async function a(){
      const res = await stats();
      console.log(await res.json());
    }
    a();
  })

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#f0f0f0"
      />
      <View style={styles.background}>
        <View style={styles.logoutBtn}>
          <IconButton
            text="Logout"
            iconName="log-out-outline"
            onPress={handleLogoutButton}
          />
        </View>
        <View style={styles.card}>
          {isRegistered ? (
            <>
              <View style={styles.userContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    Hello{`\n`}
                    {name}
                  </Text>
                  <Text style={styles.quote}>Good to have you back</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/userImage.jpg')}
                  />
                  <Text style={styles.imageText}>@Reg No.</Text>
                </View>
              </View>
              <View style={styles.line}></View>
              {isStudent ? (
                <>
                  <View style={styles.scannerContainer}>
                    <Text style={styles.contentTitle}>Generate a QR</Text>
                    <Text style={styles.contentDesc}>
                      Get your meal by simply generating a QR code
                    </Text>
                    <IconButton
                      text="Generate QR"
                      iconName="qr-code-outline"
                      onPress={() => {
                        handleCodeGen();
                      }}
                    />
                  </View>
                  <View style={styles.line}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      justifyContent: 'center',
                    }}>
                    {showQR && toString(qr) != null ? (
                      <QRCode value={qr} />
                    ) : (
                      <></>
                    )}
                  </View>
                </>
              ) : (
                <View style={styles.scannerContainer}>
                  <Text style={styles.contentTitle}>Use the QR Scanner</Text>
                  <Text style={styles.contentDesc}>
                    Scan mess coupons to check the QRs provided for meals
                  </Text>
                  <IconButton
                    text="Scan QR"
                    iconName="scan"
                    onPress={() => {
                      navigation.navigate('QRScan');
                    }}
                  />
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.userContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Hello{`\n`}Fellow User!</Text>
                  <Text style={styles.quote}>Welcome new user</Text>
                </View>
                <View style={[styles.imageContainer, styles.falseImage]}>
                  <Text style={styles.imageText}>No{`\n`}Image</Text>
                </View>
              </View>
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                  Please complete your{`\n`}profile to unlock the app
                </Text>
                <Button onPress={handleProfileButton}>CLICK HERE</Button>
              </View>
            </>
          )}
        </View>
        {isRegistered && (
          <View style={styles.profileBtn}>
            <IconButton
              text="Go To Profile"
              iconName="person-outline"
              onPress={handleProfileButton}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0f0f0',
    padding: 16,
    alignItems: 'center',
    rowGap: 24,
  },
  logoutBtn: {
    alignSelf: 'flex-end',
    marginTop: '10%',
  },
  card: {
    marginTop: '10%',
    width: '100%',
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'white',
    rowGap: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {},
  title: {
    color: Colors.primary60,
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'left',
  },
  quote: {
    color: Colors.neutral60,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  falseImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    lineHeight: 16,
  },
  line: {
    width: '70%',
    height: 4,
    margin: 12,
    backgroundColor: Colors.primary60,
    alignSelf: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warningText: {
    color: Colors.primary60,
    fontSize: 16,
    lineHeight: 20,
  },
  scannerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  contentContainer: {
    borderWidth: 1,
  },
  contentTitle: {
    color: 'black',
    fontSize: 24,
    lineHeight: 28,
    flexBasis: '100%',
  },
  contentDesc: {
    color: Colors.neutral60,
    fontSize: 12,
    lineHeight: 16,
    width: '50%',
  },
  profileBtn: {
    alignSelf: 'flex-end',
  },
});
