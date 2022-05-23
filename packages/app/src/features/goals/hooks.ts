import { useCallback, useContext, useMemo } from "react"
import { Goal } from "../data";
import { GoalsContext } from "./context"

export const useGoals = () => {
  const { data } = useContext(GoalsContext);
  const current = useMemo(
    () => Object.values(data),
    [data],
  )
  return current;
};

export const useSetGoals = () => {
  const { setData } = useContext(GoalsContext);
  const set = useCallback(
    (goal: Goal) => setData(current => ({
      ...current,
      [goal.id]: goal, 
    })),
    [setData],
  );

  return set;
}

export const useRemoveGoal = () => {
  const { setData } = useContext(GoalsContext);
  const removeRoutine = useCallback(
    (id: string) => {
      setData(current => {
        const next = {...current};
        delete next[id];
        return next;
      })
    },
    [setData],
  );

  return removeRoutine;
}
