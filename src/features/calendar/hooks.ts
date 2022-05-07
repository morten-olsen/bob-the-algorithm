import { useContext } from "react"
import { CalendarContext } from "./context"
import { set } from 'date-fns'
import { useAsync, useAsyncCallback } from "#/hooks/async";
import { createEventAsync, deleteEventAsync, getEventsAsync } from "expo-calendar";
import { PlanItem } from "#/types/plans";

const emptyArray: never[] = [];
const emptyFn = () => undefined;

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context.status !== 'ready') {
    return undefined;
  }
  return context.calendar;
}

export const useCalendars = () => {
  const context = useContext(CalendarContext);
  if (context.status !== 'ready') {
    return emptyArray;
  }
  return context.calendars;
}

export const useSelectedCalendars = () => {
  const context = useContext(CalendarContext);
  if (context.status !== 'ready') {
    return emptyArray;
  }
  return context.selected;
}

export const useSetSelectedCalendars = () => {
  const context = useContext(CalendarContext);
  if (context.status !== 'ready') {
    return emptyFn;
  }
  return context.setSelected;
}

export const useDate = () => {
  const { date } = useContext(CalendarContext);
  return date;
}

export const useSetDate = () => {
  const { setDate } = useContext(CalendarContext);
  return setDate;
}

export const useCommit = () => {
  const date = useDate();
  const calendar = useCalendar();
  const result = useAsyncCallback(
    async (plan: PlanItem[]) => {
      if (!calendar) {
        return;
      }
      const end = set(date, {
        hours: 24,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      const current = await getEventsAsync([calendar.id], date, end);
      await Promise.all(
        current.map(async (item) => {
          await deleteEventAsync(item.id)
        }),
      );
      for (let item of plan) {
        if (item.type === 'task' && item.external) {
          continue;
        }
        const title = item.type === 'task' ? item.name : `${item.from.title} to ${item.to.title}`;
        await createEventAsync(calendar.id, {
          title: title,
          startDate: item.start,
          endDate: item.end,
        })
      }
    },
    [date, calendar],
  );

  return result;
}

export const useToday = (start: Date, end?: Date) => {
  const selectedCalendars = useSelectedCalendars();
  if (!end) {
    end = set(start, {
      hours: 24,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  }

  const result = useAsync(
    async () => {
      if (selectedCalendars.length === 0) {
        return [];
      }
      return getEventsAsync(selectedCalendars.map(c => c.id), start, end!)
    },
    [selectedCalendars, start.getTime()],
  );

  return result;
}
