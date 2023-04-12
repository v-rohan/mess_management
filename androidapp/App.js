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
import Onboarding1 from './screens/Onboarding/Onboarding1';
import Onboarding2 from './screens/Onboarding/OnBoarding2';
import Onboarding3 from './screens/Onboarding/Onboarding3';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/Password/ForgotPassword';
import Verification from './screens/Verification/Verification';

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
                    <Stack.Screen name="LoginLand">
                      {props => (
                        <>
                          <LoginLand
                            {...props}
                            setIsSignedIn={setIsSignedIn}
                            setIsAdmin={setIsAdmin}
                          />
                        </>
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Registration" component={Register} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Title" component={TitleScreen} />
                    <Stack.Screen name="Onboarding1" component={Onboarding1} />
                    <Stack.Screen name="Onboarding2" component={Onboarding2} />
                    <Stack.Screen name="Onboarding3" component={Onboarding3} />
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
