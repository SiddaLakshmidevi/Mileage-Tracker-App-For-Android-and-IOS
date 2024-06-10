import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import {LogoComponent} from '../../components/ProfileComponents/LogoComponent';
import {NavigationButton} from '../../components/Buttons/NavigationButton';
import LinearGradient from 'react-native-linear-gradient';
import {Vehicle, getVehicleById} from '../../LocalDB/APIs/VehicleUpdates';
import {getRefuellingsById} from '../../LocalDB/APIs/RefuellingUpdates';
import {Sidebar} from './sidebar';
import MenuDrawer from 'react-native-side-drawer';
import {Dropdown} from 'react-native-element-dropdown';
import {Userstore} from '../../Zustand/UserStore';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';
import {AddRefuelComponent} from '../../components/RefuellingComponents/AddRefuelingComponent';
import {Barchart} from '../../components/Graphs/Barchart';
import {HomeRefuellings} from '../../components/RefuellingComponents/HomeRefuellings';
import {useVehicleStore} from '../../Zustand/VehicleStore';
import {useIsFocused} from '@react-navigation/native';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const user = Userstore(state => state.user);
  const {selectedVehicle, setSelectedVehicle} = useVehicleStore();
  const [isOpen, setIsOpen] = useState(false);
  const toggleFunction = () => {
    setIsOpen(e => !e);
  };
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleId, setVehicleId] = useState<any>('');
  const [imagePath, setimagePath] = useState<string | null>(null);
  const [refuelData, setRefuelData] = useState<any>();
  const [avgFuelConsumption, setAvgFuelConsumption] = useState(0);
  const [lastFuelConsumption, setLastFuelConsumption] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const fetchedVehicles = await getVehicleById(user?.user_id);
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, [user?.user_id, isFocused]);
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

  useEffect(() => {
    if (refuelData?.length > 0) {
      let Fuel = 0,
        distance = 0;
      refuelData.forEach(
        (item: {
          consumedFuel: string;
          endReading: string;
          startReading: string;
        }) => {
          Fuel += parseFloat(item.consumedFuel);
          distance +=
            parseFloat(item.endReading) - parseFloat(item.startReading);
        },
      );
      setAvgFuelConsumption(distance / Fuel);
      setLastFuelConsumption(
        (refuelData[refuelData?.length - 1].endReading -
          refuelData[refuelData?.length - 1].startReading) /
          refuelData[refuelData?.length - 1].consumedFuel,
      );
    } else {
      setAvgFuelConsumption(0);
      setLastFuelConsumption(0);
    }
  }, [refuelData]);

  return (
    <LinearGradient style={{flex: 1}} colors={['#D0EAEA', '#F6F6EC']}>
      <SafeAreaView>
        <MenuDrawer
          open={isOpen}
          drawerContent={<Sidebar onPress={toggleFunction} />}
          drawerPercentage={80}
          animationTime={250}
          overlay={true}
          opacity={0.2}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container1}>
            <Pressable style={styles.Large} onPress={toggleFunction}>
              <Image source={require('../../assets/images/Large.png')} />
            </Pressable>
            <View>
              <LogoComponent
                viewText={user ? `Hi ${user.userName} ,` : 'Hi'}
                instructionText={
                  user && vehicles?.length === 0
                    ? 'Track your miles towards a prosperous financial journey!'
                    : 'Here is everything about your'
                }
                image={require('../../assets/images/Union.png')}
                width={28}
                height={27.908}
              />
            </View>
          </View>
          {vehicles?.length ? (
            <>
              <View style={styles.container2}>
                <Dropdown
                  data={vehicles}
                  style={styles.Dropdown}
                  maxHeight={150}
                  labelField={'vehicleName'}
                  valueField={'vehicle_id'}
                  placeholder={vehicleName}
                  value={vehicleName}
                  itemTextStyle={styles.itemTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  showsVerticalScrollIndicator={false}
                  onChange={selectedItem => {
                    setVehicleName(selectedItem.vehicleName);
                    setVehicleId(selectedItem.vehicle_id);
                    setimagePath(selectedItem.imagePath);
                    setSelectedVehicle(selectedItem);
                  }}
                  iconColor="#0B3C58"
                />
                {vehicleId && (
                  <View style={styles.imagecontainer}>
                    {imagePath && imagePath.length > 0 ? (
                      <Image
                        key={vehicleId.toString()}
                        source={{uri: imagePath}}
                        style={styles.image}
                      />
                    ) : (
                      <>
                        {vehicles.map(vehicle => {
                          if (vehicle.vehicle_id.equals(vehicleId)) {
                            return (
                              <Image
                                key={vehicleId.toString()}
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
                {vehicleId && refuelData?.length === 0 ? (
                  <AddRefuelComponent
                    onPress={() =>
                      navigation.navigate('AddRefuellingRecord', {
                        add: true,
                        edit: false,
                      })
                    }
                  />
                ) : (
                  refuelData?.length > 0 && (
                    <>
                      <Text style={styles.fullInsightsText}>Fuel insights</Text>
                      <View style={styles.fuelInsightsContainer}>
                        <View style={styles.insightBox}>
                          <Text style={styles.insightLabel}>
                            Avg Fuel Consumption
                          </Text>
                          <Text style={styles.insightValue}>
                            {avgFuelConsumption.toFixed(2)}{' '}
                            <Text style={styles.unitText}>km/l</Text>
                          </Text>
                        </View>
                        <View style={styles.insightBox}>
                          <Text style={styles.insightLabel}>
                            Last Fuel Consumption
                          </Text>
                          <Text style={styles.insightValue}>
                            {lastFuelConsumption.toFixed(2)}{' '}
                            <Text style={styles.unitText}>km/l</Text>
                          </Text>
                        </View>
                      </View>
                      <Barchart fuelData={refuelData} />
                      <View style={styles.bottomContainer}>
                        <TouchableOpacity>
                          <Text style={styles.detailsheader}>
                            Refuelling history
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Refuelling')}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.seeallText}>See all </Text>
                            <Image
                              style={{top: 3}}
                              source={require('../../assets/images/arrowred.png')}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.homeRefuel}>
                        <HomeRefuellings
                          refuellingData={refuelData}
                          vehicleId={selectedVehicle?.vehicle_id || ''}
                          navigation={navigation}
                          name={vehicleName}
                        />
                      </View>
                    </>
                  )
                )}
              </View>
            </>
          ) : (
            <View style={styles.vehicleComp}>
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
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    flex: 1,
  },
  container2: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginTop: hr(12 / 800),
  },
  Large: {
    paddingLeft: 18,
    top: 12,
    zIndex: 1,
  },
  Dropdown: {
    padding: 17,
    width: wr(150 / 360),
    height: hr(34 / 800),
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: hr(8 / 360),
  },
  imagecontainer: {
    marginTop: hr(16 / 800),
    width: wr(318 / 360),
    height: hr(178 / 800),
    borderRadius: 12,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  image: {
    width: wr(310 / 360),
    height: hr(168 / 800),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  fullInsightsText: {
    color: '#0B3C58',
    marginBottom: wr(12 / 360),
    marginTop: hr(36 / 800),
    fontSize: wr(16 / 360),
    fontWeight: '600',
    fontFamily: 'New Rubrik',
    alignSelf: 'flex-start',
    marginLeft: wr(20 / 360),
  },
  fuelInsightsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: wr(1),
    height: hr(141 / 800),
    paddingVertical: 20,
    backgroundColor: '#F0F2F2',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 2,
  },
  insightBox: {
    padding: wr(16 / 360),
    width: wr(155 / 360),
    height: hr(109 / 800),
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(166, 171, 189, 0.20)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
    backgroundColor: '#FFFFFF',
  },
  insightLabel: {
    fontFamily: 'New Rubrik',
    fontWeight: '500',
    fontSize: wr(16 / 360),
    color: '#0B3C58',
    marginBottom: 5,
  },
  insightValue: {
    fontSize: wr(14 / 360),
    color: '#0B3C58',
  },
  unitText: {
    fontSize: wr(14 / 360),
  },
  seeallText: {
    color: '#B84646',
    fontSize: wr(14 / 360),
  },
  bottomContainer: {
    marginTop: wr(36 / 360),
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsheader: {
    fontSize: wr(16 / 360),
    fontWeight: '400',
    color: '#0B3C58',
    fontFamily: 'New Rubrik',
    marginBottom: wr(10 / 360),
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
  homeRefuel: {
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
    paddingBottom: hr(20 / 800),
  },
  vehicleComp: {
    ...Platform.select({
      ios: {
        marginTop: 50,
        padding: 60,
      },
      android: {
        marginTop: 90,
        padding: 60,
      },
    }),
  },
});
