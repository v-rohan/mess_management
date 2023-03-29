import {
  ImageBackground,
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {getHeaderTitle} from '@react-navigation/elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {LoginLand} from './pages/Login/LoginLand';
import {QRgen} from './pages/QR/QRgen';
import QRScan from './pages/QR/QRScan';
import {MMKV} from 'react-native-mmkv';

const Stack = createNativeStackNavigator();

export const storage = new MMKV();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 1200);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      marginTop: Platform.OS === 'ios' ? 20 : 10,
    },
  });

  Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
  };
  TextInput.defaultProps = {
    ...(TextInput.defaultProps || {}),
    allowFontScaling: false,
  };

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <Stack.Navigator
            screenOptions={{
              header: ({navigation, route, options, back}) => {
                const title = getHeaderTitle(options, route.name);

                return (
                  <View style={styles.header}>
                    <Text> </Text>
                  </View>
                );
              },
            }}>
            {isLoading ? (
              <Stack.Screen
                name="Splash"
                component={() => {
                  return (
                    <>
                      <View>
                        <Text>Loading</Text>
                      </View>
                    </>
                  );
                }}
              />
            ) : (
              <>
                {isSignedIn ? (
                  <>
                    <Stack.Screen name={'Home'} component={HomeScreen} />
                    <Stack.Screen name={'Help'} component={HelpScreen} />
                    <Stack.Screen name={'Share'} component={ShareScreen} />
                    <Stack.Screen name={'Refer'} component={ReferScreen} />
                    <Stack.Screen name={'ClickId'} component={ClickId} />
                    <Stack.Screen name={'Search'} component={SearchScreen} />
                    <Stack.Screen name={'AddBank'} component={AddPaymentBank} />
                    <Stack.Screen
                      name={'Notifications'}
                      component={Notifications}
                    />
                    <Stack.Screen
                      name={'Missing Claims'}
                      component={MissingClaims}
                    />
                    <Stack.Screen
                      name={'AddPaytm'}
                      component={AddPaymentPaytm}
                    />
                    <Stack.Screen name="Account">
                      {props => (
                        <AccountScreen
                          {...props}
                          setIsSignedIn={setIsSignedIn}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name={'AccountSettings'}>
                      {props => (
                        <AccountSettings
                          {...props}
                          isVerified={isVerfied}
                          setVerified={setVerified}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name={'Withdraw'} component={Withdraw} />
                    <Stack.Screen name={'ViewAll'} component={ViewAll} />
                    <Stack.Screen
                      name={'ShowAllLinks'}
                      component={ShowAllLinks}
                    />
                    <Stack.Screen
                      name={'ViewInDetail'}
                      component={ViewInDetail}
                    />
                  </>
                ) : (
                  <>
                
                    <Stack.Screen name="LoginLand">
                      {props => (
                        <>
                          <LoginLand {...props} setIsSignedIn={setIsSignedIn} />
                        </>
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="QRScan">
                      {props => (
                        <>
                          <QRScan {...props} setIsSignedIn={setIsSignedIn} />
                        </>
                      )}
                    </Stack.Screen>
                    
                    <Stack.Screen name="QRgen">
                      {props => (
                        <>
                          <QRgen {...props} setIsSignedIn={setIsSignedIn} />
                        </>
                      )}
                    </Stack.Screen>
                  </>
                )}
              </>
            )}
          </Stack.Navigator> */}
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </>
  );

  // <View style={styles.container}>
  //   <Text>Mess Manager, hello world!</Text>
  //   <StatusBar style="auto" />
  //   <View>
  //   <QRCode value="hillybilly" />
  //   </View>
  // </View>
}
