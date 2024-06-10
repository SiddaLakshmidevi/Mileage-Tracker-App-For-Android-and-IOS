import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ContinueButton} from '../../components/Buttons/ContinueButton';
import {LogoComponent} from '../../components/ProfileComponents/LogoComponent';
import RNRestart from 'react-native-restart';

export const ErrorScreen = ({action = 'Restart App'}) => {
  const handleRestart = () => {
    RNRestart.Restart();
  };

  return (
    <LinearGradient colors={['#D0EAEA', '#F6F6EC']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.fillWidth, styles.hugHeight]}>
          <View style={styles.logoComponent}>
            <LogoComponent
              image={require('../../assets/images/Error.png')}
              viewText={''}
              instructionText={''}
              height={0}
              width={0}
            />
          </View>
          <View style={styles.oopsContainer}>
            <Text style={styles.oops}>Oops!</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>Something went wrong.</Text>
            <Text style={styles.message}>please try again later!</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ContinueButton
            title={action}
            onPress={handleRestart}
            enableContinue={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  fillWidth: {
    width: 324,
  },
  hugHeight: {
    height: 394,
  },
  logoComponent: {
    alignItems: 'center',
    marginVertical: 90,
    paddingBottom: 60,
  },
  oopsContainer: {
    alignItems: 'center',
    paddingBottom: 36,
  },
  oops: {
    fontFamily: 'New Rubrik',
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 46,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#0B3C58',
  },
  message: {
    fontFamily: 'New Rubrik',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.15000000596046448,
    textAlign: 'center',
    color: '#0B3C58',
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 40,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    width: 284,
    height: 48,
    padding: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 28,
    paddingRight: 45,
  },
});
