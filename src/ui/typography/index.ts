import styled from 'styled-components/native';
import { Theme } from 'theme';

interface TextProps {
  color?: keyof Theme['colors'];
  bold?: boolean;
  theme: Theme;
}

const BaseText = styled.Text<TextProps>`
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.text};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-size: ${({ theme }) => theme.font.baseSize}px;
`;

const Jumbo = styled(BaseText)`
  font-size: ${({ theme }) => theme.font.baseSize * 2.8}px;
  font-weight: bold;
`;

const Title2 = styled(BaseText)`
  font-size: ${({ theme }) => theme.font.baseSize * 1.3}px;
  font-weight: bold;
`;

const Title1 = styled(BaseText)`
  font-weight: bold;
`;

const Body1 = styled(BaseText)``;

const Overline = styled(BaseText)`
  font-size: ${({ theme }) => theme.font.baseSize * 0.6}px;
  text-transform: uppercase;
`;

const Caption = styled(BaseText)`
  font-size: ${({ theme }) => theme.font.baseSize * 0.8}px;
`;

const Link = styled(BaseText)`
  text-transform: uppercase;
`;

export type { TextProps };
export { Jumbo, Title2, Title1, Body1, Overline, Caption, Link };
