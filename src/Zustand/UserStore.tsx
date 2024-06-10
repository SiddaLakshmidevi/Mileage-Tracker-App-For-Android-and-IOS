import {create} from 'zustand';

interface userStore {
  user: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const Userstore = create<userStore>(set => ({
  user: null,
  setUser: user => set({user}),
  clearUser: () => set({user: null}),
}));
