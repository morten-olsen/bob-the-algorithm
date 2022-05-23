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

const largerThan = (a: Time, b: Time) => {
  return timeToMinutes(a) > timeToMinutes(b);
}

const max = (a: Time, b: Time) => largerThan(a, b) ? a : b;
const min = (a: Time, b: Time) => largerThan(a, b) ? b : a;

const timeToString = (input: Time) => `${input.hour}:${input.minute}`;

const timeToMinutes = (time: Time) => time.hour * 60 + time.minute;

const minutesToTime = (minutes: number): Time => {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return { hour, minute };
}

const timeToDate = (time: Time) => {
  return new Date(0, 0, 0, time.hour, time.minute);
}

const dateToTime = (date: Date) => {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}

const add = (a: Time, b: Time | number) => {
  const toAdd = typeof b === 'number' ? b : b.hour * 60 + b.minute
  const current = a.hour * 60 + a.minute + toAdd;
  return minutesToTime(current);
}

const timeUtils = {
  timeToString,
  stringToTime,
  equal,
  largerThan,
  timeToMinutes,
  timeToDate,
  dateToTime,
  max,
  add,
};

export { timeUtils };
