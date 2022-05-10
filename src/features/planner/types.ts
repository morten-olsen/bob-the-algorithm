
type Context = {
  getTransition: GetTransition;
};

export type PlannedTask = {
  type: 'task';
  name: string;
  start: Date;
  external?: boolean;
  end: Date;
  score: number;
}

export type PlannedTransition = {
  type: 'transition';
  start: Date;
  end: Date;
  from: UserLocation;
  to: UserLocation;
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
