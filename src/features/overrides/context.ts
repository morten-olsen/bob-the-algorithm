import { createContext, SetStateAction } from "react";
import { Time, UserLocation } from "../data";
import { Day } from "../day";

type Override = {
  locations?: UserLocation[] | null;
  startMin?: Time;
  startMax?: Time;
  duration?: number;
  required?: boolean;
  priority?: number;
  enabled?: boolean;
}

type OverrideIndex = {
  startTime?: Time;
  tasks: {
    [id: string]: Override;
  };
};

type OverrideContextValue = {
  overrides: OverrideIndex;
  get: (date: Day) => Promise<OverrideIndex>;
  set: React.Dispatch<SetStateAction<OverrideIndex>>;
}
const OverrideContext = createContext<OverrideContextValue>(undefined as any);

export type { Override, OverrideIndex, OverrideContextValue };
export { OverrideContext };
