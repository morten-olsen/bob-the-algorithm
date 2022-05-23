import React, { ReactNode } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../../../theme';

type CellProps = {
  style?: StyleProp<ViewStyle>;
  accessibilityRole?: TouchableOpacity['props']['accessibilityRole'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  children?: ReactNode;
  onPress?: () => any;
  background?: string;
}

const Wrapper = styled.View<{
  background?: string;
  theme: Theme;
}>`
  padding: ${({ theme }) => theme.margins.medium / 2}px;
  align-items: center;
  justify-content: center;
  ${({ background }) => (background ? `background: ${background};` : '')}
`;

const Touch = styled.TouchableOpacity`
`;

const Cell: React.FC<CellProps> = ({ children, onPress, ...props}) => {
  const {
    accessibilityLabel,
    accessibilityRole,
    accessibilityHint,
    ...others
  } = props;
  const node = (
    <Wrapper {...others}>
      {children}
    </Wrapper>
  );
  if (onPress) {
    return (
      <Touch
        accessible
        accessibilityRole={accessibilityRole || 'button'}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        onPress={onPress}
      >
        {node}
      </Touch>
    );
  }
  return node;
};

export type { CellProps };
export { Cell };
