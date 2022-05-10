import { useMemo } from "react";
import CalendarStrip from 'react-native-calendar-strip';
import { dayUtils, useDate, useSetDate } from "#/features/day";
import { useTheme } from "styled-components/native";

const DateBar: React.FC = () => {
  const date = useDate();
  const theme = useTheme();
  const setDate = useSetDate();
  const selected = useMemo(
    () => [{
      date: dayUtils.dayToDate(date),
      lines: [{ color: theme.colors.icon }],
    }],
    [date],
  );
  return (
    <CalendarStrip
      markedDates={selected}
      style={{
        height: 150,
        paddingTop: 60,
        paddingBottom: 10,
        backgroundColor: theme.colors.background,
      }}
      calendarColor={'#fff'}
      selectedDate={dayUtils.dayToDate(date)}
      startingDate={dayUtils.dayToDate(date)}
      onDateSelected={(date) => {
        setDate(dayUtils.dateToDay(date.utc().toDate()));
      }}
      shouldAllowFontScaling={false}
      iconContainer={{flex: 0.1}}
      calendarHeaderStyle={{
        color: theme.colors.text,
        fontSize: theme.font.baseSize * 1.2,
      }}
      highlightDateNameStyle={{
        color: theme.colors.icon,
        fontSize: theme.font.baseSize * 0.6,
      }}
      iconLeftStyle={{
        tintColor: theme.colors.text,
      }}
      iconRightStyle={{
        tintColor: theme.colors.text,
      }}
      highlightDateNumberStyle={{
        color: theme.colors.icon,
        fontSize: theme.font.baseSize * 1.2,
      }}
      dateNumberStyle={{
        color: theme.colors.text,
        fontSize: theme.font.baseSize * 1.2,
      }}
      dateNameStyle={{
        color: theme.colors.text,
        fontSize: theme.font.baseSize * 0.6,
      }}
    />
  );
};

export { DateBar };
