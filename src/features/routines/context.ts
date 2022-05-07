import { UserLocation } from "#/types/location";
import { createContext } from "react"

export type Routine = {
  id: string;
  title: string;
  required: boolean;
  priority: number;
  start: {
    min: Date;
    max: Date;
  };
  duration: number;
  location?: UserLocation[];
  days?: boolean[];
}

export type RoutinesContextValue = {
  routines: Routine[]; 
  remove: (id: string) => any;
  set: (routine: Routine) => any;
}

const RoutinesContext = createContext<RoutinesContextValue>(undefined as any);

export { RoutinesContext };
