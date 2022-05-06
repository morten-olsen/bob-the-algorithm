import { useGetTransition } from "#/features/location";
import { buildGraph, Status, Strategies } from "./algorithm/build-graph";
import { constructDay } from "./algorithm/construct-day";
import { useAsyncCallback } from "#/hooks/async";
import { UserLocation } from "#/types/location";
import { useDate } from "../calendar";
import { useTasksWithContext } from "../agenda-context";
import { useContext, useMemo, useState } from "react";
import { PlanItem } from "#/types/plans";
import { Task } from "#/types/task";
import { PlannerContext } from "./context";

export type UsePlanOptions = {
  location: UserLocation;
}

export type UsePlan = [
  (start?: Date) => Promise<any>,
  { 
    result?: { agenda: PlanItem[], impossible: Task[] };
    status?: Status;
    loading: boolean;
    error?: any;
  }
]

export const usePlanOptions = () => {
  const { options } = useContext(PlannerContext);
  return options;
}

export const useSetPlanOptions = () => {
  const { setOptions } = useContext(PlannerContext);
  return setOptions;
}

export const usePlan = ({
  location,
}: UsePlanOptions): UsePlan => {
  const today = useDate();
  const planOptions = usePlanOptions();
  const [status, setStatus] = useState<Status>();
  const all = useTasksWithContext();
  const enabled = useMemo(() => all.filter(f => f.enabled), [all])
  const getTransition = useGetTransition();
  const [invoke, options] = useAsyncCallback(
    async (start?: Date) => {
      const graph = await buildGraph({
        location,
        time: start || today,
        tasks: enabled,
        strategy: planOptions.strategy,
        context: {
          getTransition,
        },
        callback: setStatus,
      });
      const valid = graph.filter(a => !a.status.dead && a.status.completed).sort((a, b) => b.score - a.score);
      const day = constructDay(valid[0]);
      return {
        impossible: valid[0].impossibeTasks,
        agenda: day, 
      };
    },
    [today, location, all, setStatus, planOptions],
  );

  return [
    invoke,
    {
      result: options.result,
      loading: options.loading,
      error: options.error,
      status: status,
    }
  ];
}
