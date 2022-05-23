import React from 'react';
import { TextInputProps as ReactTextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { Overline } from '../../../typography';
import { Cell, IconNames, Row, RowProps, Icon } from '../../base';

type TextInputProps = RowProps & {
  label: string;
  icon?: IconNames;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => any;
  onBlur?: () => any;
  type?: ReactTextInputProps['textContentType'];
}

const InputField = styled.TextInput`
  margin: ${({ theme }) => theme.margins.small}px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.baseSize}px;
  width: 100%;
`;

const Wrapper = styled(Row)`
  padding: 0;
  border-color: ${({ theme }) => theme.colors.input};
  border-width: 0.5px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
`;

const TextInput = ({
  label,
  icon,
  type,
  onBlur,
  placeholder, value, onChangeText, children, ...row }: TextInputProps) => {
  return (
    <Row {...row}>
      <Wrapper
        left={icon && (
          <Cell>
            <Icon name={icon} />
          </Cell>
        )}
      >
        <Overline>{label}</Overline>
        <InputField
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          textContentType={type}
          secureTextEntry={type === 'password'}
          onChangeText={onChangeText}
        />
        {children}
      </Wrapper>
    </Row>
  );
};

export type { TextInputProps };
export { TextInput };
