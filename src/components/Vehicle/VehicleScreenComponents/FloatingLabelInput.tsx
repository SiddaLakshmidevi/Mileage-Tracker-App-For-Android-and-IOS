import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, TextInputProps} from 'react-native';
import {hr, wr} from '../../Utils/WidthHeightRatio';

interface FloatingLabelInputProps extends TextInputProps {
  labelText: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  numericKeyboard?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  labelText,
  inputValue,
  setInputValue,
  numericKeyboard = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleTextChange = (text: string) => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (regex.test(text) || text === '') {
      setIsFocused(true);
      setInputValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            top: isFocused || inputValue ? 0 : hr(16 / 800),
            fontSize: isFocused ? hr(11 / 800) : hr(20 / 800),
          },
        ]}>
        {labelText}
      </Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={text => handleTextChange(text)}
        onFocus={handleFocus}
        keyboardType={numericKeyboard ? 'numeric' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hr(52 / 800),
    backgroundColor: '#FFFFFF',
    width: wr(324 / 360),
    borderRadius: 5,
  },
  label: {
    position: 'absolute',
    left: 10,
    color: '#58798C',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'New Rubrik',
  },
  input: {
    paddingTop: hr(15 / 800),
    paddingLeft: hr(10 / 800),
    fontSize: hr(16 / 800),
    color: '#0B3C58',
    fontWeight: '400',
    fontFamily: 'New Rubrik',
  },
});
