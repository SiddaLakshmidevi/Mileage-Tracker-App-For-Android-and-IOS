import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {ToAddVehicle} from '../../components/Vehicle/VehicleScreenComponents/ToAddVehicle';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import {Userstore} from '../../Zustand/UserStore';
import {getVehicleById} from '../../LocalDB/APIs/VehicleUpdates';
import {DisplayVehicles} from './DisplayVehicles';
import {useIsFocused} from '@react-navigation/native';
interface VehiclesProps {
  navigation: any;
}

export const Vehicles: React.FC<VehiclesProps> = ({navigation}) => {
  const {user} = Userstore();
  const [vehicles, setVehicles] = useState<any[] | null>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchVehicleData = async () => {
      const fetchedVehicles = await getVehicleById(user.user_id);
      setVehicles(fetchedVehicles);
    };

    fetchVehicleData();
  }, [user.user_id, isFocused]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.page}>
        {!vehicles?.length ? (
          <ToAddVehicle navigation={navigation} />
        ) : (
          <DisplayVehicles data={vehicles} navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  page: {
    width: wr(1),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hr(20 / 800),
  },
});
