import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginView } from '../auth/LoginView';
import { useSessionStore } from '../auth/auth-store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ConfigurationView } from '../auth/ConfigurationView';
import { LoadingOverlap } from '../../shared/components/LoadingOverlap';
import { PeopleView } from '../people/PeopleView';
import { PersonCreateView } from '../people/PersonCreateView';
import {
  BottomTabParamList,
  PeopleStackParamList,
  RootStackParamList,
} from './navigation-types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const TabNavigator = createMaterialBottomTabNavigator<BottomTabParamList>();
const PeopleStack = createNativeStackNavigator<PeopleStackParamList>();

const Tab = () => {
  return (
    <TabNavigator.Navigator initialRouteName="Home">
      <TabNavigator.Screen
        name="Home"
        component={People}
        options={{ title: 'Home' }}
      />
      <TabNavigator.Screen
        name="Configuration"
        component={ConfigurationView}
        options={{ title: 'Configuration' }}
      />
    </TabNavigator.Navigator>
  );
};

const People = () => (
  <PeopleStack.Navigator initialRouteName="People">
    <PeopleStack.Screen
      name="People"
      component={PeopleView}
      options={{
        headerShown: false,
      }}
    />
    <PeopleStack.Screen name="PersonCreate" component={PersonCreateView} />
  </PeopleStack.Navigator>
);

export const AppContainer = () => {
  // Hydrated is a flag to wait until the storage memory is already read.
  const { session, _hasHydrated } = useSessionStore();

  return (
    <Stack.Navigator initialRouteName="Login">
      {!_hasHydrated && (
        <Stack.Screen
          name="Loading"
          component={LoadingOverlap}
          options={{
            headerShown: false,
          }}
        />
      )}
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
      {session && _hasHydrated && <Stack.Screen name="Main" component={Tab} />}
    </Stack.Navigator>
  );
};
