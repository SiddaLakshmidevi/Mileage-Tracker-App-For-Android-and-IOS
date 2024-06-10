import Realm from 'realm';
import {realmConfig} from './Config';

export interface Vehicle {
  vehicle_id: Realm.BSON.UUID;
  vehicleName: string;
  engine: string;
  vehicleType: string;
  imagePath: string;
  user_id: Realm.BSON.UUID;
}

export const isValidVehicleInput = (
  vehicleName: string,
  engine: string,
  vehicleType: string,
) => {
  return vehicleName && engine && vehicleType;
};

export const createNewVehicle = ({
  imagePath,
  vehicleName,
  vehicleType,
  engine,
  user_id,
}: Vehicle) => {
  if (!isValidVehicleInput(vehicleName, engine, vehicleType)) {
    console.error('Invalid vehicle input. Please provide valid data.');
    return null;
  }

  const newVehicle = {
    vehicle_id: new Realm.BSON.UUID(),
    imagePath,
    user_id,
    vehicleName,
    engine,
    vehicleType,
  };

  realmConfig.write(() => {
    realmConfig.create('Vehicle', newVehicle);
  });

  return newVehicle;
};

export const fetchAllVehicles = () => {
  try {
    const allVehicles = realmConfig.objects('Vehicle');

    const vehiclesArray = Array.from(allVehicles);

    return vehiclesArray;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

export const getVehicleById = (user_id: string): Vehicle[] | null => {
  try {
    const vehicles = realmConfig
      .objects('Vehicle')
      .filtered('user_id == $0', user_id);

    const vehiclesArray = Array.from(vehicles) as unknown as Vehicle[];

    return vehiclesArray;
  } catch (error) {
    console.error('Error fetching vehicles by USER ID:', error);
    return [];
  }
};

export const getVehicleByVehicleId = (vehicle_id: string): Vehicle | null => {
  try {
    const vehicle = realmConfig
      .objects('Vehicle')
      .filtered('vehicle_id == $0', vehicle_id)[0];
    return vehicle ? (vehicle as unknown as Vehicle) : null;
  } catch (error) {
    console.error('Error fetching vehicle by VEHICLE ID:', error);
    return null;
  }
};
