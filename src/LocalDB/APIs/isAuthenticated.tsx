import Realm from 'realm';
import {realmConfig} from './Config';

interface AuthUser {
  isLoggedIn: boolean;
  user_id?: Realm.BSON.UUID;
  userName?: string;
  email?: string;
  password?: string;
}

export const Auth = {
  isValidUser: (user: AuthUser): boolean => {
    return !!user.userName && !!user.email && !!user.user_id;
  },

  isAuthenticatedUser: (user: AuthUser): AuthUser | null => {
    if (!Auth.isValidUser(user)) {
      console.error('Invalid user input. Please provide valid data.');
      return null;
    }
    const authState = realmConfig.objects(
      'isAuthenticated',
    )[0] as unknown as AuthUser;

    realmConfig.write(() => {
      if (authState) {
        Object.assign(authState, user);
      } else {
        realmConfig.create('isAuthenticated', {
          auth_id: new Realm.BSON.UUID(),
          ...user,
        });
      }
    });

    return authState;
  },
};
