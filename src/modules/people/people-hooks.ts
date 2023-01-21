import React from 'react';
import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { PersonFormType, PERSON_FORM_VALIDATOR_SCHEMA } from './people-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSubscribeError } from '../../shared/hooks';
import Toast from 'react-native-toast-message';

/**
 * @description - Hook for person form.
 * @param {UseFormProps} formOptions - Options.
 * @returns {UseFormReturn<PersonFormType>} - Hooks.
 */
export function usePersonForm(
  formOptions?: UseFormProps,
): UseFormReturn<PersonFormType> {
  const data = useForm<PersonFormType>({
    ...(formOptions as FieldValues),
    resolver: yupResolver(PERSON_FORM_VALIDATOR_SCHEMA, {}),
  });

  useSubscribeError(data, () => {
    Toast.show({
      type: 'alert',
      text1: 'Invalid data.',
    });
  });

  return data;
}
