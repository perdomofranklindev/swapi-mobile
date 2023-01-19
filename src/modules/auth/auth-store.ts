import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  session: string | null;
  generateSession: () => void;
  clearSession: () => void;
}

export const useSessionStore = create(
  persist<SessionState>(
    (set) => ({
      session: null,
      generateSession: () => set({ session: 'mock-session' }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'session-storage', // Unique name
      getStorage: () => AsyncStorage, // Add this here!
    },
  ),
);
