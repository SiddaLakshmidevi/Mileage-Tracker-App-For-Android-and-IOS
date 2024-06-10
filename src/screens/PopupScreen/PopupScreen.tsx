import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import React from 'react';

interface PopupScreenProps {
  onPressYes: () => void;
  onPressNo: () => void;
  data: string;
  smalldata: string;
}
export const PopupScreen: React.FC<PopupScreenProps> = ({
  onPressYes,
  onPressNo,
  data,
  smalldata,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.container}>
        <View style={styles.innercontainer}>
          <Text style={styles.text}>{data}</Text>
          <Text style={styles.smalltext}>{smalldata}</Text>
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
    paddingVertical: hr(15 / 800),
    elevation: 5,
    width: wr(324 / 360),
    height: hr(196 / 800),
  },
  text: {
    marginBottom: 12,
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
    borderRadius: 10,
  },
  buttons: {
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
      android: {
        marginTop: 15,
      },
    }),
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wr(284 / 360),
    height: hr(40 / 800),
  },
  smalltext: {
    fontSize: wr(14 / 360),
    color: '#58798C',
    marginBottom: 10,
    marginLeft: 8,
    fontFamily: 'New Rubrik',
    fontWeight: '400',
  },
  no: {
    fontSize: 16,
    color: '#0B3C58',
  },
  yes: {color: 'white', fontSize: 16},
});
