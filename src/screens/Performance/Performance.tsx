import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {LogoComponent} from '../../components/ProfileComponents/LogoComponent';
import {NavigationButton} from '../../components/Buttons/NavigationButton';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import {Barchart} from '../../components/Graphs/Barchart';
import {getRefuellingsById} from '../../LocalDB/APIs/RefuellingUpdates';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import {AddRefuelComponent} from '../../components/RefuellingComponents/AddRefuelingComponent';
import {CurveGraph} from '../../components/Graphs/Curvegraph';
import {useVehicleStore} from '../../Zustand/VehicleStore';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';

interface PerformanceProps {
  navigation: any;
}

export const Performance: React.FC<PerformanceProps> = ({navigation}) => {
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [imagePath, setimagePath] = useState<string>('');
  const [refuelData, setRefuelData] = useState<any | null>([]);
  const {selectedVehicle, setSelectedVehicle, vehicles, fetchVehicles} =
    useVehicleStore();

  useFocusEffect(
    React.useCallback(() => {
      fetchVehicles();
    }, [fetchVehicles]),
  );

  useEffect(() => {
    if (!selectedVehicle && vehicles && vehicles.length > 0) {
      setSelectedVehicle(vehicles[0]);
      setVehicleName(vehicles[0].vehicleName);
      setVehicleId(vehicles[0].vehicle_id);
      setimagePath(vehicles[0].imagePath);
    }
    if (selectedVehicle) {
      setVehicleName(selectedVehicle.vehicleName);
      setVehicleId(selectedVehicle.vehicle_id);
      setimagePath(selectedVehicle.imagePath);

      const fetchRefuellingsData = async () => {
        try {
          const fetchedRefuellings = await getRefuellingsById(
            selectedVehicle.vehicle_id,
          );
          setRefuelData(fetchedRefuellings);
        } catch (error) {
          console.error('Error fetching refuelling data:', error);
        }
      };

      fetchRefuellingsData();
    }
  }, [selectedVehicle, vehicles]);

  return (
    <>
      <SafeAreaView style={styles.headingcontainer}>
        <Text style={styles.heading}>Performance</Text>
      </SafeAreaView>
      {!vehicles || !vehicles.length ? (
        <View style={styles.container3}>
          <LogoComponent
            instructionText="Add a vehicle to start tracking its fuelling & performance"
            image={require('../../assets/images/Milestone.png')}
            width={110}
            height={110}
            viewText={''}
          />
          <View style={styles.button}>
            <NavigationButton
              title="Add Vehicle"
              onPress={() => navigation.navigate('VehicleForm')}
            />
          </View>
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.text}>Choose the vehicle:</Text>
          </View>
          <Dropdown
            data={vehicles}
            style={styles.Dropdown}
            maxHeight={150}
            labelField={'vehicleName'}
            valueField={vehicleName}
            placeholder={vehicleName}
            value={vehicleName}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            onChange={selectedItem => {
              setVehicleName(selectedItem.vehicleName);
              setVehicleId(selectedItem.vehicle_id);
              setimagePath(selectedItem.imagePath);
              setSelectedVehicle(selectedItem);
            }}
          />
          <ScrollView contentContainerStyle={styles.scroll}>
            {vehicleId && (
              <View style={styles.imagecontainer}>
                {imagePath.length > 0 ? (
                  <Image source={{uri: imagePath}} style={styles.image} />
                ) : (
                  <>
                    {vehicles.map(vehicle => {
                      if (vehicle.vehicle_id.equals(vehicleId)) {
                        return (
                          <Image
                            key={vehicle.vehicle_id}
                            source={
                              vehicle.vehicleType === '2 Wheeler'
                                ? require('../../assets/images/twowheeler.png')
                                : require('../../assets/images/fourwheeler.png')
                            }
                            style={styles.image}
                          />
                        );
                      }
                    })}
                  </>
                )}
              </View>
            )}

            <>
              {refuelData?.length === 0 && vehicleId && (
                <AddRefuelComponent
                  onPress={() =>
                    navigation.navigate('AddRefuellingRecord', {
                      add: true,
                      edit: false,
                    })
                  }
                />
              )}
              {refuelData.length > 0 && vehicleId && (
                <>
                  <Barchart fuelData={refuelData} />
                  <CurveGraph fuelData={refuelData} />
                </>
              )}
            </>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headingcontainer: {
    alignItems: 'center',
    width: wr(1),
    borderBottomWidth: hr(1.6 / 800),
    borderBottomColor: '#CED8DE',
  },
  heading: {
    alignSelf: 'center',
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    fontWeight: '500',
    fontSize: wr(22 / 360),
    marginBottom: wr(15 / 360),
  },
  text: {
    fontSize: wr(16 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    marginTop: wr(12 / 360),
    alignSelf: 'center',
    color: '#0B3C58',
  },
  Dropdown: {
    padding: 17,
    width: wr(150 / 360),
    height: hr(34 / 800),
    backgroundColor: '#FFFFFF',
    marginTop: hr(15 / 800),
    alignSelf: 'center',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: hr(30 / 800),
  },
  imagecontainer: {
    width: wr(318 / 360),
    height: hr(178 / 800),
    borderRadius: 12,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    marginTop: hr(16 / 800),
  },
  image: {
    width: '100%',
    height: hr(168 / 800),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  graph: {
    width: wr(324 / 360),
    height: hr(184.5 / 800),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFFCC',
    borderRadius: 12,
  },
  sideHead: {
    fontSize: wr(16 / 360),
    fontWeight: '400',
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
  },
  container3: {
    height: hr(238 / 800),
    width: wr(324 / 360),
    marginTop: hr(150 / 800),
    marginLeft: wr(20 / 360),
  },
  button: {
    alignItems: 'center',
    marginTop: hr(12 / 800),
  },
  itemTextStyle: {
    color: '#0B3C58',
    fontSize: wr(14 / 360),
  },
  selectedTextStyle: {
    color: '#0B3C58',
    fontSize: wr(14 / 360),
  },
  placeholderStyle: {
    color: '#0B3C58',
    fontSize: wr(14 / 360),
  },
});
