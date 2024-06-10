import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import {Header} from '../../components/Heading/Header';
import {BackButtonHandler} from '../../components/Buttons/BackButtonHandler';
import {Passcode} from '../../components/PasscodeComponents/Passcode';
import {ContinueButton} from '../../components/Buttons/ContinueButton';
import {Userstore} from '../../Zustand/UserStore';
import {useAuthStore} from '../../Zustand/AuthStore';
import {useRoute} from '@react-navigation/native';
import {Auth} from '../../LocalDB/APIs/isAuthenticated';
import {createNewUser} from '../../LocalDB/APIs/UserUpdates';
import LinearGradient from 'react-native-linear-gradient';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';

const arrayEquals = (arr1: string | any[], arr2: string | any[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};
interface RouteParams {
  username?: string;
  email?: string;
  nickname?: string | null;
}

export const PasscodeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {username, email, nickname}: RouteParams = useRoute()?.params || {};

  const [password, setPassword] = useState(['', '', '', '']);
  const [confirmCode, setConfirmCode] = useState(['', '', '', '']);
  const [error, setError] = useState<boolean | string>(false);
  const [isEqual, setIsEqual] = useState(true);
  const {setUser} = Userstore();
  const {setAuthUser} = useAuthStore();

  useEffect(() => {
    if (
      password.every(char => char.length === 1) &&
      confirmCode.every(char => char.length === 1)
    ) {
      setIsEqual(arrayEquals(password, confirmCode));
      setError(
        password.join('') !== confirmCode.join('')
          ? 'The passcodes don’t match'
          : '',
      );
    } else {
      setIsEqual(true);
    }
  }, [password, confirmCode]);

  const enableContinue =
    password.every(char => char.length > 0) &&
    confirmCode.every(char => char.length > 0) &&
    isEqual &&
    !error;

  const handleSkip = () => {
    if (username && email) {
      try {
        const newUser = createNewUser({
          userName: username,
          email: email,
          nickName: nickname || '',
          password: password.join('') || '',
        });

        if (newUser) {
          setUser(newUser);

          const updatedUser = {
            ...newUser,
            isLoggedIn: true,
            password: '',
          };
          Auth.isAuthenticatedUser(updatedUser);
          setAuthUser(updatedUser);
          navigation.navigate('NavigationContainer', {
            user: updatedUser,
          });
        } else {
          setError('Failed to create user. Check the input data.');
          console.error('Failed to create user. Check the input data.');
        }
      } catch (e) {
        console.log(e);
        setError('An error occurred while skipping');
      }
    } else {
      setError('Username and email are required');
    }
  };
  const handleContinue = () => {
    const pass = password.join('');
    const verifyPass = confirmCode.join('');

    if (pass === verifyPass && username && email) {
      try {
        const newUser = createNewUser({
          userName: username,
          email: email,
          nickName: nickname || '',
          password: pass || '',
        });

        if (newUser) {
          setUser(newUser);

          const updateduser = {
            ...newUser,
            isLoggedIn: true,
            password: newUser.password || undefined,
          };
          Auth.isAuthenticatedUser(updateduser);
          setAuthUser(updateduser);
        } else {
          setError('Failed to create user. Check the input data.');
          console.error('Failed to create user. Check the input data.');
        }
      } catch (e) {
        console.log(e);
        setError('The passcodes don’t match');
      }
    } else {
      setError('The passcodes don’t match');
    }
  };
  if (typeof error === 'string' && error.length > 0) {
    setTimeout(() => {
      setError('');
    }, 5000);
  }

  return (
    <ScrollView>
      <LinearGradient style={styles.container} colors={['#D0EAEA', '#F6F6EC']}>
        <View style={styles.backButtonContainer}>
          <BackButtonHandler
            onPress={() => {
              navigation.navigate('CreateAccount');
            }}
          />
        </View>
        <View style={styles.Passcode}>
          <View style={styles.HeadingContainer}>
            <Header title="Set a Passcode" />
          </View>
          <Passcode
            password={password}
            setPassword={setPassword}
            instructionText1="Enter a 4-Digit Passcode"
            instructionText2="You will need to enter at every app launch"
          />
          <Passcode
            password={confirmCode}
            setPassword={setConfirmCode}
            instructionText1="Confirm Passcode"
            instructionText2={''}
          />
          {error && !isEqual ? (
            <View style={styles.errormsg}>
              <Image
                source={require('../../assets/images/Medium.png')}
                style={styles.image}
              />
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.buttons}>
          <ContinueButton
            onPress={handleContinue}
            title="Continue"
            enableContinue={enableContinue}
          />
        </View>
        <View style={styles.skip}>
          <TouchableWithoutFeedback onPress={handleSkip}>
            <Text style={styles.skiptext}>Skip</Text>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonContainer: {
    height: hr(80 / 800),
    marginTop: hr(20 / 800),
  },
  Passcode: {
    height: hr(540 / 800),
  },
  confirmCode: {
    marginHorizontal: 8,
    padding: 8,
  },
  buttons: {
    alignItems: 'center',
    marginRight: wr(40 / 360),
  },
  skip: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hr(48 / 800),
    width: wr(284 / 360),
  },
  skiptext: {
    fontSize: hr(16 / 800),
    textAlign: 'center',
    marginLeft: wr(70 / 360),
    fontFamily: ' New Rubrik',
    color: '#0B3C58',
  },
  HeadingContainer: {
    padding: 8,
  },
  error: {
    color: '#FF4E4E',
    fontSize: hr(12 / 800),
  },
  errormsg: {
    flexDirection: 'row',
    marginLeft: wr(20 / 360),
  },
  image: {
    height: hr(16 / 800),
    width: wr(16 / 360),
  },
});
