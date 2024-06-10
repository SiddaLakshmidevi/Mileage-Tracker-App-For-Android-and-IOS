import Realm from 'realm';
import {realmConfig} from './Config';

export interface User {
  userName: string;
  email: string;
  nickName: string | null;
  password: string | null;
  user_id: Realm.BSON.UUID;
}

export const isValidUserInput = (userName: string, email: string) => {
  return userName && email;
};

export const createNewUser = ({
  userName,
  nickName,
  email,
  password,
}: {
  userName: string;
  nickName: string | null;
  email: string;
  password: string | null;
}): User | null => {
  if (!isValidUserInput(userName, email)) {
    console.error('Invalid user input. Please provide valid data.');
    return null;
  }

  const newUser = {
    user_id: new Realm.BSON.UUID(),
    userName,
    nickName,
    email,
    password,
  };

  realmConfig.write(() => {
    realmConfig.create('User', newUser);
  });
  return newUser;
};

export const getUserById = (user_id: string | Realm.BSON.UUID) => {
  const user = realmConfig
    .objects('User')
    .filtered('user_id == $0', user_id)[0];
  return user ? {...user} : null;
};

export const getAllUsers = (): User[] => {
  const allUsers: any = realmConfig.objects('User');
  return allUsers;
};

export const deleteUserById = (user_id: string) => {
  realmConfig.write(() => {
    const userToDelete = realmConfig.objectForPrimaryKey<User>('User', user_id);
    if (userToDelete) {
      realmConfig.delete(userToDelete);
    }
  });
};
