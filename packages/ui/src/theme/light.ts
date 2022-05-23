import { Platform } from 'react-native';
import { Theme } from './theme';

const light: Theme = {
  typography: {
    Jumbo: {
      weight: 'bold',
      size: 2.8,
    }, 
    Title1: {
      weight: 'bold',
    }, 
    Title2: {
      weight: 'bold',
      size: 1.3,
    }, 
    Body1: {},
    Overline: {
      size: 0.8,
      upperCase: true,
    },
    Caption: {
      size: 0.8,
    },
    Link: {
      upperCase: true,
      weight: 'bold',
    }
  },
  colors: {
    primary: '#156e80',
    icon: '#156e80',
    destructive: '#e74c3c',
    shade: '#ededed',
    input: '#ddd',
    secondary: '#ff9f43',
    shadow: '#000',
    background: '#fff',
    text: '#000',
    textShade: '#999',
  },
  sizes: {
    corners: 5,
    icons: 24,
  },
  margins: {
    small: 8,
    medium: 16,
    large: 24,
  },
  font: {
    family: Platform.OS === 'web' ? 'Montserrat' : undefined,
    baseSize: Platform.OS === 'web' ? 12 : 11,
  },
};

export { light };
