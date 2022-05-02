import { Calendar, CalendarAccessLevel, createCalendarAsync, EntityTypes, getCalendarsAsync, getDefaultCalendarAsync, requestCalendarPermissionsAsync } from "expo-calendar";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { useAsync } from "#/hooks/async";
import { CalendarContext } from "./context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SELECTED_STORAGE_KEY = 'selected_calendars';

type CalendarProviderProps = {
  calendarName?: string,
  date: Date;
  children: ReactNode;
  setDate: (date: Date) => void;
}

type SetupResponse = {
  status: 'rejected';
} | {
  status: 'ready';
  calendar: Calendar;
  calendars: Calendar[];
};

const CalendarProvider: React.FC<CalendarProviderProps> = ({
  date,
  children,
  setDate,
  calendarName = 'Bob the planner',
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [value] = useAsync<SetupResponse>(
    async () => {
      const { status } = await requestCalendarPermissionsAsync(); 
      if (status !== 'granted') {
        return { status: 'rejected' };
      }
      let calendars = await getCalendarsAsync(EntityTypes.EVENT);
      let calendar = calendars.find(c => c.title === calendarName);
      if (!calendar) {
        const defaultCalendar = await getDefaultCalendarAsync();
        await createCalendarAsync({
          title: calendarName,
          source: defaultCalendar.source,
          sourceId: defaultCalendar.source.id,
          ownerAccount: 'personal',
          accessLevel: CalendarAccessLevel.OWNER,
          entityType: EntityTypes.EVENT,
          name: calendarName,
        });
        calendars = await getCalendarsAsync(EntityTypes.EVENT);
        calendar = calendars.find(c => c.name === calendarName)!;
      }
      const selectedRaw = await AsyncStorage.getItem(SELECTED_STORAGE_KEY)
      if (selectedRaw) {
        setSelectedIds(JSON.parse(selectedRaw));
      }
      return {
        status: 'ready',
        calendars,
        calendar,
      };
    },
    [],
  );

  const setSelected = useCallback(
    (calendars: Calendar[]) => {
      const ids = calendars.map(c => c.id);
      setSelectedIds(ids);
      AsyncStorage.setItem(SELECTED_STORAGE_KEY, JSON.stringify(ids));
    },
    [setSelectedIds]
  )
  const selected = useMemo(
    () => {
      if (value?.status !== 'ready') {
        return [];
      }
      return value.calendars.filter(c => selectedIds.includes(c.id));
    },
    [value, selectedIds],
  );

  if (!value || value.status !== 'ready') {
    return <></>
  }

  return (
    <CalendarContext.Provider 
      value={{
        setDate,
        date,
        selected,
        setSelected,
        calendar: value.calendar,
        calendars: value.calendars,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
};

export type { CalendarProviderProps };
export { CalendarProvider };
