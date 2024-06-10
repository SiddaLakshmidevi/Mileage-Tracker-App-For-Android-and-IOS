export const VehicleSchema = {
  name: 'Vehicle',
  properties: {
    vehicle_id: 'uuid',
    imagePath: 'string',
    vehicleName: 'string',
    vehicleType: 'string',
    engine: 'string',
    user_id: 'uuid',
  },
  primaryKey: 'vehicle_id',
};
