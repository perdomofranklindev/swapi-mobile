import { useSessionStore } from './auth-store';
import { User } from './auth-types';
import _data from './data.json';

const data: Array<User> = _data;

// Fake services.

export const useAuthServices = () => {
  const { generateSession, clearSession } = useSessionStore();

  const login = async ({ email, password }: User): Promise<void> => {
    const user = data.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new Error('Invalid credentials.');
    }

    // Fake delay with promise 2 seconds
    await new Promise(() => setTimeout(() => generateSession(), 2000));
  };

  const logout = async (): Promise<void> => {
    await new Promise(() => setTimeout(() => clearSession(), 2000));
  };

  return { login, logout };
};
