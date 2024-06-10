import Realm from 'realm';
import {VehicleSchema} from '../Schemas/VehicleSchema';
import {UserSchema} from '../Schemas/UserSchema';
import {RefuellingSchema} from '../Schemas/RefuellingSchema';
import {isAuthenticated} from '../Schemas/isAuthenticatedSchema';
// const Realm = require('realm');
const CURRENT_SCHEMA_VERSION = 4;

export const realmConfig = new Realm({
  schema: [UserSchema, VehicleSchema, RefuellingSchema, isAuthenticated],
  schemaVersion: CURRENT_SCHEMA_VERSION,
  deleteRealmIfMigrationNeeded: true,
});
