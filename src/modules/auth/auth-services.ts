import { useSessionStore } from './auth-store';
import { User } from './auth-types';
import _data from './mocks/data.json';

const data: Array<User> = _data;
const TIME = 1500; // 1.5 seconds

// Fake services.

export const useAuthServices = () => {
  const { generateSession, clearSession } = useSessionStore();

  /**
   * @description - Fake login service.
   * @param root0 - User object.
   * @param root0.email - User email.
   * @param root0.password - User password.
   * @returns {Promise<void>} - Nothing.
   */
  const login = async ({ email, password }: User): Promise<void> =>
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = data.find(
          (user) =>
            (user.email === email || user.username === email) &&
            user.password === password,
        );

        if (!user) {
          return reject({ message: 'Invalid credentials' });
        }

        generateSession();
        return resolve();
      }, TIME);
    });

  /**
   * @description - Fake logout service.
   * @returns {Promise<void>} - Nothing.
   */
  const logout = async (): Promise<void> => {
    await new Promise(() => setTimeout(() => clearSession(), TIME));
  };

  return { login, logout };
};
