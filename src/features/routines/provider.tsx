import { useAsync, useAsyncCallback } from "#/hooks/async";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useMemo, useState } from "react";
import { Routine, RoutinesContext } from "./context";

type RoutinesProviderProps = {
  children: ReactNode;
}

const ROUTINES_STORAGE_KEY = 'routines-items';

const RoutinesProvider: React.FC<RoutinesProviderProps> = ({ children }) => {
  const [routineIndex, setRoutineIndex] = useState<{[id: string]: Routine}>({});
  const routines = useMemo(
    () => Object.values(routineIndex),
    [routineIndex]
  );

  useAsync(
    async () => {
      const raw = await AsyncStorage.getItem(ROUTINES_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const result = JSON.parse(raw) as {[name: string]: Routine};
      Object.values(result).forEach(item => {
        item.start.max = new Date(item.start.max);
        item.start.min = new Date(item.start.min);
      });
      
      setRoutineIndex(result);
    },
    [setRoutineIndex],
  );

  const [set] = useAsyncCallback(
    async (routine: Routine) => {
      const index = {
        ...routineIndex,
        [routine.id]: routine,
      };
      setRoutineIndex(index);
      await AsyncStorage.setItem(ROUTINES_STORAGE_KEY, JSON.stringify(index));
    },
    [setRoutineIndex, routineIndex],
  );

  const [remove] = useAsyncCallback(
    async (id: string) => {
      const index = {
        ...routineIndex,
      };
      delete index[id];
      setRoutineIndex(index);
      await AsyncStorage.setItem(ROUTINES_STORAGE_KEY, JSON.stringify(index));
    },
    [setRoutineIndex, routineIndex],
  );

  return (
    <RoutinesContext.Provider
      value={{
        routines,
        set,
        remove,
      }}
    >
      {children}
    </RoutinesContext.Provider>
  )
}

export type { RoutinesProviderProps };
export { RoutinesProvider };
