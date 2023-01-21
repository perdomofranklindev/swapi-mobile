import React from 'react';
import { ScrollView, Center, Container, FormControl, Box } from 'native-base';

type Props = {
  children: React.ReactNode | undefined;
};

export const LoginContainer: React.FC<Props> = ({ children }) => (
  <ScrollView
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    style={{
      width: '100%',
    }}>
    <Center>
      <Container>
        <FormControl>{children}</FormControl>
      </Container>
    </Center>
  </ScrollView>
);
