import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '#/ui/theme';

type CellProps = {
  accessibilityRole?: TouchableOpacity['props']['accessibilityRole'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  children?: ReactNode;
  onPress?: () => any;
  background?: string;
  flex?: string | number;
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  opacity?: number;
}

const Wrapper = styled.View<{
  background?: string;
  flex?: string | number;
  direction?: 'row' | 'column';
  theme: Theme;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  opacity?: number;
}>`
  padding: ${({ theme }) => theme.margins.medium / 2}px;
  ${({ background }) => (background ? `background: ${background};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  align-items: ${({ align }) => (align ? align : 'center')};
  ${({ opacity }) => (opacity? `opacity: ${opacity};` : '')}
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
