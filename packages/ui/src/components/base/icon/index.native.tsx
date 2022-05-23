import React from 'react';
import { Feather, } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Theme } from '../../../theme';

type IconNames = keyof typeof Feather.glyphMap;
type Props = {
  size?: number;
  color?: keyof Theme['colors'];
  name: IconNames;
}

function Icon({
  size,
  color,
  name,
}: Props) {
  const theme = useTheme();
  return (
    <Feather
      name={name}
      color={color ? theme.colors[color] : theme.colors.icon}
      size={size ?? theme.sizes.icons}
    />
  ) 
};

export type { IconNames };
export { Icon };
