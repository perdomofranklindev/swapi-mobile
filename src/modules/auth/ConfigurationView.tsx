import React from 'react';
import { View, Button, Container, Center, Heading } from 'native-base';
import { useSessionStore } from './auth-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList } from '../navigation/navigation-types';
type ConfigurationProps = NativeStackScreenProps<
  BottomTabParamList,
  'Configuration'
>;
export const ConfigurationView: React.FC<ConfigurationProps> = ({
  navigation,
}) => {
  const { clearSession } = useSessionStore();

  return (
    <View flex={1} _light={{ bg: 'white' }} w="100%">
      <Center>
        <Container py={5} w="100%">
          <Button
            w="100%"
            color="red.400"
            onPress={() => {
              clearSession();
              navigation.popToTop();
            }}>
            Log out
          </Button>
        </Container>
      </Center>
    </View>
  );
};
