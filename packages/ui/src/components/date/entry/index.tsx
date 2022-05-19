import { Body1, Caption, Overline } from "../../../typography";
import { Row, Cell, Icon, RowProps } from '../../base';
import styled from "styled-components/native"
import stringToColor from 'string-to-color';
import { useMemo } from "react";
import chroma from 'chroma-js';
import { format } from "date-fns";

type Props = RowProps & {
  start: Date;
  end: Date;
  height?: number;
  title: string;
  location?: string;
  checked?: boolean;
  onChangeChecked?: (checked: boolean) => void;
}

const Wrapper = styled(Row)<{
  height?: number;
  color: string;
}>`
  background-color: ${({ color }) => color};
  border-color: ${({ color }) => chroma(color).darken(0.1).hex()};
  border-width: 2px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  ${({ height }) => height && `height: ${height}px`};
`;

const CalendarEntry = ({ 
  start,
  end,
  height,
  title,
  location,
  checked,
  onChangeChecked,
  ...row
}: Props) => {
  const color = useMemo(() => {
    const base = stringToColor(title);
    return chroma(base).darken(0.9).desaturate(2.5).luminance(0.1).hex();
  }, [title]);
  const time = useMemo(() => {
    const startTime = format(start, 'HH:mm');
    const endTime = format(end, 'HH:mm');
    return `${startTime} - ${endTime}`;
  }, [start, end]);

  return (
    <Wrapper
      {...row}
      left={typeof checked !== 'undefined' && (
        <>
          <Cell onPress={onChangeChecked ? () => onChangeChecked(!checked) : undefined}>
            <Icon color="background" name={checked ? 'check' : 'square'} />
          </Cell>
          {row.left}
        </>
      )}
      height={height}
      color={color}
    >
      <Overline color="background">{location}</Overline>
      <Body1 color="background">{title}</Body1>
      <Caption color="background">{time}</Caption>
    </Wrapper>
  );
};

export { CalendarEntry };
