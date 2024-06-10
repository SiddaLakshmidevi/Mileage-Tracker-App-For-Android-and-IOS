import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import {Image, Pressable} from 'react-native';
import {SidebarButton} from '../../components/Buttons/SidebarButton';
import {Userstore} from '../../Zustand/UserStore';
import {useAuthStore} from '../../Zustand/AuthStore';
import {Auth} from '../../LocalDB/APIs/isAuthenticated';
import {hr, wr} from '../../components/Utils/WidthHeightRatio';
import {PopupScreen} from '../PopupScreen/PopupScreen';
import {PopupScreen2} from '../PopupScreen/PopupSceen2';
import {deleteUserById} from '../../LocalDB/APIs/UserUpdates';
import {useVehicleStore} from '../../Zustand/VehicleStore';

interface props {
  onPress: any;
}

export const Sidebar: React.FC<props> = ({onPress}) => {
  const {user, clearUser} = Userstore();
  const {clearAuthUser} = useAuthStore();
  const {clearSelectedVehicle} = useVehicleStore();

  const handleLogOut = async () => {
    clearSelectedVehicle();

    const updatedUser = {
      ...user,
      isLoggedIn: false,
    };

    const authUpdateResult = await Auth.isAuthenticatedUser(updatedUser);
    console.log(authUpdateResult);
    clearAuthUser();
    clearUser();
  };

  const [alertVisible, setAlertVisible] = useState(false);
  const toggleModal = () => {
    setAlertVisible(!alertVisible);
  };

  const handleDeleteAccount = async () => {
    try {
      const updatedUser = {
        ...user,
        isLoggedIn: false,
      };

      deleteUserById(user.user_id);

      await Auth.isAuthenticatedUser(updatedUser);

      clearUser();
      clearAuthUser();
    } catch (e) {
      console.error('Error deleting account:', e);
    }

    toggleModal();
  };

  const handleNo = () => {
    toggleModal();
  };

  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

  const toggleLogoutAlert = () => {
    setLogoutAlertVisible(!logoutAlertVisible);
  };
  const handleNoLogout = () => {
    toggleLogoutAlert();
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.Large}>
        <Image source={require('../../assets/images/Large.png')} />
      </View>
      <TouchableOpacity style={styles.header} onPress={onPress}>
        <Text style={styles.userName}>{user ? user.userName : 'Guest'}</Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <SidebarButton
          image={require('../../assets/images/switchprofile.png')}
          title="Switch Profile"
          onPress={handleLogOut}
        />
        <View style={styles.horizontalLine} />
        <SidebarButton
          image={require('../../assets/images/deleteaccount.png')}
          title="Delete Account"
          onPress={toggleModal}
        />
      </View>

      <View style={styles.logoutbutton}>
        <TouchableOpacity onPress={toggleLogoutAlert}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.version}
        source={require('../../assets/images/version.png')}
      />

      {logoutAlertVisible === true && (
        <PopupScreen2
          data={'Are you sure you want to logout'}
          onPressYes={handleLogOut}
          onPressNo={handleNoLogout}
        />
      )}

      {alertVisible === true && (
        <PopupScreen
          smalldata={'Note that your entire data will be lost permanently.'}
          data={'Are you sure you want to delete your account?'}
          onPressYes={handleDeleteAccount}
          onPressNo={handleNo}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F2',
    alignItems: 'center',
  },
  header: {
    width: wr(260 / 360),
  },
  Large: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: hr(60 / 800),
    marginVertical: 16,
  },
  horizontalLine: {
    borderBottomColor: '#CED8DE',
    borderBottomWidth: 1,
    width: wr(220 / 360),
    alignSelf: 'center',
  },
  userName: {
    fontFamily: 'New Rubrik',
    fontSize: wr(20 / 360),
    fontWeight: '500',
    color: '#0B3C58',
  },
  buttons: {
    margin: hr(16 / 800),
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 3,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(166, 171, 189, 0.40)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  logoutbutton: {
    backgroundColor: '#F93333',
    height: hr(52 / 800),
    width: wr(252 / 360),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '10%',
    ...Platform.select({
      ios: {
        marginVertical: hr(340 / 800),
      },
      android: {
        marginVertical: hr(390 / 800),
      },
    }),
  },
  logoutText: {
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: wr(15 / 360),
    fontFamily: 'New Rubrik',
  },
  version: {
    width: wr(288 / 360),
    height: hr(41 / 800),
    bottom: 80,
    position: 'absolute',
  },
});
