import { BASE_URL_API } from '../../shared/constants';
import { Person } from './people-model';
import { usePeopleStore } from './people-store';

export const usePeopleServices = () => {
  const { people, updateAllPeople } = usePeopleStore();

  const getPeople = async (): Promise<Array<Person>> => {
    if (people.length) {
      return await people;
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
