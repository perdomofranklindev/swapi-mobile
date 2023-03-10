import * as yup from 'yup';

export const PERSON_FORM_VALIDATOR_SCHEMA = yup
  .object({
    name: yup.string().required('This field is required'),
    height: yup.string().required('This field is required'),
    gender: yup.string().required('This field is required'),
    created: yup.date().default(new Date()).notRequired(),
  })
  .required();

export type PersonFormType =
  (typeof PERSON_FORM_VALIDATOR_SCHEMA)['__outputType'];

export interface Person {
  name?: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: string;
  films?: string[];
  species?: any[];
  vehicles?: string[];
  starships?: string[];
  created?: Date;
  edited?: Date;
  url?: string;
}

export interface PersonInput {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  maxLength?: number;
  options?: string[];
}
