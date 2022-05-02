import { GetTransition, UserLocation } from "#/types/location";
import { createContext } from "react"

type LocationContextValue = {
  locations: {
    [id: string]: UserLocation;
  };
  set: (location: UserLocation) => any;
  remove: (id: string) => any;
  lookup?: (address: string) => UserLocation[];
  getTransition: GetTransition;
}

const LocationContext = createContext<LocationContextValue>(undefined as any);

export type { LocationContextValue };
export { LocationContext };
