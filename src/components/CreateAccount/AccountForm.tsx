import React from 'react';
import {StyleSheet, View, TextInput, Text, Image} from 'react-native';
import {hr, wr} from '../Utils/WidthHeightRatio';

interface AccountFormProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  error: string;
  placeholder: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  email: boolean;
  isrequired: boolean;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  value,
  setValue,
  type,
  error,
  setError,
  email,
  isrequired,
}) => {
  const handleTextChange = (text: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

    if (!email || email === undefined) {
      const specialCharactersRegex =
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/;

      if (specialCharactersRegex.test(text)) {
        setError('You cannot include symbols or numbers');
      } else {
        setError('');
      }
    } else if (email) {
      if (!emailRegex.test(text)) {
        setError('Invalid email');
      } else {
        setError('');
      }
    }

    setValue(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {type}
        {isrequired ? <Text style={styles.isrequired}>*</Text> : null}
      </Text>
      <View style={styles.container1}>
        <TextInput
          value={value}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => handleTextChange(text)}
          style={styles.textbox}
        />
        {error.length > 0 ? (
          <Image
            source={require('../../assets/images/Medium.png')}
            style={styles.image}
          />
        ) : null}
      </View>

      {error.length > 0 ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: hr(8 / 800),
  },
  container1: {
    margin: hr(4 / 800),
    width: wr(324 / 360),
    height: hr(52 / 800),
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textbox: {
    margin: hr(12 / 800),
    height: hr(52 / 800),
    padding: hr(8 / 800),
    marginLeft: hr(8 / 800),
    width: wr(280 / 360),
    fontSize: hr(16 / 800),
    color: '#0B3C58',
  },
  text: {
    marginLeft: hr(8 / 800),
    fontWeight: '400',
    color: '#0B3C58',
    fontSize: hr(20 / 800),
  },
  error: {
    marginLeft: hr(10 / 800),
    fontSize: hr(17 / 800),
    color: '#F93333',
  },
  isrequired: {
    color: '#EB655F',
    fontSize: hr(17 / 800),
    fontWeight: '400',
  },
  image: {
    height: hr(16 / 800),
    width: wr(16 / 360),
  },
});
