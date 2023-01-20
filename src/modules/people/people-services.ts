import { People } from './people-model';

export const usePeopleServices = () => {
  const getPeople = async (): Promise<Array<People>> => {
    return fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data) => data.results);
  };

  return {
    getPeople,
  };
};
