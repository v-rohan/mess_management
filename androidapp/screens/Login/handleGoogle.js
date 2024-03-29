import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appLoginOrRegister} from '../../api/Api';
import {storage} from '../../App';
import {ANDROID_GOOGLE_CLIENT_ID} from '@env';

export const handleGoogleLogin = async (
  setIsSignedIn,
  setIsAdmin,
  setIsRegistered,
) => {
  GoogleSignin.configure({
    webClientId: ANDROID_GOOGLE_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    profileImageSize: 120,
  });
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const data = await GoogleSignin.getTokens();
    const res = await appLoginOrRegister(data);
    console.log(res.status);
    if (res.status === 200) {
      const a = await res.json();

      console.log(a);
      storage.set('token', a.token);
      storage.set('role', a.role);
      storage.set('isRegistered', a.profileDone);
      setIsRegistered(a.profileDone);
      if (a.role === 'admin') {
        setIsAdmin(true);
      }

      setIsSignedIn(true);
      console.log('Logged In successfully');
    } else {
      console.log('error!!');
    }
    // console.log(await GoogleSignin.getTokens());
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('inprogress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated');
    } else {
      console.log('some other error happened');
      console.log(error);
    }
  }
};
