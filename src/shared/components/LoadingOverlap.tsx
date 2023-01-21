import React from 'react';
import { View } from 'native-base';
import { ActivityIndicator } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';

export const LoadingOverlap = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <WaveIndicator size={100} color="red" />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
