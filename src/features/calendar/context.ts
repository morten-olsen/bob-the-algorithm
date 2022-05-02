import { Calendar } from "expo-calendar";
import { createContext } from "react";

type CalendarContextValue = {
  date: Date;
  setDate: (date: Date) => void;
  calendars: Calendar[];
  calendar: Calendar;
  selected: Calendar[];
  setSelected: (calendars: Calendar[]) => void;
  error?: any;
}

const CalendarContext = createContext<CalendarContextValue>(undefined as any);

export type { CalendarContextValue };
export { CalendarContext };
