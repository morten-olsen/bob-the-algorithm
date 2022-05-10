import { createDataContext } from '#/utils/data-context';
import { Strategies } from "./algorithm/build-graph";

type PlannerOptions = {
  strategy: Strategies;
}

const {
  Context: PlannerContext,
  Provider: PlannerProvider,
} = createDataContext<PlannerOptions>({
  createDefault: () => ({
    strategy: Strategies.firstComplet,
  }),
});

export type { PlannerOptions };
export { PlannerContext, PlannerProvider };
