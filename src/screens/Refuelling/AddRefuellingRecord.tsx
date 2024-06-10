import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Vehicle,
  getVehicleByVehicleId,
} from '../../LocalDB/APIs/VehicleUpdates';
import 'react-native-get-random-values';
import {
  getRefuellingByrefuelId,
  getRefuellingsById,
} from '../../LocalDB/APIs/RefuellingUpdates';
import {Userstore} from '../../Zustand/UserStore';
import {createNewRefuel} from '../../LocalDB/APIs/RefuellingUpdates';
import {updateRefuelling} from '../../LocalDB/APIs/RefuellingUpdates';
import {Dropdown} from 'react-native-element-dropdown';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import {FloatingLabelInput2} from '../../components/RefuellingComponents/FloatingLabelInput2';
import {Header} from '../../components/Heading/Header';
import {useVehicleStore} from '../../Zustand/VehicleStore';
import {useFocusEffect} from '@react-navigation/native';
import {Refuel} from '../../LocalDB/APIs/RefuellingUpdates';
import Realm from 'realm';
import {Alert} from 'react-native';

interface AddRefuellingRecordProps {
  navigation: any;
  route: any;
}

export const AddRefuellingRecord: React.FC<AddRefuellingRecordProps> = ({
  navigation,
  route,
}) => {
  const {add, edit, refuellingId} = route?.params;
  const {user} = Userstore();
  const [vehicle_id, setVehicle_id] = useState<Realm.BSON.UUID>();
  const [selectedVehicleName, setSelectedVehicleName] = useState<string>('');
  const [startReading, setStartReading] = useState<string>('');
  const [endReading, setEndReading] = useState<string>('');
  const [consumedFuel, setConsumedFuel] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [refuelDate, setRefuelDate] = useState<Date>(new Date());
  const {selectedVehicle, setSelectedVehicle, vehicles, fetchVehicles} =
    useVehicleStore();
  const [refuellingData, setRefeullingData] = useState<Refuel[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchVehicles();
    }, [fetchVehicles]),
  );
  useEffect(() => {
    const existingRefuellings: Refuel[] = getRefuellingsById(
      selectedVehicle.vehicle_id,
    );
    const filteredRefuellings = refuellingId
      ? existingRefuellings.filter(fuel => {
          return String(fuel.refuel_id) !== String(refuellingId);
        })
      : existingRefuellings;

    filteredRefuellings.sort((a: Refuel, b: Refuel) => {
      if (a.refuelDate > b.refuelDate) return 1;
      else if (a.refuelDate < b.refuelDate) return -1;
      else return parseInt(a.startReading) - parseInt(b.startReading);
    });
    setRefeullingData(filteredRefuellings);
  }, [add, edit, selectedVehicle, refuellingId]);

  useEffect(() => {
    if (add) {
      if (selectedVehicle.vehicle_id?.length !== 0) {
        const vehicleData: Vehicle | null = getVehicleByVehicleId(
          selectedVehicle.vehicle_id,
        );
        if (vehicleData) {
          setVehicle_id(vehicleData.vehicle_id);
          setSelectedVehicleName(vehicleData.vehicleName);
        } else if (vehicles !== null && vehicles.length > 0) {
          setSelectedVehicleName(vehicles[0].vehicleName);
          setVehicle_id(vehicles[0].vehicle_id);
        }
        setRefuelDate(new Date());
      }
    }
  }, [add, vehicles]);

  useEffect(() => {
    if (edit) {
      const refuelingData: Refuel[] = getRefuellingByrefuelId(refuellingId);

      if (
        refuelingData &&
        refuelingData.length > 0 &&
        refuelingData[0].isValid()
      ) {
        const vehicleData: Vehicle | null = getVehicleByVehicleId(
          refuelingData[0].vehicle_id as unknown as string,
        );

        if (vehicleData) {
          setVehicle_id(vehicleData.vehicle_id);
          setSelectedVehicleName(vehicleData.vehicleName);
          setStartReading(refuelingData[0].startReading);
          setEndReading(refuelingData[0].endReading);
          setConsumedFuel(refuelingData[0].consumedFuel);
          setPrice(refuelingData[0].price);
          setRefuelDate(refuelingData[0].refuelDate);
        } else {
          console.error('Vehicle data not found');
        }
      } else {
        navigation.navigate('Refuelling');
      }
    }
  }, [edit, refuellingId, navigation]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setRefuelDate(date);
  };

  const hasOverlappingRefuellings = (data: Refuel[], newRefuelling: Refuel) => {
    if (data.length === 0) {
      return true;
    }
    let ind = true;
    let i = 0;

    for (; i < data.length; i++) {
      if (data[i].refuelDate.getTime() > newRefuelling.refuelDate.getTime()) {
        break;
      } else if (
        data[i].refuelDate.getTime() === newRefuelling.refuelDate.getTime()
      ) {
        if (
          parseInt(data[i].startReading) > parseInt(newRefuelling.startReading)
        ) {
          break;
        }
      }
    }

    if (i === 0) {
      if (parseInt(data[0].startReading) < parseInt(newRefuelling.endReading)) {
        ind = false;
      }
    } else if (i === data.length) {
      if (
        parseInt(data[i - 1].endReading) > parseInt(newRefuelling.startReading)
      ) {
        ind = false;
      }
    } else {
      if (
        parseInt(data[i].startReading) < parseInt(newRefuelling.endReading) ||
        parseInt(data[i - 1].endReading) > parseInt(newRefuelling.startReading)
      ) {
        ind = false;
      }
    }
    return ind;
  };

  const handleAddRefuelling = async () => {
    if (!vehicle_id) {
      setError('Please choose a vehicle');
      return;
    }
    if (!startReading || !endReading || !consumedFuel || !price) {
      setError('Validation Error, All fields are required.');
      return;
    }
    if (parseFloat(startReading) >= parseFloat(endReading)) {
      setError('Start reading should be less than end reading.');
      return;
    }
    const newRefuelling: Refuel = {
      user_id: user.user_id,
      vehicle_id,
      startReading,
      endReading,
      consumedFuel,
      price,
      refuelDate,
      isValid: () => true,
      refuel_id: new Realm.BSON.UUID(),
    };
    const isOverlapping = hasOverlappingRefuellings(
      refuellingData,
      newRefuelling,
    );

    if (!isOverlapping) {
      setError('Error: Overlapping refuellings.');
      Alert.alert(
        'Error',
        'Overlapping refuellings. Please check your entries.',
      );
    } else {
      try {
        const createdRefuelling = createNewRefuel(newRefuelling);
        if (createdRefuelling) {
          navigation.navigate('Refuelling');
        }
      } catch (e) {
        setError('');
      }
    }
  };

  const handleUpdateRefuelling = async () => {
    if (!vehicle_id) {
      setError('Please choose a vehicle');
      return;
    }
    if (!startReading || !endReading || !consumedFuel || !price) {
      setError('Validation Error, All fields are required.');
      return;
    }
    if (parseFloat(startReading) >= parseFloat(endReading)) {
      setError('Start reading should be less than end reading.');
      return;
    }

    const updatedData: Refuel = {
      refuel_id: refuellingId,
      user_id: user.user_id,
      vehicle_id,
      startReading,
      endReading,
      consumedFuel,
      price,
      refuelDate,
      isValid: () => true,
    };
    const isOverlapping = hasOverlappingRefuellings(
      refuellingData,
      updatedData,
    );

    if (!isOverlapping) {
      setError('Error: Overlapping refuellings.');
      Alert.alert(
        'Error',
        'Overlapping refuellings. Please check your entries.',
      );
    } else {
      try {
        const updatedRefuelling = updateRefuelling(updatedData);
        if (updatedRefuelling) {
          navigation.navigate('Refuelling');
        }
      } catch (e) {
        setError('');
      }
    }
  };

  if (error) {
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  const isEnable =
    !!vehicle_id &&
    !!startReading &&
    !!endReading &&
    !!consumedFuel &&
    !!price &&
    parseFloat(startReading) < parseFloat(endReading);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.redContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrowleft.png')}
            style={{
              width: wr(24 / 360),
              height: hr(24 / 800),
              left: hr(16 / 800),
              marginTop: hr(20 / 800),
            }}
          />
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        {edit ? (
          <Header title={'Edit refuelling Record'} style={{marginTop: 16}} />
        ) : (
          <Header title={'Add refuelling Record'} style={{marginTop: 16}} />
        )}

        <View style={{marginTop: hr(35 / 800), alignItems: 'center'}}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.text}>Vehicle Name</Text>
            <Dropdown
              data={vehicles || []}
              labelField={'vehicleName'}
              valueField={'vehicle_id'}
              placeholder={selectedVehicleName}
              value={'vehicleName'}
              onChange={selectedItem => {
                setVehicle_id(selectedItem.vehicle_id);
                setSelectedVehicleName(selectedItem.vehicleName);
                setSelectedVehicle(selectedItem);
              }}
              containerStyle={styles.containerStyle}
              style={styles.dropdown}
              maxHeight={100}
              showsVerticalScrollIndicator={false}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconColor="#0B3C58"
              itemTextStyle={styles.itemTextStyle}
              disable={edit ? true : false}
            />
          </View>
          <Pressable onPress={showDatePicker} style={styles.inputtext}>
            <Text style={styles.label}>Refuelling Date</Text>
            <View style={styles.dateContainer}>
              {refuelDate && (
                <Text style={{color: '#0B3C58', fontSize: wr(16 / 360)}}>
                  {refuelDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              )}
            </View>
            <Image
              source={require('../../assets/images/calendar.png')}
              style={styles.calendar}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              maximumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </Pressable>

          <View>
            <View>
              {edit ? (
                <Text style={styles.header}>Odometer Details</Text>
              ) : (
                <Text style={styles.header}>Odometer</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: wr(1),
              }}>
              <View>
                <FloatingLabelInput2
                  label={'Start Reading'}
                  numericKeyboard={true}
                  value={startReading}
                  setValue={setStartReading}
                  isFocus={edit ? true : false}
                />
              </View>
              <View>
                <FloatingLabelInput2
                  label={'End Reading'}
                  numericKeyboard={true}
                  value={endReading}
                  setValue={setEndReading}
                  isFocus={edit ? true : false}
                />
              </View>
            </View>
          </View>
          <View>
            <View>
              {edit ? (
                <Text style={styles.header}>Fuel Details</Text>
              ) : (
                <Text style={styles.header}>Fuel</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: wr(1),
              }}>
              <View>
                <FloatingLabelInput2
                  label={'Consumed (in L)'}
                  numericKeyboard={true}
                  value={consumedFuel}
                  setValue={setConsumedFuel}
                  isFocus={edit ? true : false}
                />
              </View>
              <View>
                <FloatingLabelInput2
                  label={'Price (in S$)'}
                  numericKeyboard={true}
                  value={price}
                  setValue={setPrice}
                  isFocus={edit ? true : false}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.errorContainer}>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button, {borderWidth: 1}]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancle}>Cancel</Text>
          </TouchableOpacity>
          {edit ? (
            <TouchableOpacity
              onPress={handleUpdateRefuelling}
              style={[
                styles.button,
                {backgroundColor: isEnable ? '#0B3C58' : '#B0B0B0'},
              ]}>
              <Text style={styles.add}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: isEnable ? '#0B3C58' : '#B0B0B0'},
              ]}
              onPress={handleAddRefuelling}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F55858',
    overflow: 'hidden',
  },
  redContainer: {
    height: hr(43 / 800),
    width: wr(1),
    backgroundColor: '#F55858',
  },
  mainContainer: {
    width: wr(1000 / 360),
    height: wr(1000 / 360),
    borderTopRightRadius: wr(500 / 360),
    borderTopLeftRadius: wr(500 / 360),
    backgroundColor: '#f1f2f2',
    alignItems: 'center',
  },
  dropdownContainer: {
    height: hr(60 / 800),
    width: wr(324 / 360),
    backgroundColor: '#fff',
    padding: hr(8 / 800),
    borderRadius: 5,
    marginBottom: hr(8 / 800),
  },
  label: {
    fontSize: 12,
    marginLeft: wr(15 / 360),
    marginTop: hr(5 / 800),
    color: '#6D8A9B',
    textAlign: 'left',
  },
  inputtext: {
    height: hr(60 / 800),
    width: wr(324 / 360),
    marginTop: hr(20 / 800),
    backgroundColor: 'white',
    borderRadius: 5,
  },
  itemTextStyle: {
    color: '#0B3C58',
  },
  datePickerContainer: {
    height: hr(52 / 800),
    width: wr(324 / 360),
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dateContainer: {
    fontSize: wr(18 / 360),
    fontWeight: '400',
    fontFamily: 'New Rubrik',
    left: 15,
    marginTop: 5,
    color: '#0B3C58',
  },
  calendar: {
    alignSelf: 'flex-end',
    width: wr(20 / 360),
    height: hr(20 / 800),
    bottom: 24,
    right: 10,
  },
  dropdown: {
    width: wr(300 / 360),
    marginLeft: hr(8 / 800),
  },
  placeholderStyle: {
    color: '#0B3C58',
    fontSize: hr(16 / 800),
    fontFamily: 'New Rubrik',
  },
  selectedTextStyle: {
    color: '#0B3C58',
    fontSize: hr(16 / 800),
    fontFamily: 'New Rubrik',
  },
  containerStyle: {
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  text: {
    marginLeft: hr(8 / 800),
    fontSize: hr(11 / 800),
    color: '#6D8A9B',
  },
  header: {
    fontFamily: 'New Rubrik',
    fontSize: wr(16 / 360),
    fontWeight: '400',
    color: '#0B3C58',
    marginTop: hr(20 / 800),
    marginLeft: wr(15 / 360),
    marginBottom: wr(10 / 360),
  },

  input: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 5,
  },
  dateDisplay: {
    marginLeft: hr(8 / 800),
    marginTop: hr(8 / 800),
    fontSize: hr(16 / 800),
    color: '#0B3C58',
  },
  bottomContainer: {
    width: wr(360 / 360),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    ...Platform.select({
      ios: {
        marginTop: wr(150 / 360),
      },
      android: {
        marginTop: wr(200 / 360),
      },
    }),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wr(8 / 360),
    width: wr(158 / 360),
    height: hr(48 / 800),
  },
  btmContainer: {
    width: wr(320 / 360),
    height: hr(52 / 800),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nametext: {
    color: '#0B3C58',
    fontSize: wr(16 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    marginLeft: wr(7 / 360),
  },
  add: {
    color: '#FFFFFF',
    fontSize: wr(16 / 360),
    fontWeight: '500',
    fontFamily: 'New Rubrik',
  },
  cancle: {
    color: '#0B3C58',
    fontSize: wr(16 / 360),
    fontWeight: '500',
    fontFamily: 'New Rubrik',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: wr(12 / 360),
  },
  errorContainer: {
    position: 'absolute',
    marginTop: hr(215 / 360),
  },
});
