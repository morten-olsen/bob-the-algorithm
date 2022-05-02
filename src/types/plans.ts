import { UserLocation } from "./location";

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

export type PlanItem = PlannedTask | PlannedTransition;
