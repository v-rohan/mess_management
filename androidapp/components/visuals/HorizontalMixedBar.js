import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const HorizontalMixedBar = ({breakfast, lunch, snacks, dinner}) => {
  const total = breakfast + lunch + snacks + dinner;
  const bar1Width = (breakfast / total) * 100;
  const bar2Width = (lunch / total) * 100;
  const bar3Width = (snacks / total) * 100;
  const bar4Width = (dinner / total) * 100;

  return (
    <View style={styles.container}>
      {breakfast && (
        <View
          style={[
            styles.bar,
            {width: `${bar1Width}%`, backgroundColor: Colors.primary80},
          ]}>
          <Text style={styles.txt}>{breakfast}</Text>
        </View>
      )}
      {lunch && (
        <View
          style={[
            styles.bar,
            {width: `${bar2Width}%`, backgroundColor: Colors.tertiary70},
          ]}>
          <Text style={styles.txt}>{lunch}</Text>
        </View>
      )}
      {snacks && (
        <View
          style={[
            styles.bar,
            {width: `${bar3Width}%`, backgroundColor: Colors.secondary80},
          ]}>
          <Text style={styles.txt}>{snacks}</Text>
        </View>
      )}
      {dinner && (
        <View
          style={[
            styles.bar,
            {width: `${bar4Width}%`, backgroundColor: Colors.neutral90},
          ]}>
          <Text style={styles.txt}>{dinner}</Text>
        </View>
      )}
    </View>
  );
};

export default HorizontalMixedBar;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
  },
  bar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginVertical: 12,
  },
});
