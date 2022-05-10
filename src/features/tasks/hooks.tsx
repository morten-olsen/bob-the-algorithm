import { useMemo } from "react";
import { useAppointments } from "../appointments";
import { useAsyncCallback } from "../async";
import { Task, TaskType } from "../data";
import { useGoals, useRemoveGoal, useSetGoals } from "../goals/hooks";
import { useRemoveRoutine, useRoutines, useSetRoutine } from "../routines";

export const useTasks = (type?: TaskType) => {
  const [appointments] = useAppointments();
  const routines = useRoutines();
  const goals = useGoals();

  const tasks = useMemo<Task[]>(
    () => {
      if (!type) {
        return [...(appointments || []), ...routines, ...goals];
      }
      const map = {
        [TaskType.routine]: routines,
        [TaskType.appointment]: appointments,
        [TaskType.goal]: goals,
      }
      return map[type] || [];
    },
    [appointments, routines, goals, type],
  );

  return tasks;
};

export const useSetTask = () => {
  const setRoutine = useSetRoutine();
  const setGoal = useSetGoals();

  const result = useAsyncCallback(
    async (task: Task) => {
      if (task.type === TaskType.routine) {
        await setRoutine(task);
      } else if (task.type === TaskType.goal) {
        await setGoal(task);
      }
    },
    [setRoutine, setGoal],
  );
  return result;
};

export const useRemoveTask = () => {
  const removeRoutine = useRemoveRoutine();
  const removeGoal = useRemoveGoal();

  const result = useAsyncCallback(
    async (task: Task) => {
      if (task.type === TaskType.routine) {
        removeRoutine(task.id);
      } else if (task.type === TaskType.goal) {
        removeGoal(task.id);
      }
    },
    [removeRoutine, removeGoal],
  );
  return result;
};
