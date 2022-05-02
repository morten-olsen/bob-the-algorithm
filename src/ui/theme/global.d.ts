import {} from 'styled-components';
import Theme from './Theme'; // Import type from above file
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // extends the global DefaultTheme with our ThemeType.
}
