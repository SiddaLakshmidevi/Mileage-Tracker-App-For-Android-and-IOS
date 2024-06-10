import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ContinueButton} from '../Buttons/ContinueButton';
import {LogoComponent} from '../ProfileComponents/LogoComponent';
import {wr} from '../Utils/WidthHeightRatio';

interface SignUpComponentProps {
  navigation: any;
}

export const SignUpComponent: React.FC<SignUpComponentProps> = ({
  navigation,
}) => {
  const handleContinue = () => {
    navigation.navigate('CreateAccount');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoComponent}>
        <LogoComponent
          viewText="Mileage Tracker"
          instructionText="Create an account to get Started"
          image={require('../../assets/images/hugo.png')}
          height={149}
          width={149}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ContinueButton
          title="Sign up"
          onPress={handleContinue}
          enableContinue={true}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoComponent: {
    flex: 4,
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
    marginRight: wr(40 / 360),
    marginTop: wr(150 / 800),
  },
});
