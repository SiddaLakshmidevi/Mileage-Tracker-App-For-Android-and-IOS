import React from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {LogoComponent} from '../../components/ProfileComponents/LogoComponent';
import {Header} from '../../components/Heading/Header';
import {ProfileImages} from '../../components/ProfileComponents/ProfileImages';
import {wr} from '../../components/Utils/WidthHeightRatio';
import LinearGradient from 'react-native-linear-gradient';
import {User, getAllUsers, getUserById} from '../../LocalDB/APIs/UserUpdates';
import {hr} from '../../components/Utils/WidthHeightRatio';
import {Userstore} from '../../Zustand/UserStore';
import Realm from 'realm';
import {useAuthStore} from '../../Zustand/AuthStore';
import {Auth} from '../../LocalDB/APIs/isAuthenticated';

interface prifileProps {
  navigation: any;
}

export const ChooseProfileScreen: React.FC<prifileProps> = ({navigation}) => {
  const allUsers: User[] = getAllUsers();
  const {setUser} = Userstore();
  const {setAuthUser} = useAuthStore();

  return (
    <LinearGradient colors={['#D0EAEA', '#F6F6EC']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
          <LogoComponent
            image={require('../../assets/images/hugo.png')}
            width={149}
            height={149}
            viewText="Mileage Tracker"
            instructionText={''}
          />
        </View>
        <View style={styles.container2}>
          <View style={styles.text}>
            <Header title="Who are You?" />
          </View>
          <View style={styles.profiles}>
            {allUsers.map(
              (
                item: {
                  user_id: Realm.BSON.UUID;
                  userName: string;
                  email: string;
                  nickName: string | null;
                  password: string | null;
                },
                index: React.Key | null | undefined,
              ) => (
                <ProfileImages
                  key={index}
                  title={item.userName}
                  image={item.userName[0]}
                  imageBool={false}
                  onPress={() => {
                    if (item.password) {
                      navigation.navigate('Login', {item});
                    } else {
                      const userData = getUserById(item.user_id);
                      setUser(userData);

                      const updateduser = {
                        ...userData,
                        isLoggedIn: true,
                      };
                      Auth.isAuthenticatedUser(updateduser);
                      setAuthUser(updateduser);

                      navigation.navigate('NavigationContainer', {item});
                    }
                  }}
                />
              ),
            )}
            <ProfileImages
              image={require('../../assets/images/adduser.png')}
              title="Add User"
              imageBool={true}
              onPress={() => navigation.navigate('CreateAccount')}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    marginTop: hr(10 / 800),
    marginBottom: hr(8 / 800),
  },
  container2: {
    alignItems: 'center',
  },
  text: {
    marginTop: hr(120 / 800),
    marginBottom: hr(30 / 800),
  },
  profiles: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
