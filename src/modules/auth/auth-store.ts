import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionState {
  session: string | null;
  _hasHydrated: boolean;
  generateSession: () => void;
  clearSession: () => void;
}

// Persist.
export const useSessionStore = create(
  persist<SessionState>(
    (set) => ({
      session: null,
      _hasHydrated: false,
      generateSession: () => set({ session: 'mock-session' }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'session-storage', // Unique name
      onRehydrateStorage: () => () => {
        useSessionStore.setState({ _hasHydrated: true });
      },
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
