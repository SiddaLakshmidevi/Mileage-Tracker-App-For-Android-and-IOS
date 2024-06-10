import Realm from 'realm';
Realm.flags.THROW_ON_GLOBAL_REALM = true;
import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
