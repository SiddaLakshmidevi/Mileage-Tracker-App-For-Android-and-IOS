import React from 'react';
import 'react-native-get-random-values';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUpScreen} from './src/screens/Onboarding/signUpScreen';
import {VehicleAdded} from './src/screens/Vehicle/VehicleAdded';
import {VehicleForm} from './src/screens/Vehicle/VehicleForm';
import {TabNavigation} from './src/Navigations/TabNavigation';
import {AddRefuellingRecord} from './src/screens/Refuelling/AddRefuellingRecord';
import {OnboardNavigation} from './src/Navigations/OnboardNavigation';
import {Userstore} from './src/Zustand/UserStore';
import {DisplayRefuellingRecord} from './src/screens/Refuelling/DisplayRefuellingRecord';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ErrorScreen} from './src/screens/GenericErrors/ErrorScreen';

const Stack = createStackNavigator();

export const App = () => {
  const {user} = Userstore();
  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="NavigationContainer"
              component={TabNavigation}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="VehicleForm" component={VehicleForm} />
            <Stack.Screen name="VehicleAdded" component={VehicleAdded} />
            <Stack.Screen
              name="AddRefuellingRecord"
              component={AddRefuellingRecord}
            />
            <Stack.Screen
              name="DisplayRefuellingRecord"
              component={DisplayRefuellingRecord}
            />
          </Stack.Navigator>
          <Stack.Screen name="ErrorScreen " component={ErrorScreen} />
        </NavigationContainer>
      ) : (
        <OnboardNavigation />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
