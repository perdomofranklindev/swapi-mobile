import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginView } from '../auth/LoginView';
import { PeopleView } from '../people/PeopleView';
import { PeopleCreateView } from '../people/PeopleCreateView';
import { useSessionStore } from '../auth/auth-store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ConfigurationView } from '../auth/ConfigurationView';
import { LoadingOverlap } from '../../shared/components/LoadingOverlap';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="People"
        component={PeopleView}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Configuration"
        component={ConfigurationView}
        options={{ title: 'Configuration' }}
      />
    </Tab.Navigator>
  );
};

export const AppContainer = () => {
  // Hydrated is a flag to wait until the storage memory is read.
  const { session, _hasHydrated } = useSessionStore();

  return (
    <Stack.Navigator initialRouteName="Login">
      {
        // Loading
      }
      {!_hasHydrated && (
        <Stack.Screen
          name="Loading"
          component={LoadingOverlap}
          options={{
            headerShown: false,
          }}
        />
      )}

      {
        // Login
      }
      {!session && _hasHydrated && (
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{
            headerShown: false,
            animationTypeForReplace: session ? 'pop' : 'push',
          }}
        />
      )}

      {
        // Home
      }
      {session && _hasHydrated && (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PeopleCreate" component={PeopleCreateView} />
        </>
      )}
    </Stack.Navigator>
  );
};
