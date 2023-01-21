import React from 'react';
import {
  Center,
  Button,
  Input,
  Radio,
  Container,
  Box,
  VStack,
  Divider,
} from 'native-base';
import { KeyboardType } from 'react-native/types';
import { Controller } from 'react-hook-form';
import { usePeopleStore } from './people-store';
import { PERSON_INPUTS } from './people-constants';
import { usePersonForm } from './people-hooks';
import { capitalCase } from 'change-case';
import { PersonFormType } from './people-types';
import Toast from 'react-native-toast-message';

export const PersonCreateView = () => {
  const { addPerson } = usePeopleStore();
  const { reset, control, handleSubmit } = usePersonForm({
    defaultValues: {},
  });

  const onSubmit = (data: PersonFormType) => {
    addPerson(data);
    reset({});
    Toast.show({
      type: 'success',
      text1: 'Person created successful',
    });
  };

  return (
    <Center>
      <Container>
        <Box w="100%">
          <VStack space={2.5} w="100%">
            {PERSON_INPUTS.map(
              ({ id, label, placeholder, type, maxLength, options }) => (
                <Box key={id} w="100%">
                  {type !== 'option' && (
                    <Controller
                      name={id as 'name' | 'height'}
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          id={id}
                          value={value}
                          placeholder={placeholder}
                          maxLength={maxLength || undefined}
                          keyboardType={type as KeyboardType}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          w="100%"
                        />
                      )}
                    />
                  )}
                  {type === 'option' && (
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Radio.Group
                          id={id}
                          value={value}
                          name={label}
                          onChange={onChange}
                          w="100%">
                          {options?.map((value) => (
                            <Radio value={value} my="1">
                              {capitalCase(value)}
                            </Radio>
                          ))}
                        </Radio.Group>
                      )}
                    />
                  )}
                </Box>
              ),
            )}
          </VStack>
          <Divider my={2} />
          <Button onPress={handleSubmit(onSubmit)}>Save</Button>
        </Box>
      </Container>
    </Center>
  );
};
