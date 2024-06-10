import React, {useLayoutEffect} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {SignUpComponent} from '../../components/SignUpElements/SignUpComponent';
import {OnboardingScreenIllustration} from '../../components/SignUpElements/OnboardingScreenIllustration';
import {LandingScreen} from './landingScreen';
import LinearGradient from 'react-native-linear-gradient';
import {hr} from '../../components/Utils/WidthHeightRatio';

interface signUpProp {
  navigation: any;
}

export const SignUpScreen: React.FC<signUpProp> = ({navigation}) => {
  useLayoutEffect(() => {
    setTimeout(() => {
      <LandingScreen />;
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#d6edeb', '#d6edeb']}
          style={styles.container1}>
          <SignUpComponent navigation={navigation} />
        </LinearGradient>
      </View>
      <View style={styles.container2}>
        <OnboardingScreenIllustration />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    height: hr(374 / 800),
  },
  container2: {
    height: hr(0.5),
    position: 'absolute',
    bottom: 0,
  },
});
