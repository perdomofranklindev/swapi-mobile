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
    <View flex={1} _light={{ bg: 'white' }} w="100%" p={5}>
      <Center>
        <Button
          w="100%"
          color="red.400"
          onPress={() => {
            clearSession();
            navigation.popToTop();
          }}>
          Log out
        </Button>
      </Center>
    </View>
  );
};
