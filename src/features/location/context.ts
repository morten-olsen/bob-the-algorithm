import { Time, UserLocation } from "../data";
import { createContext } from "react"

type Transition = {
  time: number;
  usableTime: number;
  to: UserLocation;
  from: UserLocation;
};

type GetTransition = (
  from: UserLocation,
  to: UserLocation,
  time: Time,
) => Promise<Transition>;

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

export type { LocationContextValue, GetTransition, Transition };
export { LocationContext };
