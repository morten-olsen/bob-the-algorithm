import { GraphNode, Context } from '#/types/graph';
import { Transition } from '#/types/location';
import { Task } from '#/types/task';
import { getRemainingLocations, listContainLocation } from './utils';

const isDead = (impossible: Task[]) => {
  const missingRequered = impossible.find(t => t.required);
  return !!missingRequered;
}

type GetImpossibleResult = {
  remaining: Task[];
  impossible: Task[];
}

const getImpossible = (
  tasks: Task[],
  time: Date,
) => {
  const result: GetImpossibleResult = {
    remaining: [],
    impossible: [],
  }

  for (let task of tasks) {
    if (time > task.start.max) {
      result.impossible.push(task);
    } else {
      result.remaining.push(task);
    }
  };

  return result;
}

type CalculateScoreOptions = {
  tasks?: Task[];
  transition?: Transition;
  impossible: Task[];
}

const calculateScore = ({
  tasks,
  transition,
  impossible,
}: CalculateScoreOptions) => {
  let score = 0;

  tasks?.forEach((task) => {
    score += task.priority * 10;
    impossible.forEach((task) => {
      if (task.required) {
        score -= 1000;
      } else {
        score -= task.priority;
      }
    });
  });
  if (transition) {
    const minutes = transition.time / 1000 / 60
    score -= minutes;
  }
  return score;
}
const getNext = async (
  currentNode: GraphNode,
  context: Context,
): Promise<GraphNode[]> => {
  const nextNodes: GraphNode[] = [];
  if (!currentNode.transition) {
    const remainingLocations = getRemainingLocations(currentNode.remainingTasks, currentNode.location);
    await Promise.all(remainingLocations.map(async(location) => {
      const transition = await context.getTransition(currentNode.location, location, currentNode.time.end);
      const endTime = new Date(currentNode.time.end.getTime() + transition.time);
      const { remaining, impossible } = getImpossible(currentNode.remainingTasks, endTime);
      const score = calculateScore({
        transition, 
        impossible,
      });
      nextNodes.push({
        parent: currentNode,
        location: transition.to,
        remainingTasks: remaining,
        transition,
        impossibeTasks: [
          ...impossible,
          ...currentNode.impossibeTasks,
        ],
        score: currentNode.score + score,
        status: {
          completed: false,
          dead: isDead(impossible),
        },
        time: {
          start: currentNode.time.end,
          end: endTime,
        },
      })
    }));
  }
  const possibleTasks = currentNode.remainingTasks.filter(task => !task.locations || listContainLocation(task.locations, currentNode.location))
  await Promise.all(possibleTasks.map(async (orgTask) => {
    const task = {...orgTask};
    task.count = (task.count || 1) - 1 
    let startTime = new Date(
      Math.max(
        currentNode.time.end.getTime(),
        task.start.min.getTime(),
      ),
    );
    const parentRemainging = currentNode.remainingTasks.filter(t => t !== orgTask);
    let endTime = new Date(startTime.getTime() + task.duration.min);
    const { remaining, impossible } = getImpossible(
      task.count > 0
        ? [...parentRemainging, task]
        : parentRemainging,
      endTime,
    );
    const score = calculateScore({
      tasks: [task], 
      impossible,
    });
    nextNodes.push({
      parent: currentNode,
      location: currentNode.location,
      task,
      remainingTasks: remaining,
      impossibeTasks: [
        ...impossible,
        ...currentNode.impossibeTasks,
      ],
      score: currentNode.score + score,
      status: {
        completed: remaining.length === 0,
        dead: isDead(impossible),
      },
      time: {
        start: startTime,
        end: endTime,
      },
    })
  }));
  return nextNodes;
};

export { getNext };
