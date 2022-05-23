import { theme } from './theme';
import { addDecorator } from "@storybook/react";
import { Provider } from '../src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "@fontsource/montserrat";

const ThemeDecorator = (storyFn: any) => (
  <SafeAreaProvider>
    <Provider>{storyFn()}</Provider>
  </SafeAreaProvider>
)

addDecorator(ThemeDecorator);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (b: any, a: any) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  docs: {
    theme,
  },
};

