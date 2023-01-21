import { BASE_URL_API } from '../../shared/constants';
import { Person } from './people-types';
import { usePeopleStore } from './people-store';

export const usePeopleServices = () => {
  const { People, updateAllPeople } = usePeopleStore();

  const getPeople = async (): Promise<Array<Person>> => {
    if (People.length) {
      return await People;
    }

    return fetch(`${BASE_URL_API}/people/`)
      .then((response) => response.json())
      .then((data) => {
        updateAllPeople(data.results);
        return data.results;
      });
  };

  return {
    getPeople,
  };
};
