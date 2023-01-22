import React from 'react';
import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { LoginFormType, LOGIN_FORM_VALIDATOR_SCHEMA } from './auth-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSubscribeError } from '../../shared/hooks';
import Toast from 'react-native-toast-message';

/**
 * @description - Hook for login form.
 * @param {UseFormProps} formOptions - Options.
 * @returns {UseFormReturn<LoginFormType>} - Hook.
 */
export function useLoginForm(
  formOptions?: UseFormProps,
): UseFormReturn<LoginFormType> {
  const data = useForm<LoginFormType>({
    ...(formOptions as FieldValues),
    resolver: yupResolver(LOGIN_FORM_VALIDATOR_SCHEMA, {}),
  });

  useSubscribeError(data, () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid data.',
    });
  });

  return data;
}
