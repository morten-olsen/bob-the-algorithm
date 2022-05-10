import { useContext } from "react"
import { useAsyncCallback } from "../async";
import { Time } from "../data";
import { Override, OverrideContext } from "./context"

export const useOverrides = () => {
  const { overrides } = useContext(OverrideContext);
  return overrides;
}

export const useSetOverride = () => {
  const { set } = useContext(OverrideContext);
  return set;
}

export const useGetOverride = () => {
  const { get } = useContext(OverrideContext);
  return get;
}

export const useSetTaskOverride = () => {
  const { set } = useContext(OverrideContext);
  const setTaskOverride = useAsyncCallback(
    async (id: string, overrides: Override) => {
      set(current => ({
        ...current,
        tasks: {
          ...current.tasks,
          [id]: overrides,
        },
      }));
    },
    [set],
  );
  return setTaskOverride;
}

export const useClearTaskOverride = () => {
  const { set } = useContext(OverrideContext);
  const clearTaskOverride = useAsyncCallback(
    async (id: string) => {
      set(current => {
        const tasks = {...current.tasks};
        delete tasks[id]
        return {
          ...current,
          tasks,
        };
      });
    },
    [set],
  );
  return clearTaskOverride;
}

export const useStartTimeOverride = () => {
  const { overrides } = useContext(OverrideContext);
  return overrides.startTime; 
};

export const useSetStartTimeOverride = () => {
  const { set } = useContext(OverrideContext);
  const setStartTime = useAsyncCallback(
    async (startTime?: Time) => {
      set(current => ({
        ...current,
        startTime,
      }));
    },
    [set],
  );
  return setStartTime;
};
