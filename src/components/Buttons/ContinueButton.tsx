import React from 'react';
import {View, Text, Pressable, StyleSheet, ColorValue} from 'react-native';
import {wr, hr} from '../Utils/WidthHeightRatio';

interface ContinueButtonProps {
  onPress: () => void;
  title: string;
  enableContinue: boolean;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onPress,
  title,
  enableContinue,
}) => {
  const buttonBackgroundColor: ColorValue = enableContinue
    ? '#0B3C58'
    : '#B0B0B0';
  return (
    <View
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
        },
      ]}>
      <Pressable
        style={[styles.pressable]}
        onPress={onPress}
        disabled={!enableContinue}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hr(48 / 800),
    width: wr(284 / 360),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 28,
    marginLeft: wr(40 / 360),
  },
  pressable: {
    height: hr(48 / 800),
    width: wr(284 / 360),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
});
