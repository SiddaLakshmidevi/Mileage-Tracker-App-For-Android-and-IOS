import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {hr, wr} from '../Utils/WidthHeightRatio';
import {getRefuellingsById} from '../../LocalDB/APIs/RefuellingUpdates';
import Realm from 'realm';

interface HomeRefuellingsProps {
  refuellingData: Array<{
    refuel_id: Realm.BSON.UUID;
    refuelDate: Date;
    consumedFuel: number;
    price: number;
  }>;
  vehicleId: any;
  navigation: any;
  name: string;
}

export const HomeRefuellings: React.FC<HomeRefuellingsProps> = ({
  vehicleId,
  navigation,
}) => {
  const [displayRefuellingData, setDisplayRefuellingData] = useState<
    Array<{
      refuel_id: string;
      refuelDate: Date;
      consumedFuel: number;
      price: number;
    }>
  >([]);

  useEffect(() => {
    const refuellingData: any[] | null = getRefuellingsById(vehicleId);
    if (refuellingData !== null) {
      refuellingData.sort((a, b) => {
        return b.refuelDate.getTime() - a.refuelDate.getTime();
      });
      setDisplayRefuellingData(
        refuellingData.map(item => ({
          refuel_id: item.refuel_id,
          refuelDate: item.refuelDate,
          consumedFuel: item.consumedFuel,
          price: item.price,
        })),
      );
    } else {
      setDisplayRefuellingData([]);
    }
  }, [vehicleId]);

  return (
    <>
      <View style={styles.scrollViewContent}>
        {displayRefuellingData.map(item => (
          <TouchableOpacity
            key={item.refuel_id}
            style={styles.recordContainer}
            onPress={() => {
              navigation.navigate('DisplayRefuellingRecord', {
                refuelId: item.refuel_id,
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    width: wr(1),
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
