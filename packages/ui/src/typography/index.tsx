import styled from 'styled-components/native';
import { Theme, Typography } from '../theme';

interface TextProps {
  color?: keyof Theme['colors'];
  bold?: boolean;
  theme: Theme;
}

const BaseText = styled.Text<TextProps>`
  ${({ theme }) => theme.font.family ? `font-family: ${theme.font.family};` : ''}
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.text};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-size: ${({ theme }) => theme.font.baseSize}px;
`;

const get = (name: keyof Theme['typography'], theme: Theme): Typography => {
  const typography = theme.typography[name];
  return typography;
};

const createTypography = (name: keyof Theme['typography']) => {
  const Component = styled(BaseText)<TextProps>`
    font-size: ${({ theme }) => theme.font.baseSize * (get(name, theme).size || 1)}px;
    font-weight: ${({ bold, theme }) => (typeof bold !== 'undefined' ? 'bold' : get(name, theme).weight || 'normal')};
    ${({ theme }) => get(name, theme).upperCase ? 'text-transform: uppercase;' : ''}
  `;
  return Component;
};

const Jumbo = createTypography('Jumbo');
const Title2 = createTypography('Title2');
const Title1 = createTypography('Title1');
const Body1 = createTypography('Body1');
const Overline = createTypography('Overline');
const Caption = createTypography('Caption');
const Link = createTypography('Link');

const types: {[key in keyof Theme['typography']]: typeof BaseText} = {
  Jumbo,
  Title2,
  Title1,
  Body1,
  Overline,
  Caption,
  Link,
};

export type { TextProps };
export { types, Jumbo, Title2, Title1, Body1, Overline, Caption, Link };
