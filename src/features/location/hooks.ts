import { useAsync } from "#/features/async";
import { useContext, useMemo } from "react"
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { LocationContext } from "./context"
import { UserLocation } from "../data";
import { getDistanceFromLatLonInKm } from "./utils";

export const useLocations = () => {
  const { locations } = useContext(LocationContext);
  const result = useMemo(() => Object.values(locations), [locations]);
  return result;
}

export const useSetLocation = () => {
  const { set } = useContext(LocationContext);
  return set;
}

export const useRemoveLocation = () => {
  const { remove } = useContext(LocationContext);
  return remove;
}

export const useGetTransition = () => {
  const { getTransition } = useContext(LocationContext);
  return getTransition;
}

export const useLookup = () => {
  const { lookup } = useContext(LocationContext);
  return lookup;
}

export const useCurrentLocation = (proximity: number = 0.5) => {
  const { locations } = useContext(LocationContext);
  const result = useAsync<UserLocation | undefined>(
    async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return undefined;
      }
      let position = await getCurrentPositionAsync({});
      const withDistance = Object.values(locations).map((location) => {
        if (!location.position) {
          return;
        }
        const distance = getDistanceFromLatLonInKm(
          position.coords.latitude,
          position.coords.longitude,
          location.position.latitude,
          location.position.longitute,
        )
        return {
          distance,
          location,
        }
      }).filter(Boolean).sort((a, b) => a!.distance - b!.distance)
      const current = withDistance.find(d => d!.distance < proximity);
      if (!current) {
        return {
          id: `${position.coords.longitude} ${position.coords.latitude}`,
          title: 'Unknown',
          position: {
            latitude: position.coords.latitude,
            longitute: position.coords.longitude,
          },
        };
      }
      return current.location;
    },
    [],
  );
  return result;
}
