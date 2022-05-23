import { add } from 'date-fns';
import { useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Overline, Title2 } from '../../../typography';
import { Icon, Cell } from '../../base';

type Props = {
  start?: Date;
  selected?: Date;
  onSelect?: (date: Date) => void;
}

type DayProps ={
  selected?: boolean;
  date: Date;
  onPress?: (date: Date) => void;
};

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TitleWrapper = styled.View`
  margin-top: ${({ theme }) => theme.margins.medium}px;
  justify-content: center;
  align-items: center;
`;

const DateWrapper = styled.TouchableOpacity<{
  selected?: boolean;
}>`
  padding: ${({ theme }) => theme.margins.small}px 0;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  flex: 1;
  background-color: ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  max-width: 60px;
`;

const Day = ({ date, selected, onPress }: DayProps) => {
  const textColor = selected ? 'background' : 'text';
  return (
    <DateWrapper selected={selected} onPress={onPress ? () => onPress(date) : undefined}>
      <Title2 color={textColor}>{date.getDate()}</Title2>
      <Overline color={textColor}>{date.toLocaleString('en-us', { weekday: 'short' })}</Overline>
    </DateWrapper>
  );
}

const CalendarStrip: React.FC<Props> = ({ start, selected, onSelect }) => {
  const [current, setCurrent] = useState(start || selected || new Date());
  const firstDayOfWeek = useMemo(() => {
    const currentDay = current.getDay();
    const firstDay = add(current, { days: -currentDay + 1 });
    return firstDay;
  }, [current]);
  const days = useMemo(() => {
    const days = new Array(7).fill(null).map((_, i) => ({
      date: add(firstDayOfWeek, { days: i }),
    }));
    return days;
  }, [firstDayOfWeek]);
  const months = useMemo<[number, number]>(() => {
    const startMonth = firstDayOfWeek.getMonth();
    const endMonth = add(firstDayOfWeek, { days: 7 }).getMonth();
    return [startMonth, endMonth];
  }, [firstDayOfWeek]);

  const monthLabel = useMemo(() => {
    if (months[0] === months[1]) {
      return new Date(0, months[0], 1).toLocaleString('en-us', { month: 'long' });
    } else {
      return `${new Date(0, months[0], 1).toLocaleString('en-us', { month: 'long' })} - ${new Date(0, months[1], 1).toLocaleString('en-us', { month: 'long' })}`;
    }
  }, [months]);

  return (
    <>
      <TitleWrapper>
        <Title2>{monthLabel}</Title2>
      </TitleWrapper>
      <Wrapper>
        <Cell onPress={() => setCurrent(add(current, { weeks: -1 }))}>
          <Icon name="chevron-left"  />
        </Cell>
        {days.map(({ date }) => (
          <Day
            date={date}
            selected={date.getTime() === selected?.getTime()}
            onPress={onSelect}
            key={date.toString()}
          />
        ))}
        <Cell onPress={() => setCurrent(add(current, { weeks: 1 }))}>
          <Icon name="chevron-right"  />
        </Cell>
      </Wrapper>
    </>
  );
};

export { CalendarStrip };
