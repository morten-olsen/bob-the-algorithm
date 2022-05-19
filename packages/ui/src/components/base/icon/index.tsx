import React from 'react';
import { icons } from 'feather-icons';
import { useTheme } from 'styled-components/native';
import { Theme } from '../../../theme';

type IconNames = keyof typeof icons;
type Props = {
  size?: number;
  color?: keyof Theme['colors'];
  name: IconNames;
}

function Icon({
  size = 24,
  color,
  name,
}: Props) {
  const theme = useTheme();
  return (
    <svg
      dangerouslySetInnerHTML={{ __html: icons[name].toSvg({ color: color ? theme.colors[color] : undefined }) }}
      viewBox={`0 0 24 24`}
      width={size}
      height={size}
      fill={color ? theme.colors[color] : undefined}
    />
  ) 
};

export type { IconNames };
export { Icon };
