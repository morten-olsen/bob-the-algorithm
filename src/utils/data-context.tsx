import { useAsync, useAsyncCallback } from "#/features/async";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useState } from "react"

type DataContextOptions<T> = {
  createDefault: () => T;
  deserialize?: (item: T) => T;
};

type DataContextProviderProps = {
  storageKey: string;
  children: ReactNode;
};

function createDataContext<T extends {[name: string]: any}>({
  createDefault,
  deserialize = a => a,
}: DataContextOptions<T>) {
  const Context = createContext<{
    data: T;
    setData: (data: T | ((current: T) => T)) => Promise<void>;
  }>(undefined as any);

  const Provider: React.FC<DataContextProviderProps> = ({
    storageKey: key,
    children,
  }) => {
    const [current, setCurrent] = useState<T>();

    const [setData] = useAsyncCallback(
      async (input: T | ((current: T) => T)) => {
        let next = typeof input === 'function'
          ? input(current!)
          : input;
        const result = {
          ...current!,
          ...next,
        };
        setCurrent(result);
        await AsyncStorageLib.setItem(key, JSON.stringify(result));
      },
      [key, current, setCurrent],
    );

    useAsync(
      async () => {
        const raw = await AsyncStorageLib.getItem(key);
        const next = raw ? deserialize(JSON.parse(raw)) : createDefault();
        setCurrent(next);
      },
      [key, setCurrent],
    )

    if (!current) {
      return <></>
    }

    return (
      <Context.Provider value={{ data: current, setData }}>
        {children}
      </Context.Provider>
    )
  };

  return { Context, Provider };
}

export { createDataContext };
