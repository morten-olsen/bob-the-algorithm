import { create } from '@storybook/theming';

const theme = create({
  base: 'light',

  colorPrimary: '#156E80',
  colorSecondary: '#156E80',

  // UI
  appBg: 'white',
  appContentBg: '#F7F9FA',
  appBorderColor: '#D4DBDE',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Rubik", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#003143',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#609CA9',
  barSelectedColor: '#156E80',
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: '#156E80',
  inputTextColor: '#003143',
  inputBorderRadius: 4,

  brandTitle: 'Morten\'s App Design System',
  //brandImage: 'https://zn-prod-euw1-cdn.s3.eu-west-1.amazonaws.com/logo-dark-gradient.png',
});

export { theme };
