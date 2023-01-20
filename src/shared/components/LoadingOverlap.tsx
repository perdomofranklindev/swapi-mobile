import { View } from 'native-base';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export const LoadingOverlap = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
