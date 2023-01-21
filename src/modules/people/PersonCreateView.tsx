import React from 'react';
import { Box, Button, Input, Radio } from 'native-base';
import { KeyboardType } from 'react-native/types';
import { Controller } from 'react-hook-form';
import { usePeopleStore } from './people-store';
import { PERSON_INPUTS } from './people-constants';
import { usePersonForm } from './people-hooks';

export const PersonCreateView = () => {
  const { addPerson } = usePeopleStore();
  const { control, handleSubmit } = usePersonForm({
    defaultValues: {},
  });

  return (
    <Box>
      {PERSON_INPUTS.map(
        ({ id, label, placeholder, type, maxLength, options }) => (
          <Box key={id}>
            {type !== 'option' && (
              <Controller
                name={id as 'name' | 'height'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    keyboardType={type as KeyboardType}
                    onChange={onChange}
                  />
                )}
              />
            )}
            {type === 'option' && (
              <Controller
                name="gender"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Radio.Group value={value} name={label} onChange={onChange}>
                    {options?.map((value) => (
                      <Radio value={value} my="1">
                        {value}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
              />
            )}
          </Box>
        ),
      )}
      <Button onPress={handleSubmit(addPerson)}>Save</Button>
    </Box>
  );
};
