import { useAsync } from "#/features/async";
import { ReactNode } from "react"
import { Platform } from "react-native";
import { AppointmentsContext, AppointmentsContextValue, AppointmentsStatus } from './context';

type AppointmentsProviderProps = {
  children: ReactNode;
};

const AppointmentsProvider: React.FC<AppointmentsProviderProps> = ({
  children,
}) => {
  const [value] = useAsync<AppointmentsContextValue>(
    async () => {
      if (Platform.OS !== 'ios') {
        return { status: AppointmentsStatus.unavailable };
      }
      return { status: AppointmentsStatus.unavailable };
    },
    [],
  );

  if (!value) {
    return <></>
  }

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export type { AppointmentsProviderProps };
export { AppointmentsProvider };
