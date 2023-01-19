import React from 'react';
import { View, Text } from 'react-native';
import ToastRN, { ToastConfig } from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  alert: ({ text1 }) => (
    <View>
      <Text>{text1}</Text>
    </View>
  ),
};

export const Toast: React.FC = () => (
  <ToastRN position="bottom" bottomOffset={100} />
);
