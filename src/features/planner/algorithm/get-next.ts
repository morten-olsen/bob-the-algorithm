import { Task, Time, timeUtils } from '#/features/data';
import { Transition } from '#/features/location';
import { Context, GraphNode } from '../types';
import { getRemainingLocations, listContainLocation } from './utils';

const DEFAULT_PRIORITY = 50;

const isDead = (impossible: Task[]) => {
  const missingRequered = impossible.find(t => t.required);
  return !!missingRequered;
}

type GetImpossibleResult = {
  remaining: Task[];
  impossible: Task[];
}

export const getImpossible = (
  tasks: Task[],
  time: Time,
) => {
  const result: GetImpossibleResult = {
    remaining: [],
    impossible: [],
  }

  for (let task of tasks) {
    if (timeUtils.largerThan(time, task.startTime.max)) {
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
    score += (task.priority || DEFAULT_PRIORITY) * 10;
    impossible.forEach((task) => {
      if (task.required) {
        score -= 10000 + (1 * (task.priority || DEFAULT_PRIORITY));
      } else {
        score -= 100 + (1 * (task.priority || DEFAULT_PRIORITY));
      }
    });
  });
  if (transition) {
    const minutes = transition.time;
    score -= 10 + (1 * minutes);
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
      const endTime = timeUtils.add(currentNode.time.end, transition.time);
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
          dead: false, // TODO: fix isDead(impossible),
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
    let startTime = 
      timeUtils.max(
        currentNode.time.end,
        task.startTime.min,
      );
    const parentRemainging = currentNode.remainingTasks.filter(t => t !== orgTask);
    let endTime = timeUtils.add(startTime, task.duration);
    const { remaining, impossible } = getImpossible(parentRemainging, endTime);
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
