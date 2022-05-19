import { Day } from "./day";

const today = () => {
  return dateToDay(new Date());
}

const dayToDate = (day: Day) => {
  return new Date(day.year, day.month - 1, day.date, 0, 0, 0, 0);
}

const dateToDay = (input: Date) => {
  const year = input.getFullYear();
  const month = input.getMonth() + 1;
  const date = input.getDate();
  const day: Day = { year, month, date };
  return day;
}

const toId = (day: Day) => {
  return `${day.year.toString().padStart(4, '0')}-${day.month.toString().padStart(2, '0')}-${day.date.toString().padStart(2, '0')}`;
}

const dayUtils = {
  today,
  dateToDay,
  dayToDate,
  toId,
};

export { dayUtils };
