import { useCallback, useContext, useMemo } from "react"
import { Routine } from "../data";
import { RoutinesContext } from "./context"

export const useRoutines = () => {
  const { data } = useContext(RoutinesContext);
  const current = useMemo(
    () => Object.values(data),
    [data],
  )
  return current;
};

export const useSetRoutine = () => {
  const { setData } = useContext(RoutinesContext);
  const set = useCallback(
    (routine: Routine) => setData(current => ({
      ...current,
      [routine.id]: routine, 
    })),
    [setData],
  );

  return set;
}

export const useRemoveRoutine = () => {
  const { setData } = useContext(RoutinesContext);
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
