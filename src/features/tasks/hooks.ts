import { useMemo } from "react";
import { useDate, useToday } from "#/features/calendar"
import { useRoutines } from "#/features/routines";
import { Task } from "#/types/task";
import { set } from "date-fns";

const toToday = (today: Date, target: Date) => set(target, {
  year: today.getFullYear(),
  month: today.getMonth(),
  date: today.getDate(),
})

export const useTasks = () => {
  const start = useDate();
  const day = useMemo(
    () => start.getDay(),
    [start],
  )
  const [fromCalendar = []] = useToday(start);
  const fromRoutines = useRoutines(day);

  const tasksFromCalendar = useMemo<Task[]>(
    () => fromCalendar.filter(e => !e.allDay).map(task => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      const duration = end.getTime() - start.getTime();
      return {
        id: task.id,
        name: task.title,
        external: true,
        required: true,
        start: {
          min: start,
          max: start,
        },
        priority: 100,
        duration: {
          min: duration,
        },
      };
    }),
    [fromCalendar],
  );

  const tasksFromRoutines = useMemo<Task[]>(
    () => fromRoutines.map(task => ({
      id: task.id,
      name: task.title,
      locations:  task.location,
      start: {
        min: toToday(start, task.start.min),
        max: toToday(start, task.start.max),
      },
      priority: task.priority,
      required: task.required,
      duration: {
        min: task.duration,
      },
    })),
    [fromRoutines, start],
  );

  const tasks = useMemo(
    () => ({
      calendar: tasksFromCalendar,
      routines: tasksFromRoutines,
      all: [
        ...tasksFromRoutines,
        ...tasksFromCalendar,
      ],
    }),
    [tasksFromCalendar, tasksFromRoutines],
  );

  return tasks;
}
