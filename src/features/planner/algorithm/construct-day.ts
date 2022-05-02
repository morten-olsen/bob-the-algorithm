import { GraphNode } from "#/types/graph";
import { PlanItem } from "#/types/plans";

const constructDay = (node: GraphNode) => {
  let current: GraphNode | undefined = node;
  const plans: PlanItem[] = [];

  while(current) {
    if (current.task) {
      plans.push({
        type: 'task',
        name: current.task?.name || 'start',
        external: current.task?.external,
        start: new Date(
          current.time.start.getTime()
          + (current.transition?.time || 0),
        ),
        end: current.time.end,
        score: current.score,
      })
    }
    if (current.transition) {
      plans.push({
        type: 'transition',
        start: current.time.start,
        end: new Date(
          current.time.start.getTime()
          + current.transition.time,
        ),
        from: current.transition.from,
        to: current.transition.to,
      })
    }
    current = current.parent;
  }

  return plans.reverse();
}

export { constructDay };
