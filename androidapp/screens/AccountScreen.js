import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackButton from '../components/ui/BackButton';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AccountScreen = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState();
  const [rollNo, setRollNo] = useState();
  const [dept, setDept] = useState();
  const [hallNo, setHallNo] = useState();

  const rollNoRef = useRef();
  const deptRef = useRef();
  const hallNoRef = useRef();

  //   useEffect(() => {
  //     console.log('GET DATA OF USER');
  //     console.log('SET INPUT VALUES TO IT');
  //   }, []);

  const handleEditProfile = () => {
    setName();
    setRollNo();
    setDept();
    setHallNo();

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

  const handleSaveChanges = () => {
    const data = {
      name,
      rollNo,
      dept,
      hallNo,
    };

    console.log('SEND DATA TO BACKEND', data);
    setIsEditing(prevState => !prevState);
  };

  const handleBackButton = () => {
    console.log("GO BACK")
    navigation.goBack();
  }

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
            nextRef={rollNoRef}
            editable={isEditing}
          />
          <Input
            placeholder="Roll Number"
            value={rollNo}
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
            value={hallNo}
            onChangeText={setHallNo}
            ref={hallNoRef}
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
