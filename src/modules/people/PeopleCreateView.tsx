import React from 'react';
import { useQuery } from 'react-query';
import { Box, View } from 'native-base';
import { usePeopleServices } from './people-services';

export const PeopleCreateView = () => {
  const { getPeople } = usePeopleServices();
  const { isLoading, data, error } = useQuery('People', getPeople);

  return <Box>Lorem ipsum dolor</Box>;
};
