import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCallback, useMemo, useState } from 'react';
import { Setup } from './features/setup';
import { Router } from './ui/router';
import { ThemeProvider } from 'styled-components/native';
import { light } from './ui';
import { set } from 'date-fns';

const App: React.FC = () => {
  const [day, setDate] = useState(() => set(new Date, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }));
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
        <Setup getTransit={getTransit} day={day} setDate={setDate}>
          <Router />
        </Setup>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export { App };
