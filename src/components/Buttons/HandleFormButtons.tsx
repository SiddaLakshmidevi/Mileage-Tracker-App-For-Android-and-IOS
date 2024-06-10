import React from 'react';
import {StyleSheet, View, Pressable, Text, ColorValue} from 'react-native';
import {wr, hr} from '../Utils/WidthHeightRatio';

interface HandleFormButtonsProps {
  onPressButton1: () => void;
  onPressButton2: () => void;
  button1Label: string;
  button2Label: string;
  isEnable?: boolean;
}

export const HandleFormButtons: React.FC<HandleFormButtonsProps> = ({
  onPressButton1,
  onPressButton2,
  button1Label,
  button2Label,
  isEnable = true,
}) => {
  const button2BackgroundColor: ColorValue = isEnable ? '#0B3C58' : '#B0B0B0';

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.button1}>
        <Pressable style={styles.button1} onPress={onPressButton1}>
          <Text style={styles.button1Label}>{button1Label}</Text>
        </Pressable>
      </View>

      <View style={styles.button2}>
        <Pressable
          onPress={onPressButton2}
          style={[styles.button2, {backgroundColor: button2BackgroundColor}]}
          disabled={!isEnable}>
          <Text style={styles.button2Label}>{button2Label}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button1: {
    width: wr(158 / 360),
    height: hr(48 / 800),
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: hr(8 / 360),
    borderColor: '#0B3C58',
  },
  button1Label: {
    fontSize: hr(16 / 800),
    color: '#0B3C58',
    fontWeight: '500',
  },
  button2: {
    width: wr(158 / 360),
    height: hr(48 / 800),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: hr(8 / 360),
    borderColor: '#0B3C58',
  },
  button2Label: {
    fontSize: hr(16 / 800),
    fontWeight: '500',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 324,
    height: 48,
    marginLeft: 8,
  },
});
