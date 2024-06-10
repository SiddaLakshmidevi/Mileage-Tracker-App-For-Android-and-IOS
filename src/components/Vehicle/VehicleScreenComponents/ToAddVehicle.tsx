import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {LogoComponent} from '../../ProfileComponents/LogoComponent';
import {NavigationButton} from '../../Buttons/NavigationButton';
import {wr, hr} from '../../Utils/WidthHeightRatio';

interface ToAddVehicleProps {
  navigation: any;
}

export const ToAddVehicle: React.FC<ToAddVehicleProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingcontainer}>
        <Text style={styles.heading}>Vehicle</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <LogoComponent
            instructionText="Add a vehicle to start tracking its refuelling & performance"
            image={require('../../../assets/images/Milestone.png')}
            width={110}
            height={110}
            viewText={''}
          />
        </View>
        <NavigationButton
          title="Add Vehicle"
          onPress={() => {
            navigation.navigate('VehicleForm');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F2',
    alignItems: 'center',
  },
  headingcontainer: {
    alignItems: 'center',
    marginTop: hr(20 / 800),
    width: wr(1),
    height: hr(55 / 800),
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
  container1: {
    position: 'absolute',
    width: wr(324 / 360),
    height: hr(238 / 800),
    marginTop: hr(210 / 800),
    alignItems: 'center',
  },
  container2: {
    marginBottom: hr(18 / 800),
  },
});
