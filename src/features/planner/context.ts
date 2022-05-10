import { createDataContext } from '#/utils/data-context';
import { Time } from '../data';
import { Strategies } from "./algorithm/build-graph";

type PlannerOptions = {
  strategy: Strategies;
  startTime: Time;
}

const {
  Context: PlannerContext,
  Provider: PlannerProvider,
} = createDataContext<PlannerOptions>({
  createDefault: () => ({
    startTime: { hour: 7, minute: 0 },
    strategy: Strategies.firstComplet,
  }),
});

export type { PlannerOptions };
export { PlannerContext, PlannerProvider };
