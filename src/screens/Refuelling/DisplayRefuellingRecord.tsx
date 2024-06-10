import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {BackButtonHandler} from '../../components/Buttons/BackButtonHandler';
import {getRefuellingByrefuelId} from '../../LocalDB/APIs/RefuellingUpdates';
import {PopupScreen} from '../PopupScreen/PopupScreen';
import {deleteRefuellingRecord} from '../../LocalDB/APIs/RefuellingUpdates';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';
import {useVehicleStore} from '../../Zustand/VehicleStore';
import {useFocusEffect} from '@react-navigation/native';

interface DisplayRefuellingRecordProps {
  route: any;
  navigation: any;
}

export const DisplayRefuellingRecord: React.FC<
  DisplayRefuellingRecordProps
> = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {selectedVehicle} = useVehicleStore();
  const [displayRefuellingData, setDisplayRefuellingData] = useState<
    any | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      const fetchRefuellingData = async () => {
        const refuelId = route?.params?.refuelId;
        const refuellingData: any | null = getRefuellingByrefuelId(refuelId);
        if (
          refuellingData &&
          refuellingData?.length > 0 &&
          refuellingData[0].isValid()
        ) {
          setDisplayRefuellingData(refuellingData[0]);
        } else {
          navigation.navigate('Refuelling');
        }
      };

      fetchRefuellingData();
    }, [navigation, route?.params?.refuellingId]),
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleYes = () => {
    try {
      deleteRefuellingRecord(displayRefuellingData?.refuel_id);
      toggleModal();
      setDisplayRefuellingData(null);
      navigation.navigate('Refuelling');
    } catch (e) {
      console.log(e);
    }
  };

  const handleNo = () => {
    toggleModal();
  };

  const handleEditPage = () => {
    navigation.navigate('AddRefuellingRecord', {
      vehicleId: displayRefuellingData?.vehicle_id,
      refuellingId: displayRefuellingData?.refuel_id,
      add: false,
      edit: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>
          {' '}
          <BackButtonHandler onPress={() => navigation.goBack()} />
        </Text>

        <View style={styles.middleContainer}>
          <Text style={styles.dateUp}>
            {displayRefuellingData?.refuelDate.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: '2-digit',
            })}
          </Text>
          <Text style={styles.vehicleName}>{selectedVehicle?.vehicleName}</Text>
          <Text style={styles.dateDown}>
            Added on{' '}
            {displayRefuellingData?.refuelDate.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: '2-digit',
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('../../assets/images/delete.png')}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: wr(1010 / 360),
          height: wr(1010 / 360),
          borderRadius: wr(490 / 360),
          backgroundColor: '#F0F2F2',
          alignSelf: 'center',
        }}>
        <View style={styles.bottomContainer}>
          <View style={styles.recordContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Start Reading</Text>
              <Text style={styles.value}>
                {displayRefuellingData?.startReading} Kms
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>End Reading</Text>
              <Text style={styles.value}>
                {displayRefuellingData?.endReading} Kms
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Consumed</Text>
              <Text style={styles.value}>
                {displayRefuellingData?.consumedFuel} L
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>
                S$ {displayRefuellingData?.price}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleEditPage} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isModalVisible && (
        <PopupScreen
          data={'Are you sure you want to delete this refuelling record?'}
          onPressYes={handleYes}
          onPressNo={handleNo}
          smalldata={''}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: hr(137 / 800),
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  deleteIcon: {
    width: wr(24 / 360),
    height: hr(24 / 800),
    marginRight: 15,
    marginTop: hr(24 / 800),
  },
  middleContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  dateUp: {
    marginTop: hr(20 / 800),
    fontSize: wr(22 / 360),
    fontWeight: '500',
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
  },
  vehicleName: {
    fontSize: wr(16 / 360),
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    marginTop: hr(8 / 800),
  },
  dateDown: {
    color: '#58798C',
    fontSize: wr(12 / 360),
    fontFamily: 'New Rubrik',
    top: wr(8 / 360),
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: hr(58 / 800),
    marginLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  recordContainer: {
    width: wr(324 / 360),
    height: hr(140 / 800),
    borderRadius: 10,
    padding: wr(16 / 360),
    backgroundColor: '#FFFFFF',
    elevation: 2,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginRight: wr(18 / 360),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hr(10 / 800),
  },
  label: {
    fontSize: wr(14 / 360),
    color: '#0B3C58',
    fontWeight: '400',
    fontFamily: 'New Rubrik',
  },
  value: {
    fontSize: wr(14 / 360),
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    fontWeight: '400',
  },
  editButton: {
    width: wr(284 / 360),
    height: hr(48 / 800),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wr(1 / 360),
    borderColor: '#0B3C58',
    borderRadius: wr(8 / 360),
    marginRight: wr(18 / 360),
    ...Platform.select({
      ios: {
        marginTop: hr(355 / 800),
      },
      android: {
        marginTop: hr(380 / 800),
      },
    }),
  },
  editText: {
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    fontSize: wr(16 / 360),
    fontWeight: '500',
  },
});
