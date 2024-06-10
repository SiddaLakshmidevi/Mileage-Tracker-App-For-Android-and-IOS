export const UserSchema = {
  name: 'User',
  properties: {
    user_id: 'uuid',
    userName: 'string',
    nickName: 'string?',
    email: 'string',
    password: 'string?',
  },
  primaryKey: 'user_id',
};
