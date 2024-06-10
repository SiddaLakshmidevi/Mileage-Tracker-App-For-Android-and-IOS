import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import {Header} from '../../components/Heading/Header';
import {ImageUploader} from '../../components/Vehicle/VehicleScreenComponents/ImageUploader';
import {FloatingLabelInput} from '../../components/Vehicle/VehicleScreenComponents/FloatingLabelInput';
import {Dropdown} from 'react-native-element-dropdown';
import {Userstore} from '../../Zustand/UserStore';
import {createNewVehicle} from '../../LocalDB/APIs/VehicleUpdates';
import {wr, hr} from '../../components/Utils/WidthHeightRatio';
import Realm from 'realm';

interface VehicleFormProps {
  navigation: any;
}

export const VehicleForm: React.FC<VehicleFormProps> = ({navigation}) => {
  const data = [
    {label: '2 Wheeler', value: '2 Wheeler'},
    {label: '3 Wheeler', value: '3 Wheeler'},
    {label: '4 Wheeler', value: '4 Wheeler'},
    {label: 'other', value: 'other'},
  ];
  const [vehicleimage, setVehicleimage] = useState('');
  const [vehicletype, setVehicletype] = useState('Select vehicle type');
  const [vehiclename, setVehiclename] = useState('');
  const [engineCC, setEngineCC] = useState<string>('');
  const [error, setError] = useState('');

  const {user} = Userstore();

  const handleAddVehicle = () => {
    if (!vehiclename || !vehicletype || !engineCC) {
      setError('Please fill all the Details..');
    } else {
      try {
        const newVehicle = createNewVehicle({
          imagePath: vehicleimage,
          vehicleName: vehiclename,
          vehicleType: vehicletype,
          engine: engineCC.toString(),
          user_id: user.user_id,
          vehicle_id: new Realm.BSON.UUID(),
        });

        if (newVehicle) {
          navigation.navigate('VehicleAdded', {newVehicle});
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  if (error) {
    setTimeout(() => {
      setError('');
    }, 5000);
  }
  const isEnable =
    vehiclename.length !== 0 &&
    vehicletype.length !== 0 &&
    engineCC?.length !== 0;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.redContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrowleft.png')}
            style={{
              width: wr(24 / 360),
              height: hr(24 / 800),
              left: hr(16 / 800),
              marginTop: hr(20 / 800),
            }}
          />
        </Pressable>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.container1}>
          <View style={styles.header}>
            <Header title="Add Vehicle" />
          </View>
          <View style={styles.image}>
            <ImageUploader image={vehicleimage} setImage={setVehicleimage} />
          </View>
          <FloatingLabelInput
            labelText={'Vehicle Name'}
            inputValue={vehiclename}
            setInputValue={setVehiclename}
            numericKeyboard={false}
          />
          <View style={styles.CustomDropdown}>
            <Dropdown
              data={data}
              maxHeight={300}
              labelField={'label'}
              valueField={'value'}
              placeholder={'Vehicle Type'}
              searchPlaceholder={'Search...'}
              value={vehicletype}
              style={styles.dropdown}
              showsVerticalScrollIndicator={true}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              onChange={item => {
                setVehicletype(item.value);
              }}
              iconColor="#0B3C58"
            />
          </View>
          <FloatingLabelInput
            labelText={'Engine CC'}
            inputValue={engineCC.toString()}
            setInputValue={setEngineCC}
            numericKeyboard={true}
          />
        </View>
        <Text style={styles.err}>{error}</Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button, {borderWidth: 1}]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: !isEnable ? '#B0B0B0' : '#0B3C58'},
            ]}
            onPress={handleAddVehicle}>
            <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F55858',
    overflow: 'hidden',
  },
  redContainer: {
    width: wr(1),
    backgroundColor: '#F55858',
  },
  mainContainer: {
    width: wr(1000 / 360),
    flex: 2,
    borderTopRightRadius: wr(500 / 360),
    borderTopLeftRadius: wr(500 / 360),
    backgroundColor: '#f1f2f2',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginVertical: hr(15 / 800),
  },
  container1: {
    alignItems: 'center',
  },
  CustomDropdown: {
    width: wr(324 / 360),
    backgroundColor: '#fff',
    marginTop: hr(20 / 800),
    marginBottom: hr(20 / 800),
    height: hr(52 / 800),
    alignItems: 'center',
    borderRadius: 5,
    color: '#0B3C58',
  },
  text: {
    marginLeft: hr(8 / 800),
    fontSize: hr(11 / 800),
    color: '#6D8A9B',
  },
  dropdown: {
    height: hr(52 / 800),
    width: wr(324 / 360),
    padding: hr(10 / 800),
    alignItems: 'center',
  },
  image: {
    marginBottom: hr(24 / 800),
    alignItems: 'center',
    resizeMode: 'contain',
  },
  iconStyle: {
    fontSize: wr(16 / 360),
    color: '#0B3C58',
  },
  buttons: {
    alignSelf: 'center',
  },
  cancle: {
    color: '#0B3C58',
    fontSize: wr(16 / 360),
    fontWeight: '500',
    fontFamily: 'New Rubrik',
  },
  add: {
    color: '#FFFFFF',
    fontSize: wr(16 / 360),
    fontWeight: '500',
    fontFamily: 'New Rubrik',
  },
  placeholderStyle: {
    color: '#58798C',
    fontSize: wr(18 / 360),
    fontWeight: '400',
    fontFamily: 'New Rubrik',
  },
  bottomContainer: {
    flexDirection: 'row',
    marginBottom: '3%',
    // position: 'absolute',
    // ...Platform.select({
    //   ios: {
    //     marginTop: hr(620 / 800),
    //   },
    //   android: {
    //     marginTop: hr(675 / 800),
    //   },
    // }),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wr(8 / 360),
    width: wr(158 / 360),
    height: hr(48 / 800),
    marginLeft: wr(8 / 360),
  },
  selectedTextStyle: {
    color: '#0B3C58',
  },
  itemTextStyle: {
    color: '#0B3C58',
  },
  err: {
    color: '#FF4E4E',
    fontSize: 14,
  },
});
