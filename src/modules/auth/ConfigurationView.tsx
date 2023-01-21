import React from 'react';
import { View, Heading, Button } from 'native-base';
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
    <View>
      <Heading>Configuration</Heading>
      <Button
        color="red.400"
        onPress={() => {
          clearSession();
          navigation.popToTop();
        }}>
        Log out
      </Button>
    </View>
  );
};
