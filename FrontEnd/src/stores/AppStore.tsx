// stores/store.ts
import { create } from 'zustand';
import type { VistaState } from '../interfaces/stores/AppStore.type';


export const useVistaStore = create<VistaState>((set) => ({
	vista: 1,
	setVista: (vista: number) => set({ vista }),
}));