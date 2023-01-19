import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginView } from '../auth/LoginView';
import { PeopleView } from '../people/PeopleView';

const Stack = createNativeStackNavigator();

export const AppContainer = () => (
  // TODO: Put a statement to handle the views.
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginView} />
    <Stack.Screen name="People" component={PeopleView} />
  </Stack.Navigator>
);
