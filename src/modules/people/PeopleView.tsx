import React from 'react';
import { Text, View } from 'native-base';
import { usePeopleServices } from './people-services';
import { useQuery } from 'react-query';

export const PeopleView = () => {
  const { getPeople } = usePeopleServices();
  const { isLoading, data, error } = useQuery('People', getPeople);
  
  return (
    <View>
      <Text>People View</Text>
    </View>
  );
};
