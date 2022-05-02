import { useCalendars, useSelectedCalendars, useSetSelectedCalendars } from "#/features/calendar"
import { Calendar } from "expo-calendar";
import { useCallback } from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`

`;

const Button = styled.Button`

`;

const CalendarSelectScreen: React.FC = () => {
  const calendars = useCalendars();
  const selected = useSelectedCalendars();
  const setSelected = useSetSelectedCalendars();
  const toggle = useCallback(
    (calendar: Calendar) => {
      const isSelected = !!selected.find(c => c.id === calendar.id);
      if (isSelected) {
        setSelected(selected.filter(c => c.id !== calendar.id));
      } else {
        setSelected([
          ...selected,
          calendar,
        ]);
      }
    },
    [selected]
  )

  return (
    <Wrapper>
      {calendars.map((calendar) => (
        <Button 
          key={calendar.id}
          title={calendar.title + (selected.includes(calendar) ? ' -y' : '-n')}
          onPress={() => toggle(calendar)}
        />

      ))}
    </Wrapper>
  )
}

export { CalendarSelectScreen };
