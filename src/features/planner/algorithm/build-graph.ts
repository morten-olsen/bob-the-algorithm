import { Context, GraphNode } from "#/types/graph";
import { UserLocation } from "#/types/location";
import { Task } from "#/types/task";
import { getNext } from "./get-next";

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
  cancel: () => void;
}

type CompletedStatus = {
  current: 'completed';
  start: Date;
  end: Date;
  nodes: number;
}

type Status = RunningStatus | CompletedStatus;

type BuildGraphOptions = {
  location: UserLocation;
  time: Date;
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
        continue;
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
  let leafs: GraphNode[] = [{
    location,
    time: {
      end: time,
      start: time,
    },
    score: 0,
    remainingTasks: tasks,
    impossibeTasks: [],
    status: {
      dead: false,
      completed: false,
    },
  }];
  let nodes = 0;
  let running = true;
  const final: GraphNode[] = [];

  while (true) {
    nodes++;
    if (!running) {
      return [];
    }
    const node = leafs.pop();
    if (!node) {
      break;
    }
    if (nodes % batchSize === 1) {
      if (callback) {
        callback({
          current: 'running',
          nodes,
          start,
          cancel: () => {
            running = false;
          }
        })
      }
      await sleep(sleepTime);
    }
    const next = await getNext(node, context); 
    const [alive, completed] = fil([
      n => !n.status.dead && !n.status.completed,
      n => !!n.status.completed && !n.status.dead
    ], next);
    leafs.push(...alive);
    if (strategy === Strategies.firstValid && completed.length > 0) {
      if (callback) {
        callback({ current: 'completed', nodes, start, end: new Date() })
      }
      return completed;
    }
    if (completed.length > 0) {
      final.push(...completed)
    }
    if (strategy === Strategies.firstComplet) {
      const fullComplete = completed.find(c => c.impossibeTasks.length === 0);
      if (fullComplete) {
        if (callback) {
          callback({ current: 'completed', nodes, start, end: new Date() })
        }
        return [fullComplete];
      }
    }
  }

  console.log('nodes', nodes);
  if (callback) {
    callback({ current: 'completed', nodes, start, end: new Date() })
  }
  return final 
    .filter(n => n.status.completed)
    .sort((a, b) => b.score - a.score);
}

export type { Status, BuildGraphOptions };
export { buildGraph, Strategies };
