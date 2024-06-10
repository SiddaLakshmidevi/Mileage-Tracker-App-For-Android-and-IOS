import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';

interface VehicleAddedProps {
  route: any;
  navigation: any;
}

export const VehicleAdded: React.FC<VehicleAddedProps> = ({
  route,
  navigation,
}) => {
  const {newVehicle} = route?.params;
  setTimeout(() => {
    navigation.navigate('NavigationContainer');
  }, 2000);
  return (
    <LinearGradient style={styles.container} colors={['#ACDADB', '#F0F0E0']}>
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.vehicleImage}
            source={{uri: newVehicle.imagePath}}
          />
          <Image
            style={styles.effectImage}
            source={require('../../assets/images/effect.png')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.vehiclename}>{newVehicle.vehicleName}</Text>
          <Text style={styles.vehicleAdded}>Vehicle Added</Text>
        </View>
        <View style={{bottom: 0}}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Onboarding.png')}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hr(0.4),
  },
  vehicleImage: {
    width: wr(120 / 360),
    height: hr(120 / 800),
    resizeMode: 'cover',
    borderRadius: hr(0.8),
    position: 'absolute',
  },
  effectImage: {
    height: hr(240 / 800),
    width: wr(240 / 360),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehiclename: {
    fontSize: hr(22 / 800),
    fontFamily: 'New Rubrik',
    textAlign: 'center',
    fontWeight: '400',
    color: '#0B3C58',
    marginBottom: 16,
  },
  vehicleAdded: {
    fontSize: hr(36 / 800),
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    textAlign: 'center',
    color: '#0B3C58',
    marginBottom: 120,
  },
  image: {
    width: wr(360 / 360),
    height: hr(360 / 800),
  },
});
