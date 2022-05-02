import { UserLocation } from "./location";

export type Task = {
  id: string;
  external?: boolean;
  name: string;
  locations?: UserLocation[];
  count?: number;
  required: boolean;
  priority: number;
  start: {
    min: Date;
    max: Date;
  };
  duration: {
    min: number;
    prefered?: number;
  };
}
