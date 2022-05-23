import { createDataContext } from "#/utils/data-context";
import { Routine } from "../data";

const {
  Context: RoutinesContext,
  Provider: RoutinesProvider,
}= createDataContext<{[id: string]: Routine}>({
  createDefault: () => ({}),
})

export { RoutinesContext, RoutinesProvider };
