import React from 'react';
import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Spacer,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import { usePeopleServices } from './people-services';
import { useQuery } from 'react-query';
import { PeopleStackParamList } from '../navigation/navigation-types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';

type PeopleProps = NativeStackScreenProps<PeopleStackParamList, 'People'>;

export const PeopleView: React.FC<PeopleProps> = ({ navigation }) => {
  const { getPeople } = usePeopleServices();
  const { isError, refetch, isLoading, data } = useQuery('People', getPeople);
  const theme = useTheme();

  return (
    <>
      <View
        flex={1}
        _light={{
          bg: 'white',
        }}>
        {isError && (
          <Box>
            <Text variant="">Problems with the connection</Text>
            <Button
              disabled={isLoading}
              onPress={() => {
                refetch();
              }}>
              Try again
            </Button>
          </Box>
        )}
        {isLoading && <ActivityIndicator color={theme.colors.primary[500]} />}
        {data?.length && (
          <FlatList
            ListHeaderComponent={() => (
              <Box>
                <Button
                  onPress={() => {
                    navigation.navigate('PersonCreate');
                  }}>
                  New person
                </Button>
                <Divider my={2} />
              </Box>
            )}
            data={data?.sort((a, b) => {
              return dayjs(b.created).unix() - dayjs(a.created).unix();
            })}
            keyExtractor={(item) => String(item.created)}
            paddingX={5}
            paddingTop={5}
            paddingBottom={50}
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
        )}
      </View>
    </>
  );
};
