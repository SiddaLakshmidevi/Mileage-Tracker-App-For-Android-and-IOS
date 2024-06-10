import React, {MutableRefObject} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {wr, hr} from '../Utils/WidthHeightRatio';

interface PasscodeProps {
  password: string[];
  setPassword: React.Dispatch<React.SetStateAction<string[]>>;
  instructionText1: string;
  instructionText2: string;
}

export const Passcode: React.FC<PasscodeProps> = ({
  password,
  setPassword,
  instructionText1,
  instructionText2,
}) => {
  const refs: MutableRefObject<TextInput | null>[] = Array.from(
    {length: 4},
    () => React.createRef<TextInput>(),
  );

  const handleChangeText = (index: number, value: string) => {
    const pass = [...password];
    pass[index] = value;

    if (value && index < password.length - 1) {
      refs[index + 1]?.current?.focus();
    }
    if (!value && index > 0) {
      refs[index - 1]?.current?.focus();
    }
    setPassword(pass);
  };

  return (
    <>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText1}>
          {instructionText1} <Text style={styles.asteric}>*</Text>
        </Text>
        <Text style={styles.instructionText2}>{instructionText2}</Text>
      </View>
      <View style={styles.passcodeContainer}>
        {[0, 1, 2, 3].map(index => (
          <TextInput
            key={index}
            secureTextEntry={true}
            keyboardType="numeric"
            maxLength={1}
            style={styles.inputBox}
            onChangeText={value => handleChangeText(index, value)}
            ref={refs[index]}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  instructionContainer: {
    margin: hr(20 / 800),
  },
  instructionText1: {
    color: '#0B3C58',
    fontSize: hr(20 / 800),
    marginBottom: hr(4 / 800),
    fontFamily: 'New Rubrik',
  },
  instructionText2: {
    color: '#6D8A9B',
    fontSize: hr(14 / 800),
    fontFamily: 'New Rubrik',
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputBox: {
    backgroundColor: '#fff',
    width: wr(72 / 360),
    height: hr(52 / 800),
    textAlign: 'center',
    borderRadius: 8,
    fontSize: hr(16 / 800),
  },
  asteric: {
    color: '#FF4E4E',
  },
});
