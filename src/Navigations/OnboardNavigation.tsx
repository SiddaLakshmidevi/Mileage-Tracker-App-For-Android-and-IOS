import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUpScreen} from '../screens/Onboarding/signUpScreen';
import {CreateAccountScreen} from '../screens/Onboarding/createAccountScreen';
import {PasscodeScreen} from '../screens/Onboarding/passcodeScreen';
import {LandingScreen} from '../screens/Onboarding/landingScreen';
import {ChooseProfileScreen} from '../screens/Onboarding/ProfileScreen';
import {LoginScreen} from '../screens/Onboarding/LoginScreen';
import {TabNavigation} from './TabNavigation';

const Stack = createStackNavigator();

export const OnboardNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LandingScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ChooseProfile" component={ChooseProfileScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="SetPassword" component={PasscodeScreen} />
        <Stack.Screen name="NavigationContainer" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
