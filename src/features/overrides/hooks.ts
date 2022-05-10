import { useContext } from "react"
import { useAsyncCallback } from "../async";
import { Time } from "../data";
import { OverrideContext } from "./context"

export const useOverrides = () => {
  const { overrides } = useContext(OverrideContext);
  return overrides;
}

export const useSetOverride = () => {
  const { set } = useContext(OverrideContext);
  return set;
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
