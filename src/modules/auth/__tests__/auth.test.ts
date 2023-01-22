import { cleanup } from '@testing-library/react';
import { useAuthServices } from '../auth-services';
import { act, renderHook } from '@testing-library/react-hooks';

jest.useRealTimers();

describe('Auth module', () => {

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('It should login successfully', async () => {
    const { result } = renderHook(() => useAuthServices());
    return await act(async () => {
      // email
      try {
        await result.current.login({
          email: 'mockuser@gmail.com',
          password: 'mockuser78',
        });
        expect(true).toBeTruthy();
      } catch (error) {
        expect(Boolean(error)).toBeFalsy();
      }

      // username
      try {
        await result.current.login({
          email: 'mockuser',
          password: 'mockuser78',
        });
        expect(true).toBeTruthy();
      } catch (error) {
        expect(Boolean(error)).toBeFalsy();
      }
    });
  });

  it('It should fail to login', async () => {
    const { result } = renderHook(() => useAuthServices());
    return await act(async () => {
      try {
        await result.current.login({
          email: '',
          password: '',
        });
        expect(false).toBeTruthy();
      } catch (error) {
        expect(Boolean(error)).toBeTruthy();
      }
    });
  });

  it('it should logout', async () => {
    const { result } = renderHook(() => useAuthServices());
    return await act(async () => {
      try {
        await result.current.logout();
        expect(true).toBeTruthy();
      } catch (error) {
        expect(Boolean(error)).toBeFalsy();
      }
    });
  });
});
