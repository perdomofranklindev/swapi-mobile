import * as yup from 'yup';

export const LOGIN_FORM_VALIDATOR_SCHEMA = yup
  .object({
    email: yup.string(),
    password: yup.string(),
  })
  .required();

export type LoginFormType =
  (typeof LOGIN_FORM_VALIDATOR_SCHEMA)['__outputType'];

export interface User extends LoginFormType {
  username?: string;
};
