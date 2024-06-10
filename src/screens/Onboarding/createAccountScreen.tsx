import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {BackButtonHandler} from '../../components/Buttons/BackButtonHandler';
import {AccountInputs} from '../../components/CreateAccount/AccountInputs';
import {ConfirmAndContinue} from '../../components/CreateAccount/ConfirmAndContinue';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from '../../components/Heading/Header';

interface props {
  navigation: any;
}

export const CreateAccountScreen: React.FC<props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorNickname, setErrorNickname] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const enableContinue =
    username.length !== 0 &&
    email.length !== 0 &&
    errorUsername.length === 0 &&
    errorEmail.length === 0 &&
    errorNickname.length === 0;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient style={styles.container} colors={['#D0EAEA', '#F6F6EC']}>
        <View style={styles.container1}>
          <BackButtonHandler
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Header title={'Create Account'} />
          <AccountInputs
            username={username}
            setUsername={setUsername}
            nickname={nickname}
            setNickname={setNickname}
            email={email}
            setEmail={setEmail}
            errorUsername={errorUsername}
            errorNickname={errorNickname}
            errorEmail={errorEmail}
            setErrorUsername={setErrorUsername}
            setErrorNickname={setErrorNickname}
            setErrorEmail={setErrorEmail}
          />
        </View>
        <View style={styles.container2}>
          <ConfirmAndContinue
            onPress={() =>
              navigation.navigate('SetPassword', {
                username,
                email,
                nickname,
              })
            }
            enableContinue={enableContinue}
            disabled={false}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    marginTop: hr(20 / 800),
    width: wr(1),
    height: hr(511 / 800),
  },
  container2: {
    bottom: 0,
    height: hr(146 / 800),
    marginTop: hr(120 / 800),
  },
});
