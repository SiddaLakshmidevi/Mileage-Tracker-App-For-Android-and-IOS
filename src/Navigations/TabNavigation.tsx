import React from 'react';
import {Image} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {hr, wr} from '../components/Utils/WidthHeightRatio';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {Vehicles} from '../screens/Vehicle/Vehicles';
import {Refuelling} from '../screens/Refuelling/Refuelling';
import {Performance} from '../screens/Performance/Performance';
import {View} from 'react-native';
const Tab = createBottomTabNavigator();
export const TabNavigation = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../assets/images/hometaped.png')
              : require('../assets/images/home.png');
          } else if (route.name === 'Refuelling') {
            iconName = focused
              ? require('../assets/images/refuellingtaped.png')
              : require('../assets/images/refuelling.png');
          } else if (route.name === 'Performance') {
            iconName = focused
              ? require('../assets/images/performancetaped.png')
              : require('../assets/images/per.png');
          } else if (route.name === 'Vehicle') {
            iconName = focused
              ? require('../assets/images/vehicletaped.png')
              : require('../assets/images/vehicles.png');
          }

          return (
            <View style={{top: 7}}>
              <Image
                source={iconName}
                style={{
                  height: hr(24 / 800),
                  width: wr(24 / 360),
                }}
              />
            </View>
          );
        },
        style: {position: 'absolute'},
        headerShown: false,
        tabBarActiveTintColor: '#0B3C58',
        tabBarInactiveTintColor: '#6D8A9B',
        tabBarLabelPosition: 'below-icon',
        unmountOnBlur: false,
        tabBarLabelStyle: {
          fontSize: hr(11 / 800),
          fontWeight: '400',
          top: 10,
        },
        freezeOnBlur: true,
        tabBarStyle: [
          {
            display: 'flex',
            height: hr(68 / 800),
          },
        ],
      })}>
      <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="Refuelling" component={Refuelling}></Tab.Screen>
      <Tab.Screen name="Performance" component={Performance}></Tab.Screen>
      <Tab.Screen name="Vehicle" component={Vehicles}></Tab.Screen>
    </Tab.Navigator>
  );
};
