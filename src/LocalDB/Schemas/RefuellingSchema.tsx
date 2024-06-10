export const RefuellingSchema = {
  name: 'Refuelling',
  properties: {
    refuel_id: 'uuid',
    vehicle_id: 'uuid',
    user_id: 'uuid',
    refuelDate: 'date',
    startReading: 'string',
    endReading: 'string',
    consumedFuel: 'string',
    price: 'string',
  },
  primaryKey: 'refuel_id',
};
