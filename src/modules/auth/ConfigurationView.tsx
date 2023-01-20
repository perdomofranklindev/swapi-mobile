import { useNavigation } from '@react-navigation/native';
import { View, Heading, Button } from 'native-base';
import React from 'react';
import { useSessionStore } from './auth-store';

export const ConfigurationView = () => {
  const { clearSession } = useSessionStore();
  const nav = useNavigation();

  return (
    <View>
      <Heading>Configuration</Heading>
      <Button
        color="red.400"
        onPress={() => {
          clearSession();
          nav.navigate(
            'Login' as never,
            {
              screen: 'Login',
            } as never,
          );
        }}>
        Log out
      </Button>
    </View>
  );
};
