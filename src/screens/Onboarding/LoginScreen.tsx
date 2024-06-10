import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {realmConfig} from '../../LocalDB/APIs/Config';
import {Userstore} from '../../Zustand/UserStore';
import {useAuthStore} from '../../Zustand/AuthStore';
import {getUserById} from '../../LocalDB/APIs/UserUpdates';
import {Auth} from '../../LocalDB/APIs/isAuthenticated';
import {Header} from '../../components/Heading/Header';
import {Passcode} from '../../components/PasscodeComponents/Passcode';
import LinearGradient from 'react-native-linear-gradient';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';

interface loginProps {
  route: any;
}

export const LoginScreen: React.FC<loginProps> = ({route}) => {
  const {item} = route?.params || {};
  const authState = realmConfig.objects('isAuthenticated')[0];
  const [password, setPassword] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const {setUser} = Userstore();
  const {setAuthUser} = useAuthStore();

  useEffect(() => {
    const checkPassword = () => {
      const pass = password.join('');

      try {
        if (item && pass === item.password) {
          const userData = getUserById(item.user_id);
          setUser(userData);

          const updateduser = {
            ...userData,
            isLoggedIn: true,
          };
          Auth.isAuthenticatedUser(updateduser);
          setAuthUser(updateduser);
        } else if (pass === authState.password) {
          const userData = getUserById(authState.user_id as string);
          setUser(userData);

          const updateduser = {
            ...userData,
            isLoggedIn: true,
          };
          Auth.isAuthenticatedUser(updateduser);
          setAuthUser(updateduser);
        } else {
          setError('Your Password is Wrong');
        }
      } catch (error) {
        console.error('Error checking password:', error);
        setError('An error occurred while checking the password.');
      }
    };

    if (password[password.length - 1] !== '') {
      checkPassword();
    }
  }, [authState, item, password, setAuthUser, setUser]);

  return (
    <LinearGradient style={styles.container} colors={['#D0EAEA', '#F6F6EC']}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Header title="Welcome back!" />
        </View>
        <View style={styles.passcode}>
          <Passcode
            password={password}
            setPassword={setPassword}
            instructionText1="Enter a 4-Digit Passcode"
            instructionText2="Just checking it’s really you!"
          />
        </View>
        {error && (
          <View style={styles.errormsg}>
            <Image
              source={require('../../assets/images/Medium.png')}
              style={styles.image}
            />
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    marginTop: hr(60 / 800),
    marginLeft: wr(8 / 360),
  },
  passcode: {
    justifyContent: 'space-between',
  },
  error: {
    color: '#FF4E4E',
    fontSize: hr(12 / 800),
  },
  errormsg: {
    marginTop: hr(5 / 800),
    flexDirection: 'row',
    marginLeft: wr(20 / 360),
  },
  image: {
    height: hr(16 / 800),
    width: wr(16 / 360),
  },
});
