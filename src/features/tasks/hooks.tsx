import { useMemo } from "react";
import { useAppointments } from "../appointments";
import { useAsyncCallback } from "../async";
import { Task, TaskType } from "../data";
import { useGoals, useSetGoals } from "../goals/hooks";
import { useRoutines, useSetRoutine } from "../routines";

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
