import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {hr, wr} from '../../Utils/WidthHeightRatio';

interface HomeScreenVehicleProps {
  vehicleimage: string;
  vehicleType: '2' | '4';
}

export const HomeScreenVehicle: React.FC<HomeScreenVehicleProps> = ({
  vehicleimage,
  vehicleType,
}) => {
  const getImage = (type: '2' | '4'): JSX.Element => {
    if (type === '2') {
      return (
        <Image
          source={require('../../../assets/images/twowheeler.png')}
          style={styles.image}
        />
      );
    } else if (type === '4') {
      return (
        <Image
          source={require('../../../assets/images/fourwheeler.png')}
          style={styles.image}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/images/fourwheeler.png')}
          style={styles.image}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {vehicleimage.length > 0 ? (
        <Image
          source={{
            uri: vehicleimage,
          }}
          style={styles.image}
        />
      ) : (
        getImage(vehicleType)
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wr(318 / 360),
    height: hr(178 / 800),

    borderRadius: 10,
  },
  image: {
    width: wr(300 / 360),
    height: hr(170 / 800),
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
});
