import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Row, RowProps } from '../../row';

type Props = RowProps & {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => any;
}

const InputField = styled.TextInput`
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.margins.small}px;
  font-size: ${({ theme }) => theme.font.baseSize}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  width: 100%;
`;

const TextInput: React.FC<Props> = ({ placeholder, value, onChangeText, children, ...row }) => {
  const theme = useTheme();
  return (
    <Row overline={placeholder} {...row}>
      <InputField
        value={value}
        onChangeText={onChangeText}
      />
      {children}
    </Row>
  );
};

export { TextInput };
