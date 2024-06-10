import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {hr, wr} from '../Utils/WidthHeightRatio';
import {NavigationButton} from '../Buttons/NavigationButton';
interface AddRefuelComponentProps {
  onPress: () => void;
}

export const AddRefuelComponent: React.FC<AddRefuelComponentProps> = ({
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/cloud.png')}
        style={styles.cloud}
      />
      <Text style={styles.refuleTxt}>
        It's time to add the refuelling details to get more insights
      </Text>
      <NavigationButton onPress={onPress} title="Add Refuelling" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: hr(50 / 800),
  },
  cloud: {
    marginBottom: hr(20 / 800),
  },
  refuleTxt: {
    textAlign: 'center',
    width: wr(300 / 360),
    color: '#0B3C58',
    fontSize: wr(16 / 360),
    fontWeight: '400',
    fontFamily: 'New Rubrik',
    marginBottom: hr(8 / 800),
  },
});
