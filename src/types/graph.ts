import { GetTransition, Transition, UserLocation } from "./location";
import { Task } from "./task";

type Context = {
  getTransition: GetTransition;
};


type GraphNode = {
  location: UserLocation;
  task?: Task;
  transition?: Transition;
  parent?: GraphNode;
  remainingTasks: Task[];
  impossibeTasks: Task[];
  score: number;
  time: {
    start: Date;
    end: Date;
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
