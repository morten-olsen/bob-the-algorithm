import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Title1, Body1, Overline } from '#/ui/typography';
import { Cell, CellProps } from './cell';

type RowProps = CellProps & {
  background?: string;
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  title?: ReactNode;
  overline?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  opacity?: number;
  onPress?: () => any;
}

const Children = styled.View``;

const componentOrString = (
  input: ReactNode,
  Component: React.FC<{ children: ReactNode }>
) => {
  if (!input) {
    return null;
  }
  if (typeof input === 'string') {
    return <Component>{input}</Component>;
  }
  return input;
};

const Row: React.FC<RowProps> = ({
  background,
  top,
  left,
  right,
  title,
  opacity,
  overline,
  description,
  children,
  onPress,
  ...cellProps
}) => (
  <Cell {...cellProps} background={background} opacity={opacity} onPress={onPress}>
    {left}
    <Cell flex={1} direction="column" align="stretch">
      {!!top}
      {componentOrString(overline, Overline)}
      {componentOrString(title, Title1)}
      {componentOrString(description, Body1)}
      {!!children && <Children>{children}</Children>}
    </Cell>
    {right}
  </Cell>
);

export type { RowProps };
export { Row };
