import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const VerticalProgressBar = ({
  fgColor,
  bgColor,
  baseCoupons,
  currentCoupons,
  title,
}) => {
  if (currentCoupons === undefined) currentCoupons = 0;

  const fgHeight = (currentCoupons / baseCoupons) * 100;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={[styles.bg, {backgroundColor: bgColor}]}></View>
        <View
          style={[
            styles.fg,
            {backgroundColor: fgColor, height: `${fgHeight}%`},
          ]}></View>
        <View style={styles.couponTxtContainer}>
          <Text style={styles.couponTxt}>{currentCoupons}</Text>
        </View>
      </View>
      <Text style={styles.titleTxt}>{title}</Text>
    </View>
  );
};

export default VerticalProgressBar;

const styles = StyleSheet.create({
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
  },
  fg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  couponTxtContainer: {
    marginVertical: 35,
    marginHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
  },
  couponTxt: {
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
