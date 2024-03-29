import {StyleSheet, View, Platform, Text, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {getHeaderTitle} from '@react-navigation/elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {MMKV} from 'react-native-mmkv';
import {QRgen} from './screens/QR/QRgen';
import QRScan from './screens/QR/QRScan';
import {Home} from './screens/Home/index';
import Register from './screens/Reg/Register';
import TitleScreen from './screens/Onboarding/TitleScreen';
import Onboarding from './screens/Onboarding/Onboarding';
import Login from './screens/Login/Login';
import ForgotPassword from './screens/Password/ForgotPassword';
import Verification from './screens/Verification/Verification';
import PhoneNo from './screens/PhoneNo/PhoneNo';
import ResetPassword from './screens/Password/ResetPassword';
import PasswordResetSuccess from './screens/Password/PasswordResetSuccess';
import HomeScreen from './screens/Home/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import {logout, userInfo} from './api/Api';

const Stack = createNativeStackNavigator();

export const storage = new MMKV();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 1200);
  }, []);

  useEffect(() => {
    console.log('userdata in app.js - ', userData);
  }, [userData]);

  const userDataSet = async () => {
    const userInfoRes = await userInfo();
    const userInf = await userInfoRes.json();
    //console.log(userInf);
    setUserData(userInf.user);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSignedIn) {
      console.log('signed in fetching user data');
      userDataSet();
    }
  }, [isSignedIn]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await storage.getString('token');
        if (token) {
          // We have token!!
          setIsSignedIn(true);
          const role = await storage.getString('role');
          const isRegistered = storage.getBoolean('isRegistered');

          console.log(token, role, isRegistered);
          setIsLoading(true);
          setIsRegistered(isRegistered);
          if (role !== null) {
            if (role === 'admin') setIsAdmin(true);
          } else {
            console.log('logout here');
            logout();
            setIsSignedIn(false);
          }

          // userDataSet();
          //   await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    };
    getToken();
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
                    <Stack.Screen name="HomeScreen">
                      {props => (
                        <HomeScreen
                          {...props}
                          isRegistered={isRegistered}
                          isStudent={!isAdmin}
                          userData={userData}
                          userDataSet={userDataSet}
                          setIsSignedIn={setIsSignedIn}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Account">
                      {props => (
                        <AccountScreen
                          {...props}
                          setIsRegistered={setIsRegistered}
                          setUserData={setUserData}
                          //isStudent={!isAdmin}
                        />
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="QRgen">
                      {props => (
                        <>
                          <QRgen {...props} setIsSignedIn={setIsSignedIn} />
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
                ) : (
                  <>
                    {/* <Stack.Screen name="LoginLand">
                      {props => (
                        <>
                          <LoginLand
                            {...props}
                            setIsSignedIn={setIsSignedIn}
                            setIsAdmin={setIsAdmin}
                          />
                        </>
                      )}
                    </Stack.Screen> */}

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
                          <Register
                            {...props}
                            setIsSignedIn={setIsSignedIn}
                            setIsAdmin={setIsAdmin}
                            setIsRegistered={setIsRegistered}
                          />
                        </>
                      )}
                    </Stack.Screen>
                    <Stack.Screen name="Login">
                      {props => (
                        <>
                          <Login
                            {...props}
                            setIsSignedIn={setIsSignedIn}
                            setIsAdmin={setIsAdmin}
                            setIsRegistered={setIsRegistered}
                          />
                        </>
                      )}
                    </Stack.Screen>

                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />

                    <Stack.Screen name="PhoneNo" component={PhoneNo} />
                    <Stack.Screen
                      name="ResetPassword"
                      component={ResetPassword}
                    />
                    <Stack.Screen
                      name="ResetPasswordSuccess"
                      component={PasswordResetSuccess}
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
