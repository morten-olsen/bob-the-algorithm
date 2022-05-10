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
  const [innerValue, setValue] = useState(value ? timeUtils.timeToString(value) : '');

  useEffect(
    () => {
      if (!innerValue && value) {
        onChange(undefined); 
        return;
      }
      const parsed = timeUtils.stringToTime(innerValue)
      if (!parsed) {
        return;
      }
      if (value && timeUtils.equal(parsed, value)) {
        return;
      } 
      onChange(parsed);
    },
    [innerValue, value, onChange],
  )

  return (
    <Row overline={label} {...row}>
      <TimeField
        placeholder={placeholder}
        value={innerValue}
        onChangeText={setValue}
      />
      {children}
    </Row>
  );
};

export { TimeInput };
