import {
  Dimensions,
  Image,
  ScrollView,
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
import CouponDisplay from '../../components/visuals/CouponDisplay';
import CouponCounter from '../../components/visuals/CouponCounter';
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

  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [snacks, setSnacks] = useState();
  const [dinner, setDinner] = useState();

  const [stats, setStats] = useState({
    daily: {breakfast: 0, lunch: 0, snacks: 0, dinner: 0},
    monthly: {breakfast: 0, lunch: 0, snacks: 0, dinner: 0},
    yearly: {breakfast: 0, lunch: 0, snacks: 0, dinner: 0},
  });

  // const [dailyBreakfast, setDailyBreakfast] = useState();
  // const [dailyLunch, setDailyLunch] = useState();
  // const [dailySnacks, setDailySnacks] = useState();
  // const [dailyDinner, setDailyDinner] = useState();

  // const [monthlyBreakfast, setMonthlyBreakfast] = useState();
  // const [monthlyLunch, setMonthlyLunch] = useState();
  // const [monthlySnacks, setMonthlySnacks] = useState();
  // const [monthlyDinner, setMonthlyDinner] = useState();

  // const [yearlyBreakfast, setYearlyBreakfast] = useState();
  // const [yearlyLunch, setYearlyLunch] = useState();
  // const [yearlySnacks, setYearlySnacks] = useState();
  // const [yearlyDinner, setYearlyDinner] = useState();

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

  useEffect(() => {
    async function a() {
      const res = await stats();
      const resJson = await res.json();
      console.log(resJson);
      if (isStudent === true) {
        setBreakfast(resJson.break_no);
        setDinner(resJson.din_no);
        setLunch(resJson.lunch_no);
        setSnacks(resJson.sn_no);
      } else {
        // setDailyBreakfast(resJson.breakfast_day_no);
        // setMonthlyBreakfast(resJson.breakfast_month_no);
        // setYearlyBreakfast(resJson.breakfast_yearly_no);

        // setDailyLunch(resJson.lunch_day_no);
        // setMonthlyLunch(resJson.lunch_month_no);
        // setYearlyLunch(resJson.lunch_yearly_no);

        // setDailySnacks(resJson.sn_day_no);
        // setMonthlySnacks(resJson.sn_month_no);
        // setYearlySnacks(resJson.sn_yearly_no);

        // setDailyDinner(resJson.din_day_no);
        // setMonthlyDinner(resJson.din_month_no);
        // setYearlyDinner(resJson.din_yearly_no);

        const dailyStats = {
          breakfast: resJson.breakfast_day_no,
          lunch: resJson.lunch_day_no,
          snacks: resJson.sn_day_no,
          dinner: resJson.dinner_day_no,
        };

        const monthlyStats = {
          breakfast: resJson.breakfast_month_no,
          lunch: resJson.lunch_month_no,
          snacks: resJson.sn_month_no,
          dinner: resJson.dinner_month_no,
        };

        const yearlyStats = {
          breakfast: resJson.breakfast_yearly_no,
          lunch: resJson.lunch_yearly_no,
          snacks: resJson.sn_yearly_no,
          dinner: resJson.dinner_yearly_no,
        };

        setStats(prevState => {
          return {
            ...prevState,
            daily: dailyStats,
            monthly: monthlyStats,
            yearly: yearlyStats,
          };
        });
      }
    }
    a();
  });

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#f0f0f0"
      />
      <ScrollView>
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
                    <Text style={styles.title}>Hello {name}</Text>
                    <Text style={styles.quote}>Good to have you back</Text>
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
                    <View
                      style={{
                        flexDirection: 'column',
                        rowGap: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {showQR && toString(qr) != null && (
                        <>
                          <View style={styles.line}></View>
                          <QRCode value={qr} color={Colors.primary60} />
                        </>
                      )}
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.statsContainer}>
                      <Text style={styles.contentTitle}>
                        Number of coupons available
                      </Text>
                      <CouponDisplay
                        breakfast={breakfast}
                        lunch={lunch}
                        snacks={snacks}
                        dinner={dinner}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.scannerContainer}>
                      <Text style={styles.contentTitle}>
                        Use the QR Scanner
                      </Text>
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
                    <View style={styles.line}></View>
                    <View style={styles.statsContainer}>
                      <Text style={styles.contentTitle}>Usage of Coupons</Text>
                      <CouponCounter stats={stats} />
                      {/* <View style={styles.statsBox}>
                        <Text style={[styles.statsFirstText, {width: '25%'}]}>
                          {}
                        </Text>
                        <Text style={styles.statsText}>Daily</Text>
                        <Text style={styles.statsText}>Monthly</Text>
                        <Text style={styles.statsText}>Yearly</Text>
                      </View>
                      <View style={styles.statsBox}>
                        <Text style={[styles.statsText, styles.statsFirstText]}>
                          Breakfast
                        </Text>
                        <Text style={styles.statsText}>{dailyBreakfast}</Text>
                        <Text style={styles.statsText}>{monthlyBreakfast}</Text>
                        <Text style={styles.statsText}>{yearlyBreakfast}</Text>
                      </View>
                      <View style={styles.statsBox}>
                        <Text style={[styles.statsText, styles.statsFirstText]}>
                          Lunch
                        </Text>
                        <Text style={styles.statsText}>{dailyLunch}</Text>
                        <Text style={styles.statsText}>{monthlyLunch}</Text>
                        <Text style={styles.statsText}>{yearlyLunch}</Text>
                      </View>
                      <View style={styles.statsBox}>
                        <Text style={[styles.statsText, styles.statsFirstText]}>
                          Snacks
                        </Text>
                        <Text style={styles.statsText}>{dailySnacks}</Text>
                        <Text style={styles.statsText}>{monthlySnacks}</Text>
                        <Text style={styles.statsText}>{yearlySnacks}</Text>
                      </View>
                      <View style={styles.statsBox}>
                        <Text style={[styles.statsText, styles.statsFirstText]}>
                          Dinner
                        </Text>
                        <Text>{dailyDinner}</Text>
                        <Text>{monthlyDinner}</Text>
                        <Text>{yearlyDinner}</Text>
                      </View> */}
                    </View>
                  </>
                )}
              </>
            ) : (
              <>
                <View style={styles.userContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>Hello Fellow User!</Text>
                    <Text style={styles.quote}>
                      Welcome to the mess management application
                    </Text>
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
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    marginTop: '2%',
    width: '100%',
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'white',
    rowGap: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
  },
  title: {
    color: Colors.primary60,
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  quote: {
    color: Colors.neutral60,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
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
  statsContainer: {
    justifyContent: 'center',
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    color: Colors.neutral60,
  },
  statsFirstText: {
    width: '20%',
  },
});
