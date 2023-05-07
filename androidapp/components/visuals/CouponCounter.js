import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HorizontalMixedBar from './HorizontalMixedBar';
import Colors from '../../constants/Colors';

const CouponCounter = ({stats}) => {
  //const {daily, monthly, yearly} = stats;

  useEffect(() => {
    console.log('abcddddddd');
    console.log(stats);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <HorizontalMixedBar
          breakfast={stats[0].breakfast}
          lunch={stats[0].lunch}
          snacks={stats[0].snacks}
          dinner={stats[0].dinner}
        />
        <Text style={styles.barTxt}>Daily</Text>
      </View>
      <View style={styles.barContainer}>
        <HorizontalMixedBar
          breakfast={stats[1].breakfast}
          lunch={stats[1].lunch}
          snacks={stats[1].snacks}
          dinner={stats[1].dinner}
        />
        <Text style={styles.barTxt}>Monthly</Text>
      </View>
      <View style={styles.barContainer}>
        <HorizontalMixedBar
          breakfast={stats[2].breakfast}
          lunch={stats[2].lunch}
          snacks={stats[2].snacks}
          dinner={stats[2].dinner}
        />
        <Text style={styles.barTxt}>Yearly</Text>
      </View>
      <View style={styles.legendContainer}>
        <Text style={styles.title}>Legend</Text>
        <View style={styles.labelsContainer}>
          <View style={styles.label}>
            <View
              style={[
                styles.labelBox,
                {backgroundColor: Colors.primary80},
              ]}></View>
            <Text style={styles.labelTxt}>: Breakfast</Text>
          </View>
          <View style={styles.label}>
            <View
              style={[
                styles.labelBox,
                {backgroundColor: Colors.tertiary70},
              ]}></View>
            <Text style={styles.labelTxt}>: Lunch</Text>
          </View>
          <View style={styles.label}>
            <View
              style={[
                styles.labelBox,
                {backgroundColor: Colors.secondary80},
              ]}></View>
            <Text style={styles.labelTxt}>: Snacks</Text>
          </View>
          <View style={styles.label}>
            <View
              style={[
                styles.labelBox,
                {backgroundColor: Colors.neutral90},
              ]}></View>
            <Text style={styles.labelTxt}>: Dinner</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CouponCounter;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    rowGap: 12,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barTxt: {
    fontSize: 12,
    lineHeight: 16,
    color: 'black',
    fontWeight: '500',
    marginTop: 2,
  },
  legendContainer: {
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
    fontWeight: '500',
    marginBottom: 8,
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  label: {
    flexDirection: 'row',
    columnGap: 4,
    flexBasis: '50%',
  },
  labelBox: {
    width: 60,
    height: 20,
    borderWidth: 0.5,
  },
  labelTxt: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.neutral60,
  },
});
