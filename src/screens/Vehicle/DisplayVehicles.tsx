import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import React from 'react';

interface DisplayVehiclesProps {
  navigation: any;
  data: any[];
}

export const DisplayVehicles: React.FC<DisplayVehiclesProps> = ({
  navigation,
  data,
}) => {
  const vehicles = data;

  return (
    <View style={{flex: 1}}>
      <View style={styles.headingcontainer}>
        <Text style={styles.heading}>Vehicles</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {vehicles.map(item => (
          <View key={item.vehicle_id} style={styles.displaycontainer}>
            {item.imagePath.length > 0 ? (
              <Image source={{uri: item.imagePath}} style={styles.image} />
            ) : (
              <>
                {item.vehicleType === '2 Wheeler' && (
                  <Image
                    source={require('../../assets/images/twowheeler.png')}
                    defaultSource={require('../../assets/images/twowheeler.png')}
                    style={styles.image}
                  />
                )}
                {item.vehicleType === '4 Wheeler' && (
                  <Image
                    source={require('../../assets/images/fourwheeler.png')}
                    defaultSource={require('../../assets/images/twowheeler.png')}
                    style={styles.image}
                  />
                )}
              </>
            )}

            <View style={styles.container1}>
              <View style={styles.left}>
                <Text style={styles.itemname}>{item.vehicleName}</Text>
                <Text style={styles.itemtype}>{item.vehicleType}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.engine}>{item.engine} CC</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.plusIcon}>
        <TouchableOpacity onPress={() => navigation.navigate('VehicleForm')}>
          <Image
            source={require('../..//assets/images/adduser.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    marginTop: hr(20 / 800),
    width: wr(1),
    height: hr(55 / 800),
    borderBottomWidth: hr(1.6 / 800),
    borderBottomColor: '#CED8DE',
  },
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
  displaycontainer: {
    alignItems: 'center',
    marginTop: hr(20 / 800),
    borderRadius: 10,
    marginBottom: hr(1 / 800),
  },
  image: {
    width: wr(324 / 360),
    height: hr(148 / 800),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemname: {
    fontSize: wr(14 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '500',
    color: '#0B3C58',
  },
  itemtype: {
    fontSize: wr(11 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    color: '#58798C',
  },
  engine: {
    fontSize: wr(14 / 360),
    fontFamily: 'New Rubrik',
    fontWeight: '400',
    color: '#0B3C58',
  },
  left: {
    width: wr(260 / 360),
    height: hr(36 / 800),
    marginLeft: wr(10 / 360),
    marginTop: hr(3 / 360),
    marginBottom: hr(2 / 800),
  },
  container1: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    width: wr(324 / 360),
    height: hr(52 / 800),
  },
  right: {
    marginTop: hr(6 / 360),
    marginRight: wr(10 / 360),
  },
  icon: {
    height: hr(48 / 800),
    width: wr(48 / 360),
  },
  plusIcon: {
    position: 'absolute',
    bottom: -36,
    zIndex: 1,
    right: 14,
  },
});
