import { usePeopleStore } from './../people-store';
import { act, renderHook } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';

describe('People module', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('It should create a person correctly', () => {
    const { result } = renderHook(() => usePeopleStore((state) => state));

    act(() => {
      result.current.addPerson({
        name: 'Person',
        gender: 'female',
        height: '2',
      });
    });

    expect(result.current.people.length).toBe(1);
  });

  it('It should delete a person correctly', () => {
    const { result } = renderHook(() => usePeopleStore((state) => state));

    act(() => {
      result.current.updateAllPeople([
        {
          name: 'Person 1',
          gender: 'female',
          height: '2',
        },
        {
          name: 'Person 2',
          gender: 'male',
          height: '2',
        },
      ]);

      result.current.removePerson(1);
    });

    expect(result.current.people).toMatchObject([
      {
        name: 'Person 1',
        gender: 'female',
        height: '2',
      },
    ]);
  });

  it('It should update all the people state', () => {
    const { result } = renderHook(() => usePeopleStore((state) => state));

    act(() => {
      result.current.updateAllPeople([
        {
          name: 'Person 1',
          gender: 'female',
          height: '2',
        },
        {
          name: 'Person 2',
          gender: 'male',
          height: '2',
        },
      ]);
    });

    expect(result.current.people.length).toBe(2);
  });
});
