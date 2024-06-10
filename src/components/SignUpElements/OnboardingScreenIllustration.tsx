import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {wr, hr} from '../Utils/WidthHeightRatio';

export const OnboardingScreenIllustration = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../../assets/images/Onboarding.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>
          Track your miles towards a prosperous financial journey!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    position: 'absolute',
    bottom: hr(25 / 800),
  },
  image: {
    width: wr(1),
    height: hr(0.5),
    backgroundColor: '#d6efeb',
  },
  textcontainer: {
    marginTop: hr(150 / 800),
  },
  text: {
    fontFamily: 'New Rubrik',
    color: '#0B3C58',
    fontSize: hr(22 / 800),
    margin: hr(25 / 800),
    fontWeight: '400',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
