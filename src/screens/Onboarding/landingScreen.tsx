import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getAllUsers} from '../../LocalDB/APIs/UserUpdates';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';
import {CommonActions} from '@react-navigation/native';
import {useAuthStore} from '../../Zustand/AuthStore';

export const LandingScreen = () => {
  const navigation = useNavigation();
  const users = getAllUsers();
  const {AuthUser} = useAuthStore();
  const {_hasHydrated} = useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      if (_hasHydrated && AuthUser === null) {
        if (users.length) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'ChooseProfile'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignUp'}],
            }),
          );
        }
      } else if (_hasHydrated) {
        if (AuthUser?.password?.length === 0) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'NavigationContainer'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login', params: {AuthUser}}],
            }),
          );
        }
      }
    }, 2000);
  });
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/hugo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F55858',
  },
  image: {
    height: hr(149 / 360),
    width: wr(149 / 360),
    resizeMode: 'contain',
  },
});
