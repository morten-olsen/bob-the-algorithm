import { buildGraph, Status, Strategies } from "./algorithm/build-graph";
import { useContext } from "react";
import { add } from 'date-fns';
import { PlannerContext } from "./context";
import { Task, Time, UserLocation } from "../data";
import { useRoutines } from "../routines";
import { useGoals } from "../goals/hooks";
import { useAsyncCallback } from "../async";
import { Day, dayUtils } from "../day";
import { useGetOverride } from "../overrides";
import { useGetAppointments } from "../appointments";
import { useGetTransition } from "../location";
import { PlannedEntry } from "./types";
import { constructDay } from "./algorithm/construct-day";

export type PreparePlanOptions = {
  start: Day;
  end: Day;
}

export type PlanOptions = PreparePlanOptions & {
  location: UserLocation;
}

export type PlanResultDay = {
  day: Day;
  start: Time;
} & ({
  status: 'waiting',
} | {
  status: 'running',
  nodes: number;
  strategy: Strategies;
} | {
  status: 'done';
  nodes: number;
  strategy: Strategies;
  plan: PlannedEntry[];
  impossible: Task[];
});

export type PlanResult = {
  impossible: Task[];
  days: {
    [day: string]: PlanResultDay;
  }
}

const getDays = (start: Day, end: Day): Day[] => {
  const result: Day[] = [];
  let currentDate = dayUtils.dayToDate(start);
  const stopDate = dayUtils.dayToDate(end);
  while (currentDate <= stopDate) {
    result.push(dayUtils.dateToDay(currentDate));
    currentDate = add(currentDate, {
      days: 1,
    });
  }
  return result;
}

const firstValue = <T>(...args: (T | undefined)[]): T => {
  for (let arg of args) {
    if (typeof arg !== 'undefined') {
      return arg;
    }
  }
  return undefined as unknown as T;
}

export const useOptions = () => {
  const { data } = useContext(PlannerContext);
  return data;
}

export const useSetOptions = () => {
  const { setData } = useContext(PlannerContext);
  return setData;
}

const usePreparePlan = () => {
  const routines = useRoutines();
  const goals = useGoals();
  const getOverrides = useGetOverride();
  const [getAppontments] = useGetAppointments();

  const preparePlan = useAsyncCallback(
    async ({ start, end }: PreparePlanOptions) => {
      const days = await Promise.all(getDays(start, end).map(async (day) => {
        const overrides = await getOverrides(day);
        const start: Time = firstValue(overrides.startTime, { hour: 7, minute: 0 });
        const appointments = await getAppontments(day);
        const tasks = [...routines, ...appointments].map<Task | undefined>((task) => {
          const override = overrides.tasks[task.id];
          if (override?.enabled === false) {
            return undefined;
          }
          const result: Task = {
            ...task,
            startTime: {
              min: firstValue(override?.startMin, task.startTime.min),
              max: firstValue(override?.startMax, task.startTime.max),
            },
            duration: firstValue(override?.duration, task.duration),
            required: firstValue(override?.required, task.required),
          }
          return result;
        }).filter(Boolean).map(a => a as Exclude<typeof a, undefined>);

        return {
          day,
          start,
          tasks,
        }

      }));
      return {
        goals: [...goals],
        days,
      }
    },
    [routines, goals, getOverrides, getAppontments],
  );

  return preparePlan;
}

export const usePlanOptions = () => {
  const { data } = useContext(PlannerContext);
  return data;
}

export const useSetPlanOptions = () => {
  const { setData } = useContext(PlannerContext);
  return setData;
}

export const usePlan = () => {
  const [preparePlan] = usePreparePlan();
  const getTransition = useGetTransition();
  const options = usePlanOptions();
  const createPlan = useAsyncCallback(
    async ({ location, ...prepareOptions}: PlanOptions) => {
      const prepared = await preparePlan(prepareOptions);
      let result: PlanResult = {
        impossible: [],
        days: prepared.days.reduce((output, current) => ({
          ...output,
          [dayUtils.toId(current.day)]: {
            day: current.day,
            start: current.start,
            status: 'waiting',
          },
        }), {} as {[name: string]: PlanResultDay})
      }
      const update = (next: PlanResult) => {
        result = next;
      }
      for (let day of prepared.days) {
        const id = dayUtils.toId(day.day);
        const dayGoal = prepared.goals;
        const graph = await buildGraph({
          location,
          time: day.start,
          tasks: [...day.tasks, ...dayGoal],
          strategy: options.strategy,
          context: {
            getTransition,
          },
          callback: (status) => {
            update({
              ...result,
              days: {
                ...result.days,
                [id]: {
                  day: day.day,
                  start: day.start,
                  status: 'running',
                  nodes: status.nodes,
                  strategy: status.strategy,
                }
              }
            });
          }
        });
        const [winner] = graph;
        if (!winner) {
          continue;
        }
        const plan = constructDay(winner);
        update({
          ...result,
          days: {
            ...result.days,
            [id]: {
              ...result.days[id],
              impossible: winner.impossibeTasks,
              status: 'done',
              plan,
            }
          }
        })
        prepared.goals = prepared.goals.filter((goal) => {
          if (!dayGoal.find(d => d.id === goal.id)) {
            return true;
          }
          if (!winner.impossibeTasks.find(d => d.id === goal.id)) {
            return false;
          }
          return true;
        })
      }

      return {
        ...result,
        impossible: prepared.goals,
      };
    },
    [preparePlan, getTransition, options],
  );
  return createPlan;
}
