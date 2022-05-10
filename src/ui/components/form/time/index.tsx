import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Row, RowProps } from '#/ui/components/base';
import { Time, timeUtils } from '#/features/data';

type Props = RowProps & {
  label: string;
  placeholder?: string;
  value?: Time;
  onChange: (time?: Time) => any;
}

const TimeField = styled.TextInput`
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.margins.small}px;
  font-size: ${({ theme }) => theme.font.baseSize}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  width: 100%;
`;

const TimeInput: React.FC<Props> = ({ label, placeholder, value, onChange, children, ...row }) => {

  return (
    <Row overline={label} {...row}>
      <TimeField
        placeholder={placeholder}
        value={value ? timeUtils.timeToString(value) : ''}
        onChangeText={(text) => onChange(text ? timeUtils.stringToTime(text) : undefined)}
      />
      {children}
    </Row>
  );
};

export { TimeInput };
