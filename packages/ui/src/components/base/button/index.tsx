import React from 'react';
import styled from 'styled-components/native';
import { IconNames, Icon } from '../icon';
import { Theme } from '../../../theme';
import { Link } from '../../../typography';
import { StyleProp, ViewStyle } from 'react-native';

type AccessibilityRole = 'button' | 'link' | 'image' | 'keyboardkey' | 'search' | 'text' | 'adjustable' | 'header' | 'imagebutton';

type ButtonProps = {
  title?: string;
  icon?: IconNames;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  type?: 'primary' | 'secondary' | 'destructive';
}

const Touch = styled.TouchableOpacity``;

const Wrapper = styled.View<{
  style?: StyleProp<ViewStyle>;
  background?: keyof Theme['colors'],
  border: keyof Theme['colors'],
  theme: Theme,
}>`
  background: ${({ background, theme }) => background ? theme.colors[background] : 'transparent'};
  border-color: ${({ border, theme }) => theme.colors[border]};
  border-width: 1px;
  padding: 
    ${({ theme }) => theme.margins.medium}px;
    ${({ theme }) => theme.margins.small}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  align-items: center;
`;

const getColors = (type: ButtonProps['type']): [keyof Theme['colors'], keyof Theme['colors'], keyof Theme['colors']] => {
  switch (type) {
    case 'primary': {
      return ['background', 'primary', 'primary'];
    }
    case 'secondary': {
      return ['primary', 'background', 'primary'];
    }
    case 'destructive': {
      return ['background', 'destructive', 'destructive'];
    }
  }
  throw new Error('Button type not supported');
};

const Button = ({
  title,
  icon,
  type = 'primary',
  onPress,
  accessibilityHint,
  accessibilityRole,
  accessibilityLabel,
  style,
}: ButtonProps) => {
  const [textColor, backgroundColor, borderColor] = getColors(type);
  return (
    <Touch
      onPress={onPress}
      accessible
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      <Wrapper style={style} background={backgroundColor} border={borderColor}>
        {title && <Link color={textColor}>{title}</Link>}
        {icon && <Icon name={icon} color={textColor} />}
      </Wrapper>
    </Touch>
  );
};

export type { ButtonProps, AccessibilityRole };
export { Button };
