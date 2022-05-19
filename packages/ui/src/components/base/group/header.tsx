import React, { ReactNode } from 'react';
import { Icon } from '../icon';
import { Row, Cell } from '../row';

interface Props {
  title: string;
  add?: () => void;
  onPress?: () => void;
  left?: ReactNode;
}

function Header({ title, add, onPress, left }: Props) {
  return (
    <Row
      onPress={onPress}
      left={left}
      title={title}
      right={
        add && (
          <Cell onPress={add}>
            <Icon name="plus-circle" size={18} />
          </Cell>
        )
      }
    />
  );
}

export { Header };
