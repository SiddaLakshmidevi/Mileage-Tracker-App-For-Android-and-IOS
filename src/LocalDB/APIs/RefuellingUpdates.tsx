import Realm from 'realm';
import {realmConfig} from './Config';

export interface Refuel {
  date: string | number | Date;
  refuellingId(refuellingId: any): unknown;
  isValid(): unknown;
  vehicle_id: Realm.BSON.UUID;
  refuelDate: Date;
  startReading: string;
  endReading: string;
  user_id: Realm.BSON.UUID;
  consumedFuel: string;
  price: string;
  refuel_id: Realm.BSON.UUID;
}

export const isValidRefuellingInput = (
  vehicle_id: Realm.BSON.UUID,
  refuelDate: Date | null,
  startReading: string,
  endReading: string,
  user_id: Realm.BSON.UUID,
  consumedFuel: string,
  price: string,
) => {
  return (
    vehicle_id &&
    refuelDate &&
    startReading &&
    endReading &&
    user_id &&
    consumedFuel &&
    price
  );
};

export const createNewRefuel = ({
  vehicle_id,
  refuelDate,
  startReading,
  endReading,
  user_id,
  consumedFuel,
  price,
}: Refuel) => {
  if (
    !isValidRefuellingInput(
      vehicle_id,
      refuelDate,
      startReading,
      endReading,
      user_id,
      consumedFuel,
      price,
    )
  ) {
    console.error('Invalid Refuelling input. Please provide valid data.');
    return null;
  }

  const refuellingRecord = {
    refuel_id: new Realm.BSON.UUID(),
    vehicle_id,
    user_id,
    refuelDate,
    startReading,
    endReading,
    consumedFuel,
    price,
  };

  realmConfig.write(() => {
    realmConfig.create('Refuelling', refuellingRecord);
  });
  return refuellingRecord;
};

export const deleteRefuellingRecord = (refuel_id: string) => {
  const existingRefuel = realmConfig.objectForPrimaryKey(
    'Refuelling',
    refuel_id,
  );
  if (!existingRefuel) {
    console.error(`Refuelling record with ID ${refuel_id} not found.`);
    return;
  }
  realmConfig.write(() => {
    realmConfig.delete(existingRefuel);
  });
};

export const updateRefuelling = (updatedData: Refuel) => {
  const existingRefuel = realmConfig.objectForPrimaryKey(
    'Refuelling',
    updatedData.refuel_id,
  );

  if (existingRefuel) {
    realmConfig.write(() => {
      existingRefuel.refuelDate = updatedData.refuelDate;
      existingRefuel.startReading = updatedData.startReading;
      existingRefuel.endReading = updatedData.endReading;
      existingRefuel.consumedFuel = updatedData.consumedFuel;
      existingRefuel.price = updatedData.price;
    });
  } else {
    console.error(
      `Refuelling record with ID ${updatedData.refuel_id} not found.`,
    );
  }
  return existingRefuel;
};

export const fetchAllRefuellings = () => {
  try {
    const allRefuellings = realmConfig.objects('Refuelling');

    const refuellingArray = Array.from(allRefuellings);

    return refuellingArray;
  } catch (error) {
    console.error('Error fetching Refuellings:', error);
    return [];
  }
};

export const getRefuellingsById = (vehicle_id: Realm.BSON.UUID): Refuel[] => {
  try {
    const refuellings = realmConfig
      .objects<Refuel>('Refuelling')
      .filtered('vehicle_id == $0', vehicle_id)
      .sorted('startReading', true);
    const refuellingsArray: any = Array.from(
      refuellings,
    ) as unknown as Refuel[];

    return refuellingsArray;
  } catch (error) {
    console.error('Error fetching refuelling by Vehicle_ID:', error);
    return [];
  }
};

export const getRefuellingByrefuelId = (refuel_id: string): Refuel[] => {
  try {
    const refuelling = realmConfig
      .objects('Refuelling')
      .filtered('refuel_id == $0', refuel_id);

    const refuellingArray: any = Array.from(refuelling);

    return refuellingArray;
  } catch (error) {
    console.error('Error fetching refuelling by Refuel_ID:', error);
    return [];
  }
};
