export const isAuthenticated = {
  name: 'isAuthenticated',
  properties: {
    auth_id: 'uuid',
    user_id: 'uuid',
    userName: 'string',
    email: 'string',
    password: 'string',
    isLoggedIn: {type: 'bool', default: false},
  },
  primaryKey: 'auth_id',
};
