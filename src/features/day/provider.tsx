import { ReactNode, useState } from "react";
import { DateContext } from "./context";
import { dayUtils } from "./utils";

type DateProviderProps = {
  children: ReactNode;
};

const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [date, setDate] = useState(dayUtils.today());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
}

export type { DateProviderProps };
export { DateProvider };
