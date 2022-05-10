import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Title1, Body1, Overline } from '#/ui/typography';
import { Cell, CellProps } from './cell';

type RowProps = CellProps & {
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  title?: ReactNode;
  overline?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
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
  top,
  left,
  right,
  title,
  overline,
  description,
  children,
  ...cellProps
}) => (
  <Cell {...cellProps}>
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
