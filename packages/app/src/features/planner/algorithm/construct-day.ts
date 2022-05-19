import { timeUtils } from "#/features/data";
import { GraphNode, PlannedEntry } from "../types";

const constructDay = (node: GraphNode) => {
  let current: GraphNode | undefined = node;
  const plans: PlannedEntry[] = [];

  while(current) {
    if (current.task) {
      plans.push({
        type: 'task',
        name: current.task?.title || 'start',
        start: timeUtils.add(current.time.start, (current.transition?.time || 0)),
        end: current.time.end,
        score: current.score,
      })
    }
    if (current.transition) {
      plans.push({
        type: 'transition',
        start: current.time.start,
        end: timeUtils.add(current.time.start, current.transition.time),
        from: current.transition.from,
        to: current.transition.to,
      })
    }
    current = current.parent;
  }

  return plans.reverse();
}

export { constructDay };
