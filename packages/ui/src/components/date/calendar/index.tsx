import { add } from "date-fns";
import { useMemo, useState } from "react";
import styled from "styled-components/native";
import { Body1 } from '../../../typography';
import { Cell, Row, Icon } from "../../base";

type Props = {
  startDate?: Date;
  selected?: Date;
  onSelect?: (date: Date) => void;
};

const Wrapper = styled.View`

`;

const Week = styled.View`
  flex-direction: row;
`;

const Day = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const Calendar = ({
  startDate = new Date(),
  selected,
  onSelect,
}: Props) => {
  const [current, setCurrent] = useState(
    startDate,
  );

  const weeks = useMemo(
    () => {
      const weeks: Date[][] = [];
      const startDay = new Date(
        current.getFullYear(),
        current.getMonth(),
        1,
      );
      const endDay = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0,
      );

      let currentDate = startDay;
      let week: Date[] = [];

      while (currentDate <= endDay) {
        week.push(currentDate);
        if (currentDate.getDay() === 6) {
          weeks.push(week);
          week = [];
        }
        currentDate = new Date(currentDate.getTime() + 86400000);
      }
      if (week.length > 0) {
        weeks.push(week);
      } 

      return weeks;
    },
    [current],
  );

  const weekdays = useMemo(
    () => new Array(7).fill(0).map((_, i) => days[i]),
    [current],
  );

  const offsetStart = useMemo(
    () => new Array(new Date(current.getFullYear(), current.getMonth(), 1).getDay()).fill(0),
    [current],
  );

  const offsetEnd = useMemo(
    () => new Array(6 - new Date(current.getFullYear(), current.getMonth() + 1, 0).getDay()).fill(0),
    [current],
  );

  return (
    <Wrapper>
      <Row
        left={(
          <Cell onPress={() => setCurrent(add(current, { months: - 1 }))}>
            <Icon name="chevron-left" />
          </Cell>
        )}
        right={(
          <Cell onPress={() => setCurrent(add(current, { months: 1 }))}>
            <Icon name="chevron-right" />
          </Cell>
        )}
        title={current.toLocaleString('default', { month: 'long' })}
      />
      <Week>
        {weekdays.map((day, i) => (
            <Day key={i}>
              <Body1>
                {day}
              </Body1>
            </Day>
        ))}
      </Week>
      {weeks.map((week, index) => (
        <Week key={index}>
          {index === 0 && offsetStart.map((_, index) => (
            <Day key={index} />
          ))}
          {week.map((day, index) => (
            <Day key={index}>
              <Body1>
                {day.getDate()}
              </Body1>
            </Day>
          ))}
          {index === weeks.length - 1 && offsetEnd.map((_, index) => (
            <Day key={index} />
          ))}
        </Week>
      ))}
    </Wrapper>
  )
};


export { Calendar };
