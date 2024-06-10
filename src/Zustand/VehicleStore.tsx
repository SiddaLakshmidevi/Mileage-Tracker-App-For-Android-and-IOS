import {create} from 'zustand';
import {getVehicleById} from '../LocalDB/APIs/VehicleUpdates';
import {Userstore} from './UserStore';

interface VehicleStoreState {
  vehicles: any[] | null;
  selectedVehicle: any | null;
  setSelectedVehicle: (selectedVehicle: any) => void;
  clearSelectedVehicle: () => void;
  deleteVehiclesData: () => void;
  fetchVehicles: () => void;
}

export const useVehicleStore = create<VehicleStoreState>(set => ({
  vehicles: [],
  selectedVehicle: null,
  setSelectedVehicle: selectedVehicle => set({selectedVehicle}),
  clearSelectedVehicle: () => set({selectedVehicle: null}),
  deleteVehiclesData: () => set({vehicles: []}),

  fetchVehicles: () => {
    const {user} = Userstore.getState();
    try {
      const fetchedVehicles = getVehicleById(user?.user_id);
      set({vehicles: fetchedVehicles});
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  },
}));
