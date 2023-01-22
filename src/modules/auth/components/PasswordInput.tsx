import React from 'react';
import { Input, Box, Button } from 'native-base';
import { IInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';

export const PasswordInput: React.FC<IInputProps> = (props) => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <Input
      type={show ? 'text' : 'password'}
      InputRightElement={
        <Button size="xs" rounded="none" w="1/6" h="full" onPress={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      }
      placeholder="Password"
      {...props}
    />
  );
};
