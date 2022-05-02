import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { IconNames, Icon } from '#/ui/components';
import { Theme } from '#/ui/theme';
import { Link } from '#/ui/typography';

interface Props {
  title?: string;
  icon?: IconNames;
  onPress?: () => any;
  accessibilityRole?: TouchableOpacity['props']['accessibilityRole'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  type?: 'primary' | 'secondary' | 'destructive';
}

const Touch = styled.TouchableOpacity``;

const Wrapper = styled.View<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.margins.small}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  align-items: center;
`;

const Button: React.FC<Props> = ({
  title,
  icon,
  type,
  onPress,
  accessibilityHint,
  accessibilityRole,
  accessibilityLabel,
}) => (
  <Touch
    onPress={onPress}
    accessible
    accessibilityHint={accessibilityHint}
    accessibilityRole={accessibilityRole}
    accessibilityLabel={accessibilityLabel}
  >
    <Wrapper>
      {title && <Link color={type}>{title}</Link>}
      {icon && <Icon name={icon} color={type} />}
    </Wrapper>
  </Touch>
);

export { Button };
