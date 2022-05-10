import { Task, Time, UserLocation } from "#/features/data";
import { Context, GraphNode } from "../types";
import { getImpossible, getNext } from "./get-next";

enum Strategies {
  all = 'all',
  allValid = 'all-valid',
  firstValid = 'first-valid',
  firstComplet = 'first-complete',
}
type RunningStatus = {
  current: 'running';
  nodes: number;
  start: Date;
  strategy: Strategies,
  cancel: () => void;
}

type CompletedStatus = {
  current: 'completed';
  start: Date;
  end: Date;
  nodes: number;
  strategy: Strategies,
}

type Status = RunningStatus | CompletedStatus;

type BuildGraphOptions = {
  location: UserLocation;
  time: Time;
  tasks: Task[];
  context: Context;
  strategy?: Strategies;
  batchSize?: number;
  sleepTime?: number;
  callback?: (status: Status) => void;
};

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const fil = <T>(
  fn: ((item: T) => boolean)[],
  input: T[],
): T[][] => {
  const output: T[][] = new Array(fn.length).fill(undefined).map(() => []);
  for (let i = 0; i < input.length; i++) {
    for (let b = 0; b < fn.length; b++) {
      if (fn[b](input[i])) {
        output[b].push(input[i]);
        break;
      }
    }
  }
  return output;
};

const buildGraph = async ({
  location,
  time,
  tasks,
  context,
  strategy = Strategies.allValid,
  callback,
  batchSize = 1000,
  sleepTime = 10,
}: BuildGraphOptions) => {
  const start = new Date();
  let nodeCount = 0;
  let running = true;
  const { remaining, impossible } = getImpossible(tasks, time);
  let leafList: GraphNode[] = [{
    location,
    time: {
      end: time,
      start: time,
    },
    score: 0,
    remainingTasks: remaining,
    impossibeTasks: impossible,
    status: {
      dead: false,
      completed: false,
    },
  }];
  const completedList: GraphNode[] = [];
  const deadList: GraphNode[] = [];

  const complete = (nodes: GraphNode[]) => {
    if (callback) {
      callback({
        current: 'completed',
        nodes: nodeCount,
        start,
        end: new Date(),
        strategy,
      });
    }
    return nodes.sort((a, b) => b.score - a.score);
  }

  while (true) {
    nodeCount++;
    if (!running) {
      return [];
    }
    if (
      leafList.length === 0
      && completedList.length === 0
      && strategy !== Strategies.all
    ) {
      strategy = Strategies.all;
      leafList.push(...deadList);
    }
    const node = leafList.pop();
    if (!node) {
      break;
    }
    if (nodeCount % batchSize === 0) {
      if (callback) {
        callback({
          current: 'running',
          nodes: nodeCount,
          strategy,
          start,
          cancel: () => {
            running = false;
          }
        })
      }
      await sleep(sleepTime);
    }
    const next = await getNext(node, context); 
    const [alive, completed, dead] = fil([
      n => (strategy === Strategies.all || !n.status.dead) && !n.status.completed,
      n => !!n.status.completed && (strategy === Strategies.all || !n.status.dead),
      n => n.status.dead,
    ], next);
    leafList.push(...alive);
    if (strategy === Strategies.firstValid && completed.length > 0) {
      return complete(completed);
    }
    if (completed.length > 0) {
      completedList.push(...completed)
    }
    if (strategy === Strategies.firstComplet) {
      const fullComplete = completed.find(c => c.impossibeTasks.length === 0);
      if (fullComplete) {
        return complete([fullComplete]);
      }
    }
    if (strategy !== Strategies.all) {
      deadList.push(...dead);
    }
  }

  return complete(completedList);
}

export type { Status, BuildGraphOptions };
export { buildGraph, Strategies };
