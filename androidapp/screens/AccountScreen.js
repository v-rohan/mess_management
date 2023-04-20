import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackButton from '../components/ui/BackButton';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import {editProfile, userInfo} from '../api/Api';
import {storage} from '../App';

const AccountScreen = ({navigation, setIsRegistered, setUserData}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState();
  const [roll, setRollNo] = useState();
  const [dept, setDept] = useState();
  const [mobile, setPhone] = useState();
  const [hall, setHallNo] = useState();

  const nameRef = useRef();
  const rollNoRef = useRef();
  const deptRef = useRef();
  const hallNoRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    async function dataPopulation() {
      console.log('GET DATA OF USER');
      const res = await userInfo();
      const a = await res.json();

      setName(a.user.name);
      setRollNo(a.user.roll);
      setDept(a.user.dept);
      setPhone(a.user.mobile);
      setHallNo(a.user.hall);
      console.log('SET INPUT VALUES TO IT');
    }
    dataPopulation();
  }, []);

  const handleEditProfile = () => {
    // setName();
    // setRollNo();
    // setDept();
    // setHallNo();
    // setPhone();

    setIsEditing(prevState => !prevState);
  };

  const handleCancelChanges = () => {
    console.log('GET LATEST DATA AND SET THE DATA');

    // setName();
    // setRollNo();
    // setDept();
    // setHallNo();
    setIsEditing(prevState => !prevState);
  };

  const handleSaveChanges = async () => {
    const data = {
      name,
      roll,
      dept,
      hall,
      mobile,
    };

    const res = await editProfile(data);
    const a = await res.json();

    setUserData(a);

    setIsRegistered(a.profileDone);
    storage.set('isRegistered', a.profileDone);

    //console.log('SEND DATA TO BACKEND', data);
    setIsEditing(prevState => !prevState);
  };

  const handleBackButton = () => {
    console.log('GO BACK');
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#f0f0f0"
      />
      <View style={styles.background}>
        <View style={styles.backBtnContainer}>
          <BackButton onPress={handleBackButton} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account{'\n'}Information</Text>
        </View>
        <View style={styles.form}>
          <Input
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            ref={nameRef}
            nextRef={rollNoRef}
            editable={isEditing}
          />
          <Input
            placeholder="Roll Number"
            value={roll}
            onChangeText={setRollNo}
            ref={rollNoRef}
            nextRef={deptRef}
            editable={isEditing}
          />
          <Input
            placeholder="Department"
            value={dept}
            onChangeText={setDept}
            ref={deptRef}
            nextRef={hallNoRef}
            editable={isEditing}
          />
          <Input
            placeholder="Hall Number"
            value={hall}
            onChangeText={setHallNo}
            ref={hallNoRef}
            nextRef={phoneRef}
            editable={isEditing}
          />
          <Input
            placeholder="Phone Number"
            value={mobile}
            onChangeText={setPhone}
            ref={phoneRef}
            editable={isEditing}
          />
          <View style={styles.btnsContainer}>
            {isEditing ? (
              <>
                <Button onPress={handleCancelChanges} isSecondary>
                  CANCEL
                </Button>
                <Button onPress={handleSaveChanges}>SAVE</Button>
              </>
            ) : (
              <Button onPress={handleEditProfile}>EDIT PROFILE</Button>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f0f0f0',
    padding: 16,
    alignItems: 'center',
  },
  backBtnContainer: {
    marginTop: '15%',
    alignSelf: 'flex-start',
  },
  titleContainer: {
    marginTop: 12,
  },
  title: {
    color: 'black',
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  form: {
    marginTop: 32,
    rowGap: 12,
  },
  btnsContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    columnGap: 24,
  },
});
