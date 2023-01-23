import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionState {
  name: string | null;
  session: string | null; // Token or access token.
  _hasHydrated: boolean;
  generateSession: (name: string) => void;
  clearSession: () => void;
}

// Persist.
export const useSessionStore = create(
  persist<SessionState>(
    (set) => ({
      name: null,
      session: null,
      _hasHydrated: false,
      generateSession: (name: string) =>
        set({
          name,
          session: 'mock-session',
        }),
      clearSession: () =>
        set({
          name: null,
          session: null,
        }),
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
