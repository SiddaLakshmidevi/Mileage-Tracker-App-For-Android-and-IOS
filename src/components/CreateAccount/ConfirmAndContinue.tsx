import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import CheckBox from 'react-native-check-box';
import {hr, wr} from '../Utils/WidthHeightRatio';

interface ConfirmAndContinueProps {
  onPress: () => void;
  disabled: boolean;
  enableContinue: boolean;
}

export const ConfirmAndContinue: React.FC<ConfirmAndContinueProps> = ({
  onPress,
  disabled,
  enableContinue,
}) => {
  const [confirm, setConfirm] = useState(false);
  const disableContinueBtn = !(confirm && enableContinue);

  const termsText =
    'Tick this box to confirm you are at least 18 years old and agree to our ';
  const conditionsText = 'terms & conditions';
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <CheckBox
          onClick={() => {
            setConfirm(!confirm);
          }}
          isChecked={confirm}
          checkedCheckBoxColor="#FF4E4E"
          uncheckedCheckBoxColor="#0B3C58"
          style={styles.checkbox}
          disabled={disabled}
        />
        <Text style={styles.confirmtext}>
          {termsText}
          <Text
            style={{color: confirm && enableContinue ? '#FF0000' : '#0B3C58'}}>
            {conditionsText}
          </Text>
        </Text>
      </View>
      <View
        style={[
          styles.button,
          {
            backgroundColor: disableContinueBtn ? '#B0B0B0' : '#0B3C58',
          },
        ]}>
        <Pressable
          style={[styles.pressable]}
          onPress={onPress}
          disabled={disableContinueBtn}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hr(146 / 800),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: hr(16 / 800),
    paddingLeft: 18,
  },
  confirmtext: {
    fontSize: hr(12 / 800),
    marginTop: wr(2 / 360),
    paddingLeft: 4,
    width: wr(296 / 360),
    height: hr(34 / 800),
    color: '#0B3C58',
  },
  button: {
    height: hr(48 / 800),
    width: wr(284 / 360),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: hr(28 / 800),
  },
  checkbox: {
    height: hr(20 / 800),
    width: wr(20 / 360),
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
    fontSize: wr(16 / 360),
    color: '#fff',
  },
});
