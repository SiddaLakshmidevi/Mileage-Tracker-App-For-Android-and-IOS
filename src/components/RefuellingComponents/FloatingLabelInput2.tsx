import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Platform} from 'react-native';
import {hr, wr} from '../Utils/WidthHeightRatio';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
  numericKeyboard?: boolean;
  isFocus?: boolean;
}

export const FloatingLabelInput2: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  setValue,
  numericKeyboard = false,
  isFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(isFocus);

  const handleFocus = () => setIsFocused(true);

  const handleTextChange = (text: string) => {
    setIsFocused(true);

    const regex = /^[0-9]*\.?([0-9]{1,2})?$/;
    if (regex.test(text)) {
      setValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            top: isFocused || value ? 0 : hr(16 / 800),
            fontSize: isFocused ? hr(11 / 800) : hr(16 / 800),
          },
        ]}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
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
    backgroundColor: '#fff',
    width: wr(158 / 360),
    borderRadius: 8,
  },
  label: {
    position: 'absolute',
    left: 10,
    color: '#6D8A9B',
    fontSize: hr(16 / 800),
    marginLeft: wr(6 / 360),
    marginTop: hr(5 / 800),
  },
  input: {
    fontSize: hr(16 / 800),
    color: '#0B3C58',
    fontWeight: '400',
    fontFamily: 'New Rubrik',
    ...Platform.select({
      ios: {
        marginTop: hr(22 / 800),
        marginLeft: wr(15 / 360),
      },
      android: {
        marginTop: hr(13 / 800),
        marginLeft: wr(10 / 360),
      },
    }),
  },
});
