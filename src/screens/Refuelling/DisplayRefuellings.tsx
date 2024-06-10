import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';
import {Dropdown} from 'react-native-element-dropdown';
import {getRefuellingsById} from '../../LocalDB/APIs/RefuellingUpdates';

interface RefuellingItem {
  refuel_id: string;
  refuelDate: Date;
  consumedFuel: string;
  price: string;
}
interface DisplayRefuellingProps {
  vehicleId: string;
  navigation: any;
  itemTextStyle: {
    color: string;
    fontSize: number;
  };
  name: string;
}
export const DisplayRefuelling: React.FC<DisplayRefuellingProps> = ({
  vehicleId,
  navigation,
}) => {
  const formatTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    });
  };

  const [days, setDays] = useState('All Data');
  const [displayRefuellingData, setDisplayRefuellingData] = useState<
    RefuellingItem[]
  >([]);
  const [allRefuellings, setAllRefuellings] = useState<RefuellingItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const refuelling: any = getRefuellingsById(vehicleId);
      refuelling.sort(
        (
          a: {refuelDate: {getTime: () => number}},
          b: {refuelDate: {getTime: () => number}},
        ) => b.refuelDate.getTime() - a.refuelDate.getTime(),
      );
      setAllRefuellings(refuelling);
      setDisplayRefuellingData(refuelling);
    }, [vehicleId]),
  );

  const filterDataByDays = (selectedDays: string) => {
    let newDate = new Date();

    if (selectedDays !== 'All Data') {
      if (selectedDays === 'Last 1 Day') {
        newDate.setDate(newDate.getDate() - 1);
      } else if (selectedDays === 'Last 10 Days') {
        newDate.setDate(newDate.getDate() - 10);
      } else if (selectedDays === 'Last 30 Days') {
        newDate.setDate(newDate.getDate() - 30);
      }
    }

    const newData =
      selectedDays === 'All Data'
        ? allRefuellings
        : allRefuellings.filter(item => {
            const refuelDate = new Date(item.refuelDate);
            return refuelDate >= newDate;
          });
    newData.sort((a, b) => b.refuelDate.getTime() - a.refuelDate.getTime());
    setDisplayRefuellingData(newData);
  };
  const dropdownData = [
    {label: 'Last 1 Day', value: 1},
    {label: 'Last 10 Days', value: 10},
    {label: 'Last 30 Days', value: 30},
    {label: 'All Data', value: 'All Data'},
  ];
  return (
    <>
      <View style={styles.dropdownContainer}>
        <Dropdown
          data={dropdownData}
          style={styles.dropdown}
          labelField="label"
          valueField="value"
          placeholder={days}
          onChange={item => {
            setDays(item.label);
            filterDataByDays(item.label);
          }}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
        />
      </View>

      <Text style={styles.heading}>
        {displayRefuellingData.length} Records | {formatTodayDate()} - Today
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {displayRefuellingData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recordContainer}
            onPress={() => {
              navigation.navigate('DisplayRefuellingRecord', {
                refuelId: item?.refuel_id,
              });
            }}>
            <View style={styles.leftContainer}>
              <View>
                <Image
                  source={require('../../assets/images/flower.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.leftTextContainer}>
                <Text style={styles.date}>
                  {item.refuelDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                  })}
                </Text>
                <Text style={styles.fuel}>{item.consumedFuel} L</Text>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.rightText}>+S$ {item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    alignItems: 'center',
  },
  dropdown: {
    width: wr(156 / 360),
    height: hr(36 / 800),
    marginTop: hr(16 / 800),
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    elevation: 2,
  },
  placeholderStyle: {
    color: '#0B3C58',
    fontSize: wr(14 / 360),
    fontWeight: '400',
    fontFamily: 'New Rubrik',
    marginLeft: wr(20 / 360),
  },
  itemTextStyle: {
    color: '#0B3C58',
    fontSize: wr(14 / 360),
  },
  selectedTextStyle: {
    color: '#0B3C58',
    fontSize: wr(14 / 360),
    marginLeft: wr(20 / 360),
    fontWeight: '400',
    fontFamily: 'New Rubrik',
  },
  scrollView: {
    width: '100%',
    marginTop: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  recordContainer: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    elevation: 2,
    width: wr(324 / 360),
    height: hr(60 / 800),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 29,
    height: 29,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTextContainer: {
    flexDirection: 'column',
    margin: 5,
    marginLeft: 10,
  },
  date: {
    color: '#0B3C58',
    fontSize: 14,
  },
  fuel: {
    marginTop: 3,
    color: '#58798C',
    fontSize: 11,
  },
  rightContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  rightText: {
    color: '#0B3C58',
    fontSize: 14,
  },
  heading: {
    color: '#58798C',
    fontSize: 12,
    marginTop: 20,
  },
});
