import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogoComponent} from '../../components/ProfileComponents/LogoComponent';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';
import {getRefuellingsById} from '../../LocalDB/APIs/RefuellingUpdates';
import {DisplayRefuelling} from './DisplayRefuellings';
import {NavigationButton} from '../../components/Buttons/NavigationButton';
import {useVehicleStore} from '../../Zustand/VehicleStore';
import {useFocusEffect} from '@react-navigation/native';

interface RefuellingProps {
  navigation: any;
}
export const Refuelling: React.FC<RefuellingProps> = ({navigation}) => {
  const [selectedVehicleName, setSelectedVehicleName] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null,
  );
  const [refuellingData, setRefuellingData] = useState<any | null>([]);
  const {selectedVehicle, setSelectedVehicle, vehicles, fetchVehicles} =
    useVehicleStore();

  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, [fetchVehicles]),
  );

  useEffect(() => {
    if (!selectedVehicle && vehicles && vehicles.length > 0) {
      setSelectedVehicle(vehicles[0]);
      setSelectedVehicleName(vehicles[0].vehicleName);
      setSelectedVehicleId(vehicles[0].vehicle_id);
    }
    if (selectedVehicle) {
      setSelectedVehicleName(selectedVehicle.vehicleName);
      setSelectedVehicleId(selectedVehicle.vehicle_id);

      const fetchRefuellingsData = async () => {
        try {
          const fetchedRefuellings = await getRefuellingsById(
            selectedVehicle.vehicle_id,
          );
          setRefuellingData(fetchedRefuellings);
        } catch (error) {
          console.error('Error fetching refuelling data:', error);
        }
      };

      fetchRefuellingsData();
    }
  }, [selectedVehicle, vehicles]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Refuelling</Text>
        {refuellingData.length > 0 && (vehicles ?? []).length > 0 && (
          <Dropdown
            data={vehicles || []}
            style={[styles.dropdown, styles.input]}
            maxHeight={150}
            labelField={'vehicleName'}
            valueField={'vehicle_id'}
            placeholder={selectedVehicleName}
            value={selectedVehicleName}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
            showsVerticalScrollIndicator={false}
            onChange={selectedItem => {
              setSelectedVehicleName(selectedItem.vehicleName);
              setSelectedVehicleId(selectedItem.vehicle_id);
              setSelectedVehicle(selectedItem);
            }}
          />
        )}
      </View>

      {!(vehicles ?? []).length ? (
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
          {refuellingData.length === 0 ? (
            <View style={styles.noRecordsContainer}>
              <Image
                source={require('../../assets/images/cloud.png')}
                style={styles.cloud}
              />
              <Text style={styles.noRecordsText}>
                No Refuelling records yet..!
              </Text>
              <Text style={styles.smallText}>
                Add a record using the + button below to begin your wealthcare
                journey
              </Text>
            </View>
          ) : (
            <>
              {refuellingData.length > 0 && selectedVehicleId !== null ? (
                <DisplayRefuelling
                  itemTextStyle={styles.itemTextStyle}
                  navigation={navigation}
                  name={selectedVehicleName}
                  vehicleId={selectedVehicleId}
                />
              ) : null}
            </>
          )}

          <TouchableOpacity
            style={styles.plusIcon}
            onPress={() =>
              navigation.navigate('AddRefuellingRecord', {
                vehicleId: selectedVehicleId,
                add: true,
                edit: false,
              })
            }>
            <Image
              source={require('../../assets/images/adduser.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
    width: '100%',
  },
  textContainer: {
    borderBottomWidth: wr(1.6 / 360),
    minHeight: 50,
    borderBottomColor: '#CED8DE',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heading: {
    fontSize: wr(22 / 360),
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    fontWeight: '500',
  },
  dropdown: {
    padding: 17,
    height: hr(44 / 800),
    width: wr(240 / 360),
    margin: hr(18 / 800),
  },
  input: {
    width: '50%',
    backgroundColor: '#C6E8E9',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  container3: {
    position: 'absolute',
    height: hr(238 / 800),
    width: wr(324 / 360),
    marginTop: wr(230 / 360),
    marginLeft: wr(20 / 360),
  },
  button: {
    alignItems: 'center',
    marginTop: hr(12 / 800),
  },
  noRecordsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  cloud: {
    marginTop: 20,
    width: 124,
    height: 61,
  },
  noRecordsText: {
    padding: 10,
    width: '70%',
    fontSize: 14,
    color: '#0B3C58',
    textAlign: 'center',
  },
  smallText: {
    width: 254,
    fontSize: 12,
    color: '#9DB1BC',
    textAlign: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    zIndex: 1,
  },
  icon: {
    height: 58,
    width: 58,
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
  itemContainerStyle: {
    backgroundColor: '#D9F0F1',
  },
});
