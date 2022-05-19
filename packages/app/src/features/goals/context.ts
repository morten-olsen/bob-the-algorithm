import { createDataContext } from "#/utils/data-context";
import { Goal } from "../data";

const {
  Context: GoalsContext,
  Provider: GoalsProvider,
}= createDataContext<{[id: string]: Goal}>({
  createDefault: () => ({}),
})

export { GoalsContext, GoalsProvider };
