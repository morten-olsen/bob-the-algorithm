import { useAsync } from "#/features/async";
import { ReactNode, useState } from "react"
import { Platform } from "react-native";
import { AppointmentsContext, AppointmentsContextValue, AppointmentsStatus } from './context';
import { NativeIntegtration } from "./providers/native";
import { IntegrationProvider } from "./providers/provider";

type AppointmentsProviderProps = {
  children: ReactNode;
};

const AppointmentsProvider: React.FC<AppointmentsProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState<IntegrationProvider>();
  const [value] = useAsync<AppointmentsContextValue>(
    async () => {
      if (Platform.OS !== 'ios') {
        return { status: AppointmentsStatus.unavailable };
      }
      const iosProvider = new NativeIntegtration();
      const setupSuccess = await iosProvider.setup();
      if (!setupSuccess) {
        return { status: AppointmentsStatus.unavailable };
      }
      setProvider(iosProvider);
      return {
        status: AppointmentsStatus.approved,
        getDay: iosProvider.getDay,
      };
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
