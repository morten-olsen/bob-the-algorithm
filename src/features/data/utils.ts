import { Time } from "./types";

const equal = (a: Time, b: Time) => {
  return a.hour == b.hour && a.minute === b.minute;
}

const stringToTime = (input: string) => {
  const [hourPart, minutePart] = input.split(':').map(a => a.trim()).filter(Boolean);
  const hour = parseInt(hourPart);
  const minute = parseInt(minutePart || '0');

  if (
    !Number.isInteger(hour)
    || !Number.isInteger(minute)
    || Number.isNaN(hour)
    || Number.isNaN(minute)
  ) {
    return undefined;
  }

  const result: Time = {
    hour,
    minute,
  };

  return result;
};

const timeToString = (input: Time) => `${input.hour}:${input.minute}`;

const timeUtils = {
  timeToString,
  stringToTime,
  equal,
};

export { timeUtils };
