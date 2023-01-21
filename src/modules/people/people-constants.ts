import { PersonInput } from "./people-types";

export const PERSON_INPUTS: Array<PersonInput> = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Insert the character name',
    type: 'text',
    maxLength: 20,
  },
  {
    id: 'height',
    label: 'Height',
    placeholder: 'The character height',
    type: "numeric",
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'option',
    options: ['male', 'female', 'n/a'],
  },
];
