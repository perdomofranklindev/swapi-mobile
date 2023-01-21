import React from 'react';
import { LoginContainer } from './components/LoginContainer';
import {
  Button,
  Input,
  VStack,
  Heading,
  Divider,
  Text,
  FormControl,
  Box,
} from 'native-base';
import { useLoginForm } from './auth-hooks';
import { Controller } from 'react-hook-form';
import { LoginFormType } from './auth-types';
import { useMutation } from 'react-query';
import { useAuthServices } from './auth-services';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation-types';
import Toast from 'react-native-toast-message';
import Logo from '../../shared/assets/logo.svg';
import packageJson from '../../../package.json';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginView: React.FC<LoginProps> = ({ navigation }) => {
  const { control, handleSubmit } = useLoginForm({
    defaultValues: {},
  });

  // Services.
  const { login } = useAuthServices();
  const { isLoading, mutateAsync } = useMutation(login);

  /**
   * @description - Login form submit handler.
   * @param {LoginFormType} data - Login form data.
   * @return {Promise<void>} - Nothing.
   */
  const onSubmit = async (data: LoginFormType): Promise<void> => {
    try {
      await mutateAsync(data);
      Toast.show({
        type: 'success',
        text1: 'Logged!',
      });

      // Redirect to home.
      navigation.navigate('Main');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid credentials',
      });
    }
  };

  return (
    <LoginContainer>
      <Box w="100%">
        <Heading
          style={{
            textAlign: 'center',
          }}>
          <Logo width={150} height={150} />
        </Heading>
        <VStack space={2.5} w="100%">
          <Box w="100%">
            <FormControl.Label>Username / Email</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Username / Email"
                  keyboardType="email-address"
                  w="100%"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isDisabled={isLoading}
                />
              )}
            />
          </Box>

          <Box w="100%">
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
                  type="password"
                  w="100%"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isDisabled={isLoading}
                />
              )}
            />
          </Box>
        </VStack>
        <Divider my={2} />
        <Button
          colorScheme="primary"
          isLoading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}>
          Log In
        </Button>
        <Text my={10} textAlign="center">{`v${packageJson.version}`}</Text>
      </Box>
    </LoginContainer>
  );
};
