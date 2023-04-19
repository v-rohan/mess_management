import {StyleSheet, View, Platform, Text, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {getHeaderTitle} from '@react-navigation/elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {MMKV} from 'react-native-mmkv';
import {LoginLand} from './screens/Login/LoginLand';
import {QRgen} from './screens/QR/QRgen';
import QRScan from './components/QRScan';
import {Home} from './screens/Home/index';
import Register from './screens/Reg/Register';
import TitleScreen from './screens/Onboarding/TitleScreen';
import Onboarding from './screens/Onboarding/Onboarding';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/Password/ForgotPassword';
import Verification from './screens/Verification/Verification';
import PhoneNo from './screens/PhoneNo/PhoneNo';
import ResetPassword from './screens/Password/ResetPassword';

const Stack = createNativeStackNavigator();

export const storage = new MMKV();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

  const LoadingScreen = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
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
              <Stack.Screen name="Splash" component={LoadingScreen} />
            ) : (
              <>
                {isSignedIn ? (
                  <>
                    <Stack.Screen name="QRgen">
                      {props => (
                        <>
                          <QRgen {...props} setIsSignedIn={setIsSignedIn} />
                        </>
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Home">
                      {props => (
                        <>
                          <Home {...props} setIsSignedIn={setIsSignedIn} />
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
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Title" component={TitleScreen} />
                    <Stack.Screen
                      name="Onboarding1"
                      initialParams={{onboardScreenId: 1}}>
                      {props => (
                        <Onboarding
                          {...props}
                          imgSrc={require('./assets/images/quick-nobg.png')}
                          imgAspectRatio={1.5}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Onboarding2">
                      {props => (
                        <Onboarding
                          {...props}
                          imgSrc={require('./assets/images/qr-nobg.png')}
                          imgAspectRatio={0.95}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Onboarding3">
                      {props => (
                        <Onboarding
                          {...props}
                          imgSrc={require('./assets/images/online-pay-nobg.png')}
                          imgAspectRatio={1.125}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Registration">
                      {props => (
                        <>
                          <Register {...props} setIsSignedIn={setIsSignedIn} setIsAdmin={setIsAdmin} />
                        </>
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Login">
                      {props => (
                        <>
                          <Login {...props} setIsSignedIn={setIsSignedIn} setIsAdmin={setIsAdmin} />
                        </>
                      )}
                    </Stack.Screen>
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />
                    <Stack.Screen name="VerificationEmail">
                      {props => (
                        <Verification
                          {...props}
                          title="Email"
                          text="email"
                          content="a@gmail.com"
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="VerificationPhone">
                      {props => (
                        <Verification
                          {...props}
                          title="Phone Number"
                          text="number"
                          content="+91 00000 11111"
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="PhoneNo" component={PhoneNo} />
                    <Stack.Screen
                      name="ResetPassword"
                      component={ResetPassword}
                    />
                  </>
                )}
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </>
  );
}
