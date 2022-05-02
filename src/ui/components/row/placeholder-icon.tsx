import React from 'react';
import styled from 'styled-components/native';
import { Cell } from './cell';

interface Props {
  color?: string;
  size?: number;
  onPress?: () => void;
}

const Icon = styled.View<{ size: number; color: string }>`
  background: ${({ color }) => color};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 4}px;
`;

const PlaceholderIcon: React.FC<Props> = ({
  color = 'red',
  size = 24,
  onPress,
}) => (
  <Cell onPress={onPress}>
    <Icon color={color} size={size} />
  </Cell>
);

export { PlaceholderIcon };
