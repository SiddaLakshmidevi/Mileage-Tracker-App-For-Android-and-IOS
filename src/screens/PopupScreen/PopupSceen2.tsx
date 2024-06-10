import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import React from 'react';

interface PopupScreen2Props {
  onPressYes: () => void;
  onPressNo: () => void;
  data: string;
}
export const PopupScreen2: React.FC<PopupScreen2Props> = ({
  onPressYes,
  onPressNo,
  data,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.text}>{data}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onPressNo}>
              <Text style={styles.no}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#0B3C58'}]}
              onPress={onPressYes}>
              <Text style={styles.yes}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  innercontainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: wr(16 / 360),
    elevation: 5,
    width: wr(324 / 360),
    height: hr(158 / 800),
  },
  text: {
    marginTop: hr(20 / 800),
    color: '#0B3C58',
    fontSize: wr(16 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '500',
  },
  button: {
    borderWidth: 1,
    borderColor: '#0B3C58',
    width: wr(138 / 360),
    height: hr(40 / 800),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wr(284 / 360),
    height: hr(40 / 800),
    marginTop: hr(50 / 800),
  },
  no: {
    fontSize: 16,
    color: '#0B3C58',
  },
  yes: {color: 'white', fontSize: 16},
});
