import React from 'react';
import { useTheme, View } from 'native-base';
import { WaveIndicator } from 'react-native-indicators';

export const LoadingOverlap = () => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <WaveIndicator size={100} color={theme.colors.secondary[500]} />
    </View>
  );
};
