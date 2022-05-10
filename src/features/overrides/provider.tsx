import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { ReactNode, SetStateAction, useCallback, useState } from "react";
import { useAsync } from "../async";
import { Day, useDate, dayUtils } from "../day";
import { Override, OverrideContext, OverrideIndex } from "./context";

type OverrideProviderProps = {
  children: ReactNode;
}

const StorageKey = 'overrides';

const OverrideProvider: React.FC<OverrideProviderProps> = ({ children }) => {
  const currentDate = useDate();
  const [overrides, setOverrides] = useState<OverrideIndex>();

  const get = useCallback(
    async (date: Day): Promise<OverrideIndex> => {
      const raw = await AsyncStorageLib.getItem(`${StorageKey}_${dayUtils.toId(date)}`);
      if (!raw) {
        return { tasks: {} };
      }
      return JSON.parse(raw);
    },
    [],
  );

  const set = useCallback(
    async (override: SetStateAction<OverrideIndex>) => {
      const next = typeof override === 'function' ? override(overrides!) : overrides;
      setOverrides(next);
      await AsyncStorageLib.setItem(
        `${StorageKey}_${dayUtils.toId(currentDate)}`,
        JSON.stringify(next),
      );
    },
    [currentDate, overrides],
  );

  useAsync(
    async () => {
      setOverrides(await get(currentDate));
    },
    [currentDate, setOverrides],
  );

  if (!overrides) {
    return <></>
  }

  return (
    <OverrideContext.Provider value={{ overrides, get, set }}>
      {children}
    </OverrideContext.Provider>
  );
}

export type { OverrideProviderProps };
export { OverrideProvider };
