import React from 'react';
import styled from 'styled-components/native';
import { Row, RowProps } from '#/ui/components/base';

type Props = RowProps & {
  label: string;
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

const TextInput: React.FC<Props> = ({ label, placeholder, value, onChangeText, children, ...row }) => {
  return (
    <Row overline={label} {...row}>
      <InputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {children}
    </Row>
  );
};

export { TextInput };
