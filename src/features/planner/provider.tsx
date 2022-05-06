import { ReactNode, useCallback, useState } from 'react';
import { Strategies } from './algorithm/build-graph';
import { PlannerContext, PlannerOptions } from './context';

type PlannerProviderProps = {
  children: ReactNode;
};

const PlannerProvider: React.FC<PlannerProviderProps> = ({ children }) => {
  const [options, setOwnOptions] = useState<PlannerOptions>({
    strategy: Strategies.firstComplet,
  })

  const setOptions = useCallback(
    (next: Partial<PlannerOptions>) => {
      setOwnOptions(current => ({
        ...current,
        ...next,
      }))
    },
    [setOwnOptions],
  );

  return (
    <PlannerContext.Provider value={{ options, setOptions }}>
      {children}
    </PlannerContext.Provider>
  );
}

export type { PlannerProviderProps };
export { PlannerProvider };
