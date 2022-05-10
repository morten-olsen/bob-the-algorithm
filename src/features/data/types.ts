import { Day } from "../day"

export enum TaskType {
  appointment = 'appointment',
  goal = 'goal',
  routine = 'routine',
}

export type Time = {
  hour: number;
  minute: number;
}

export type UserLocation = {
  id: string;
  title: string;
  position: {
    longitute: number;
    latitude: number;
  };
}

export type TaskBase = {
  type: TaskType;
  id: string;
  title: string;
  locations?: UserLocation[];
  required: boolean;
  priority?: number;
  startTime: {
    min: Time;
    max: Time;
  };
  duration: number;
}

export type Appointment = TaskBase & {
  type: TaskType.appointment;
  calendarId: string;
}

export type Goal = TaskBase & {
  type: TaskType.goal;
  completed: boolean;
  deadline?: Day;
  startDate?: Day;
  days: boolean[];
}

export type Routine = TaskBase & {
  type: TaskType.routine;
  days: boolean[];
}

export type Task = Appointment | Goal | Routine;
