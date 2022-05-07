import { Calendar } from "expo-calendar";
import { createContext } from "react";

type RejectedCalendarContextValue = {
  status: 'rejected';
  date: Date;
  setDate: (date: Date) => void;
}

type UnavailableCalendarContextValue = {
  status: 'unavailable';
  date: Date;
  setDate: (date: Date) => void;
}

type AcceptedCalendarContextValue = {
  status: 'ready';
  date: Date;
  setDate: (date: Date) => void;
  calendars: Calendar[];
  calendar: Calendar;
  selected: Calendar[];
  setSelected: (calendars: Calendar[]) => void;
  error?: any;
}

type CalendarContextValue = RejectedCalendarContextValue
  | UnavailableCalendarContextValue
  | AcceptedCalendarContextValue

const CalendarContext = createContext<CalendarContextValue>(undefined as any);

export type { CalendarContextValue };
export { CalendarContext };
