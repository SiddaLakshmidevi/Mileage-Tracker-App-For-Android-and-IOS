import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface BackButtonHandlerProps {
  onPress: () => void;
}

export const BackButtonHandler: React.FC<BackButtonHandlerProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.header} onPress={onPress}>
      <Image
        source={
          require('../../assets/images/Backbutton.png') as ImageSourcePropType
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 26,
    paddingBottom: 20,
    paddingLeft: 8,
  },
});
