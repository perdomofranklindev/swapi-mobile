import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { AppContainer } from './src/modules/navigation/AppContainer';
import { Toast } from './src/shared/components/Toast';
import { theme } from './src/shared/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const App = () => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <AppContainer />
        <Toast />
      </NativeBaseProvider>
    </QueryClientProvider>
  </NavigationContainer>
);
