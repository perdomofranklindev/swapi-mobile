import React from 'react';
import { Avatar, HStack, Text, useTheme } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginView } from '../auth/LoginView';
import { useSessionStore } from '../auth/auth-store';
import { ConfigurationView } from '../auth/ConfigurationView';
import { LoadingOverlap } from '../../shared/components/LoadingOverlap';
import { PeopleView } from '../people/PeopleView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersonCreateView } from '../people/PersonCreateView';
import {
  BottomTabParamList,
  PeopleStackParamList,
  RootStackParamList,
} from './navigation-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const TabNavigator = createBottomTabNavigator<BottomTabParamList>();
const PeopleStack = createNativeStackNavigator<PeopleStackParamList>();

const headerStyles = {
  headerStyle: {
    backgroundColor: '#253681',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => {
    const { name } = useSessionStore();
    return (
      <HStack space={3} justifyContent="center" alignItems="center">
        <Text fontWeight="bold" color="white">
          {name}
        </Text>
        <Avatar
          size="sm"
          bg="indigo.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          {name}
          <Avatar.Badge bg="green.500" />
        </Avatar>
      </HStack>
    );
  },
};

const Tab = () => {
  const theme = useTheme();
  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <TabNavigator.Screen
        name="Home"
        component={People}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="home" size={20} />,
        }}
      />
      <TabNavigator.Screen
        name="Configuration"
        component={ConfigurationView}
        options={{
          ...(headerStyles as any),
          tabBarIcon: () => <Ionicons name="settings" size={20} />,
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        }}
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
        ...(headerStyles as any),
        title: 'Home',
      }}
    />
    <PeopleStack.Group
      screenOptions={{
        presentation: 'modal',
      }}>
      <PeopleStack.Screen
        name="PersonCreate"
        component={PersonCreateView}
        options={{
          ...(headerStyles as any),
          title: 'Create',
        }}
      />
    </PeopleStack.Group>
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
      {session && _hasHydrated && (
        <Stack.Screen
          name="Main"
          component={Tab}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};
