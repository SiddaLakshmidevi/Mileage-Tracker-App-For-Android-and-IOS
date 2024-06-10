import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AccountForm} from './AccountForm';
import {hr} from '../Utils/WidthHeightRatio';

interface AccountInputsProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  errorUsername: string;
  errorNickname: string;
  errorEmail: string;
  setErrorUsername: React.Dispatch<React.SetStateAction<string>>;
  setErrorNickname: React.Dispatch<React.SetStateAction<string>>;
  setErrorEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const AccountInputs: React.FC<AccountInputsProps> = ({
  username,
  setUsername,
  nickname,
  setNickname,
  email,
  setEmail,
  errorUsername,
  errorNickname,
  errorEmail,
  setErrorUsername,
  setErrorNickname,
  setErrorEmail,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AccountForm
          value={username}
          setValue={setUsername}
          type="Name"
          placeholder="Username"
          error={errorUsername}
          setError={setErrorUsername}
          email={false}
          isrequired={true}
        />
        <AccountForm
          value={nickname}
          setValue={setNickname}
          type="Nickname"
          placeholder="Nickname"
          error={errorNickname}
          setError={setErrorNickname}
          email={false}
          isrequired={false}
        />
        <AccountForm
          value={email}
          setValue={setEmail}
          type="Email Address"
          placeholder="Email"
          error={errorEmail}
          setError={setErrorEmail}
          email={true}
          isrequired={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    height: hr(511 / 800),
  },
});
