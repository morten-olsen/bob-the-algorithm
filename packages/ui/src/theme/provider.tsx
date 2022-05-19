import { ThemeProvider } from 'styled-components/native';
import { light } from './light';

type Props = {
  children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={light}>
      {children}
    </ThemeProvider>
  );
};

export { Provider };
