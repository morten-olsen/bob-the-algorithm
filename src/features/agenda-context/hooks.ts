import { useAsyncCallback } from "#/hooks/async";
import { Task } from "#/types/task";
import { set } from "date-fns";
import { useContext, useMemo } from "react"
import { useDate } from "../calendar";
import { useTasks } from "../tasks";
import { AgendaContextContext } from "./context"

const toToday = (today: Date, target: Date) => set(target, {
  year: today.getFullYear(),
  month: today.getMonth(),
  date: today.getDate(),
})

export const useAgendaContext = () => {
  const { contexts } = useContext(AgendaContextContext);
  return contexts;
}

export const useSetAgendaContext = () => {
  const { set } = useContext(AgendaContextContext);
  const result = useAsyncCallback(set, [set]);
  return result;
}

export const useTasksWithContext = () => {
  const { all } = useTasks();
  const date = useDate();
  const contexts = useAgendaContext();

  const withContext = useMemo<(Task & { enabled: boolean })[]>(
    () => all.map((task) => {
      const context = contexts[task.id];
      if (!context) {
        return { ...task, enabled: true };
      }
      return {
        ...task,
        locations: context.locations?.length || 0 > 0 ? context.locations : task.locations,
        start: {
          min: context.startMin ? toToday(date, context.startMin) : task.start.min,
          max: context.startMax ? toToday(date, context.startMax) : task.start.max,
        },
        duration: {
          ...task.duration,
          min: context.duration || task.duration.min,
        },
        count: context.count,
        enabled: typeof context.enabled === 'undefined' ? true : context.enabled,
      }
    }),
    [all, contexts],
  );

  return withContext;
}
