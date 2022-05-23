import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Title2, Body1, Overline } from '../../../typography';
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

const Children = styled.View`
  width: 100%;
`;

const RowCell = styled(Cell)`
  flex-direction: row;
  width: 100%;
`;

const ContentCell = styled(Cell)`
  align-items: flex-start;
  flex: 1;
`;

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

const Row = ({
  top,
  left,
  right,
  title,
  overline,
  description,
  children,
  ...cellProps
}: RowProps) => (
  <RowCell {...cellProps}>
    {left}
    <ContentCell>
      {!!top}
      {componentOrString(overline, Overline)}
      {componentOrString(title, Title2)}
      {componentOrString(description, Body1)}
      {!!children && <Children>{children}</Children>}
    </ContentCell>
    {right}
  </RowCell>
);

export type { RowProps };
export { Row };
