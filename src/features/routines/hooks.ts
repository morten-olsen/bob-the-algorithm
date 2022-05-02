import { useCallback, useContext, useMemo } from "react"
import { Routine, RoutinesContext } from "./context"

export const useRoutines = (day?: number) => {
  const { routines } = useContext(RoutinesContext);
  const current = useMemo(
    () => routines.filter(
      r => typeof day === undefined
        || !r.days
        || r.days[day!],
    ),
    [routines],
  );

  return current;
};

export const useSetRoutine = () => {
  const { set } = useContext(RoutinesContext);
  const setRoutine = useCallback(
    (routine: Routine) => set(routine),
    [set],
  );

  return setRoutine;
}

export const useRemoveRoutine = () => {
  const { remove } = useContext(RoutinesContext);
  const removeRoutine = useCallback(
    (id: string) => remove(id),
    [remove],
  );

  return removeRoutine;
}
