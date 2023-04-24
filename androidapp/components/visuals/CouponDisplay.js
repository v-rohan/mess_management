import {StyleSheet, View} from 'react-native';
import React from 'react';
import ProgressBar from './ProgressBar';
import Colors from '../../constants/Colors';

const CouponDisplay = ({breakfast, lunch, snacks, dinner}) => {
  return (
    <View style={styles.container}>
      <View style={styles.metricContainer}>
        <ProgressBar
          fgColor={Colors.primary70}
          bgColor={Colors.primary80}
          baseCoupons={20}
          currentCoupons={breakfast}
          title="Breakfast"
        />
        <ProgressBar
          fgColor={Colors.secondary70}
          bgColor={Colors.secondary80}
          baseCoupons={20}
          currentCoupons={lunch}
          title="Lunch"
        />
        <ProgressBar
          fgColor={Colors.tertiary70}
          bgColor={Colors.tertiary80}
          baseCoupons={20}
          currentCoupons={snacks}
          title="Snacks"
        />
        <ProgressBar
          fgColor={Colors.neutral70}
          bgColor={Colors.neutral80}
          baseCoupons={20}
          currentCoupons={dinner}
          title="Dinner"
        />
      </View>
    </View>
  );
};

export default CouponDisplay;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  metricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 16,
    padding: 8,
  },
  outerContainer: {
    rowGap: 4,
    alignItems: 'center',
  },
  innerContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.primary80,
  },
  fg: {
    position: 'absolute',
    bottom: 0,
    height: '70%',
    width: '100%',
    backgroundColor: Colors.primary70,
  },
  couponTxt: {
    marginVertical: 35,
    marginHorizontal: 22,
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  titleTxt: {
    fontSize: 16,
    lineHeight: 20,
    color: 'black',
  },
});
