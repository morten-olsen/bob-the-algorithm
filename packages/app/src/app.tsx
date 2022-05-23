import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { Setup } from './features/setup';
import { Router } from './ui/router';
import { Provider } from '@morten-olsen/ui';

const App: React.FC = () => {
  const getTransit = useCallback(
    async (from: any, to: any) => ({
      to,
      from,
      time: 45,
      usableTime: 0,
    }),
    [],
  )
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Provider>
        <Setup getTransit={getTransit}>
          <Router />
        </Setup>
      </Provider>
    </SafeAreaProvider>
  );
};

export { App };
