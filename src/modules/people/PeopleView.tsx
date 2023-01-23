import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Spacer,
  useTheme,
  View,
  VStack,
  Stack,
  FlatList,
  Text,
} from 'native-base';
import { usePeopleServices } from './people-services';
import { useQuery } from 'react-query';
import { PeopleStackParamList } from '../navigation/navigation-types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import { usePeopleStore } from './people-store';

type PeopleProps = NativeStackScreenProps<PeopleStackParamList, 'People'>;

export const PeopleView: React.FC<PeopleProps> = ({ navigation }) => {
  const { getPeople } = usePeopleServices();
  const { people, removePerson } = usePeopleStore();
  const { isError, refetch, isLoading } = useQuery('People', getPeople);
  const theme = useTheme();

  const [search, setSearch] = useState('');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
      }}>
      {isError && (
        <Box>
          <Text>Problems with the connection</Text>
          <Button
            disabled={isLoading}
            onPress={() => {
              refetch();
            }}>
            Try again
          </Button>
        </Box>
      )}
      {isLoading && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={theme.colors.primary[500]} />
        </View>
      )}
      {people.length ? (
        <>
          <Box paddingX={5} paddingTop={5}>
            <Stack
              w="100%"
              maxW="100%"
              direction={{
                base: 'row',
              }}
              alignItems={{
                base: 'center',
              }}
              space={0}>
              <Box w="74%">
                <Input
                  onChangeText={(text) => setSearch(text)}
                  height={10}
                  placeholder="Search"
                  w="100%"
                  size="sx"
                />
              </Box>
              <Box w="auto" pl={2}>
                <Button
                  size="lg"
                  color="secondary.900"
                  onPress={() => {
                    navigation.navigate('PersonCreate');
                  }}>
                  <Ionicons name="search" color="white" />
                </Button>
              </Box>
              <Box w="auto" pl={2}>
                <Button
                  size="lg"
                  variant="subtle"
                  bg="secondary.100"
                  onPress={() => {
                    navigation.navigate('PersonCreate');
                  }}>
                  <Ionicons name="add" color="red" />
                </Button>
              </Box>
            </Stack>
            <Divider my={2} />
          </Box>
          <FlatList
            data={people
              ?.sort((a, b) => {
                return dayjs(b.created).unix() - dayjs(a.created).unix();
              })
              .filter((a) => (search ? a.name?.includes(search) : true))}
            paddingX={5}
            keyExtractor={(item) => String(item.created)}
            renderItem={({ item, index }) => (
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
                      {String(item.name)}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {String(item.gender)}
                    </Text>
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start">
                      {dayjs(item.created).format('MMMM D, YYYY h:mm A')}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <Button
                      size="xs"
                      variant="subtle"
                      bg="primary.900"
                      onPress={() => {
                        removePerson(index);
                      }}>
                      <Ionicons name="trash" color="white" />
                    </Button>
                  </Box>
                </HStack>
              </Box>
            )}
            ListFooterComponent={() => (
              <Box paddingBottom={10}></Box>
            )}></FlatList>
        </>
      ) : null}
    </SafeAreaView>
  );
};
