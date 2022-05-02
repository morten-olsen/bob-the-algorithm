import { UserLocation } from "#/types/location";
import { Task } from "#/types/task";

export const locationEqual = (a: UserLocation, b: UserLocation) => {
  if (a === b) {
    return true;
  }
  if (a.location === b.location) {
    return true;
  }
  if (a.location && b.location && a.location.latitude === b.location.latitude && a.location.longitute === b.location.longitute) {
    return true;
  }
  if (a.title === b.title) {
    return true;
  }
  return false;
}

export const listContainLocation = (list: UserLocation[], target: UserLocation) => {
  return !!list.find(l => locationEqual(l, target));
}

export const getRemainingLocations = (tasks: Task[], current: UserLocation) => {
  const result: UserLocation[] = [];
  tasks.forEach((task) => {
    if (!task.locations) {
      return;
    }
    for (let location of task.locations) {
      if (!listContainLocation(result, location) && !locationEqual(current, location)) {
        result.push(location)
      }
    }
  })
  return result;
};

