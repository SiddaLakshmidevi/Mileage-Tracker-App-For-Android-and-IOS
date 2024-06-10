import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AuthStore {
  AuthUser: null | any;
  setAuthUser: (AuthUser: any) => void;
  clearAuthUser: () => void;
  _hasHydrated: boolean;
}

export const useAuthStore = create<AuthStore>(
  persist(
    set => ({
      AuthUser: null,
      setAuthUser: (AuthUser: any) => set({AuthUser}),
      clearAuthUser: () => set({AuthUser: null}),
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state: any) => {
        state.setHasHydrated(true);
      },
    },
  ) as any,
);
