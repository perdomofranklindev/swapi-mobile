import { useSessionStore } from './auth-store';
import { User } from './auth-types';
import _data from './mocks/data.json';

const data: Array<User> = _data;
const TIME = 1500 // 1.5 seconds

// Fake services.

export const useAuthServices = () => {
  const { generateSession, clearSession } = useSessionStore();

  const login = async ({ email, password }: User): Promise<void> =>
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = data.find(
          (user) => user.email === email && user.password === password,
        );

        if (!user) {
          reject({ message: 'Invalid credentials' });
        }

        generateSession();
        resolve();
      }, TIME);
    });

  const logout = async (): Promise<void> => {
    await new Promise(() => setTimeout(() => clearSession(), TIME));
  };

  return { login, logout };
};
