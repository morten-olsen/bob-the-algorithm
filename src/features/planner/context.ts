import { createContext } from 'react';
import { Strategies } from "./algorithm/build-graph";

type PlannerOptions = {
  strategy: Strategies;
}
type PlannerContextValue = {
  options: PlannerOptions;
  setOptions: (options: Partial<PlannerOptions>) => void;
}

const PlannerContext = createContext<PlannerContextValue>(undefined as any);

export type { PlannerContextValue, PlannerOptions };
export { PlannerContext };
