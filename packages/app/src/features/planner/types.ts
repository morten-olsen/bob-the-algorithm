import { Task, Time, UserLocation } from "../data";
import { GetTransition, Transition } from "../location";

type Context = {
  getTransition: GetTransition;
};

export type PlannedTask = {
  type: 'task';
  name: string;
  start: Time;
  external?: boolean;
  end: Time;
  score: number;
}

export type PlannedTransition = {
  type: 'transition';
  start: Time;
  end: Time;
  from: UserLocation;
  to: UserLocation;
};

export type PlannedEntry = PlannedTask | PlannedTransition;

type GraphNode = {
  location: UserLocation;
  task?: Task;
  transition?: Transition;
  parent?: GraphNode;
  remainingTasks: Task[];
  impossibeTasks: Task[];
  score: number;
  time: {
    start: Time;
    end: Time;
  };
  status: {
    dead: boolean;
    completed: boolean;
  };
};


export type { 
  GraphNode,
  Context,
};
