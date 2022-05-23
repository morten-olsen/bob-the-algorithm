import { useAsync, useAsyncCallback } from "#/features/async";
import { GetTransition } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useState } from "react";
import { LocationContext } from "./context";
import { UserLocation } from "../data";

type LocationProviderProps = {
  children: ReactNode;
  lookup: (address: string) => UserLocation[];
  getTransition: GetTransition;
}

const LOCATION_STORAGE_KEY = 'locations';

const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
  lookup,
  getTransition,
}) => {
  const [locations, setLocations] = useState<{[id: string]: UserLocation}>({});

  useAsync(
    async () => {
      const raw = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
      if (raw) {
        setLocations(JSON.parse(raw));
      }
    },
    [],
  );

  const [set] = useAsyncCallback(
    async (location: UserLocation) => {
      const index = {
        ...locations,
        [location.id]: location,
      }
      setLocations(index);
      await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(index));
    },
    [setLocations, locations],
  )

  const [remove] = useAsyncCallback(
    async (id: string) => {
      const index = {
        ...locations,
      }
      delete index[id];
      setLocations(index);
      await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(index));
    },
    [setLocations, locations],
  );

  return (
    <LocationContext.Provider
      value={{
        locations,
        set,
        remove,
        lookup,
        getTransition,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export type { LocationProviderProps };
export { LocationProvider };
