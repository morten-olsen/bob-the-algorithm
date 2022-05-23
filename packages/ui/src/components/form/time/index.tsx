import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, TextInputProps } from '../text-input';

type Time = {
  hour: number;
  minute: number;
};

type Props = TextInputProps & {
  value?: Time;
  onChange: (time?: Time) => any;
}


const timeToString = (time: Time) => {
  const hour = time.hour < 10 ? `0${time.hour}` : time.hour;
  const minute = time.minute < 10 ? `0${time.minute}` : time.minute;
  return `${hour}:${minute}`;
};

const stringToTime = (value: string) => {
  const [hour = '0', minute = '0'] = value.split(':');
  return {
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
  };
};

const TimeInput: React.FC<Props> = ({
  value,
  onChange,
  children,
  ...rest
}) => {
  const [current, setCurrent] = useState(value ? timeToString(value) : '');
  useEffect(() => {
    setCurrent(value ? timeToString(value) : '');
  }, [value]);

  const onBlur = useCallback(
    () => {
      onChange(stringToTime(current));
    },
    [current, onChange],
  );

  return (
    <TextInput
      {...rest}
      value={current}
      onChangeText={setCurrent}
      onBlur={onBlur}
    />
  );
};

export { TimeInput };
