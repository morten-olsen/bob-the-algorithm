import { createContext } from "react";
import { Day } from ".";

type DateContextValue = {
  date: Day;
  setDate: (date: Day) => void;
}

const DateContext = createContext<DateContextValue>(undefined as any);

export type { DateContextValue };
export { DateContext }
