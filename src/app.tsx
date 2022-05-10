import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { Setup } from './features/setup';
import { Router } from './ui/router';
import { ThemeProvider } from 'styled-components/native';
import { light } from './ui';

const App: React.FC = () => {
  const getTransit = useCallback(
    async (from: any, to: any) => ({
      to,
      from,
      time: 45 * 60 * 1000,
      usableTime: 0,
    }),
    [],
  )
  return (
    <SafeAreaProvider>
      <StatusBar />
      <ThemeProvider theme={light}>
        <Setup getTransit={getTransit}>
          <Router />
        </Setup>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export { App };
