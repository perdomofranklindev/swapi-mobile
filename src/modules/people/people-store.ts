import { create } from 'zustand';
import { Person } from './people-types';

interface PeopleState {
  people: Array<Person>;
  updateAllPeople: (people: Array<Person>) => void;
  addPerson: (person: Person) => void;
  removePerson: (index: number) => void;
}

export const usePeopleStore = create<PeopleState>((set) => ({
  people: [],
  updateAllPeople: (people) => {
    set({ people });
  },
  addPerson: (person) => {
    set((state) => {
      const values = state.people;
      values.push(person);
      return { people: values };
    });
  },
  removePerson: (index) => {
    set((state) => {
      const values = state.people || [];
      values.splice(index, 1);
      return { people: values };
    });
  },
}));
