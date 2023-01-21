import React from 'react';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Spacer,
  Text,
  View,
  VStack,
} from 'native-base';
import { usePeopleServices } from './people-services';
import { useQuery } from 'react-query';
import { PeopleStackParamList } from '../navigation/navigation-types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';

type PeopleProps = NativeStackScreenProps<PeopleStackParamList, 'People'>;

export const PeopleView: React.FC<PeopleProps> = ({ navigation }) => {
  const { getPeople } = usePeopleServices();
  const { isError, refetch, isLoading, data } = useQuery('People', getPeople);

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <Box>
            <Button
              onPress={() => {
                navigation.navigate('PersonCreate');
              }}>
              Add a new person
            </Button>
          </Box>
        )}
        data={data?.sort((a, b) => {
          return dayjs(b.created).unix() - dayjs(a.created).unix();
        })}
        keyExtractor={(item) => String(item.created)}
        paddingX={5}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'coolGray.600',
            }}
            pl={['0', '4']}
            pr={['0', '5']}
            py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {item.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item.gender}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {dayjs(item.created).format('MMMM D, YYYY h:mm A')}
              </Text>
            </HStack>
          </Box>
        )}
      />
    </View>
  );
};
