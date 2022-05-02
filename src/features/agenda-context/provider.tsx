import { useAsync } from "#/hooks/async";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { AgendaContext, AgendaContextContext, AgendaContextContextValue } from "./context";

type AgendaContextProviderProps = {
  children: ReactNode;
  day: Date;
}

const AGENDA_CONTEXT_STORAGE_KEY = 'agenda-contexts';

const AgendaContextProvider: React.FC<AgendaContextProviderProps> = ({
  children,
  day,
}) => {
  const [contexts, setContexts] = useState<AgendaContextContextValue['contexts']>({});
  const key = useMemo(
    () => `${AGENDA_CONTEXT_STORAGE_KEY}-${format(day, 'yyyy-MM-dd')}`,
    [day],
  );

  const set = useCallback(
    async (id: string, context: AgendaContext) => {
      const index = {
        ...contexts,
        [id]: {...context},
      };
      setContexts(index);
      await AsyncStorageLib.setItem(key, JSON.stringify(contexts));
    },
    [setContexts, contexts, key],
  );

  useAsync(
    async () => {
      const raw = await AsyncStorageLib.getItem(key);
      if (!raw) {
        return;
      }
      const items = JSON.parse(raw) as AgendaContextContextValue['contexts'];
      Object.values(items).forEach((item) => {
        if (item.startMax) {
          item.startMax = new Date(item.startMax);
        }
        if (item.startMin) {
          item.startMin = new Date(item.startMin);
        }
      })
      setContexts(items);
    },
    [key],
  )

  return (
    <AgendaContextContext.Provider value={{ contexts, set }}>
      {children}
    </AgendaContextContext.Provider>
  );
};

export type { AgendaContextProviderProps };
export { AgendaContextProvider };
