import React from 'react';
import {
  Center,
  Button,
  Input,
  Radio,
  Box,
  VStack,
  Divider,
  View,
  FormControl,
  Stack,
} from 'native-base';
import { Controller } from 'react-hook-form';
import { usePeopleStore } from './people-store';
import { PERSON_INPUTS } from './people-constants';
import { usePersonForm } from './people-hooks';
import { capitalCase } from 'change-case';
import { PersonFormType } from './people-types';
import { PeopleStackParamList } from '../navigation/navigation-types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

type PersonCreateProps = NativeStackScreenProps<
  PeopleStackParamList,
  'PersonCreate'
>;

export const PersonCreateView: React.FC<PersonCreateProps> = ({}) => {
  const { addPerson } = usePeopleStore();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = usePersonForm({
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
    <View flex={1} _light={{ bg: 'white' }} w="100%" p={5}>
      <Center>
        <Box w="100%">
          <VStack space={2.5} w="100%">
            {PERSON_INPUTS.map(
              ({ id, label, placeholder, type, maxLength, options }) => (
                <Box key={id} w="100%">
                  {type !== 'option' && (
                    <FormControl isInvalid={Boolean(errors)} w="100%">
                      <Controller
                        name={id as 'name' | 'height'}
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControl
                            isInvalid={Boolean(
                              errors[id === 'name' ? 'name' : 'height'],
                            )}
                            w="100%">
                            <FormControl.Label>
                              {capitalCase(label)}
                            </FormControl.Label>
                            <Input
                              id={id}
                              value={value}
                              placeholder={placeholder}
                              maxLength={maxLength || undefined}
                              type="text"
                              keyboardType={
                                type === 'number' ? 'numeric' : 'default'
                              }
                              onChangeText={onChange}
                              onBlur={onBlur}
                              w="100%"
                            />
                            {errors[id === 'name' ? 'name' : 'height'] &&
                              errors[id === 'name' ? 'name' : 'height']
                                ?.message && (
                                <FormControl.ErrorMessage>
                                  {
                                    errors[id === 'name' ? 'name' : 'height']
                                      ?.message
                                  }
                                </FormControl.ErrorMessage>
                              )}
                          </FormControl>
                        )}
                      />
                    </FormControl>
                  )}
                  {type === 'option' && (
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <FormControl.Label>Gender</FormControl.Label>
                          <Radio.Group
                            id={id}
                            value={value}
                            name={label}
                            onChange={onChange}
                            w="100%">
                            <Stack
                              direction={{
                                base: 'row',
                              }}
                              alignItems={{
                                base: 'flex-start',
                                md: 'center',
                              }}
                              space={5}
                              w="100%"
                              maxW="100%">
                              {options?.map((value) => (
                                <Radio key={value} value={value} my="1">
                                  {value === 'n/a'
                                    ? value.toUpperCase()
                                    : capitalCase(value)}
                                </Radio>
                              ))}
                            </Stack>
                          </Radio.Group>
                        </>
                      )}
                    />
                  )}
                </Box>
              ),
            )}
          </VStack>
          <Divider my={2} />
          <Button onPress={handleSubmit(onSubmit)}>Create</Button>
        </Box>
      </Center>
    </View>
  );
};
