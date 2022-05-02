export type UserLocation = {
  id: string;
  title: string;
  location?: {
    longitute: number;
    latitude: number;
  };
}

export type Transition = {
  time: number;
  usableTime: number;
  to: UserLocation;
  from: UserLocation;
};

export type GetTransition = (
  from: UserLocation,
  to: UserLocation,
  time: Date,
) => Promise<Transition>;
