import { Appointment, TaskType, timeUtils } from "#/features/data";
import { Day, dayUtils } from "#/features/day";
import { set } from "date-fns";
import { EntityTypes, getCalendarsAsync, getEventsAsync, requestCalendarPermissionsAsync } from "expo-calendar";
import { Platform } from "react-native";
import { IntegrationProvider } from "./provider";

class NativeIntegtration implements IntegrationProvider {
  getAllCalendars = async () => {
    let calendars = await getCalendarsAsync(EntityTypes.EVENT);
    return calendars;
  };

  public setup = async () => {
    if (Platform.OS !== 'ios') {
      return false;
    }
    const { status } = await requestCalendarPermissionsAsync(); 
    if (status !== 'granted') {
      return false;
    }
    return true;
  }

  public getDay = async (day: Day) => {
    const selectedCalendars = await this.getAllCalendars();
    const start = dayUtils.dayToDate(day)
    const end = set(start, {
      hours: 24,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const events = await getEventsAsync(selectedCalendars.map(c => c.id), start, end!)
    return events.filter(a => !a.allDay).map<Appointment>(e => {
      const startTime = timeUtils.dateToTime(new Date(e.startDate));
      const endTime = timeUtils.dateToTime(new Date(e.endDate));
      const duration = timeUtils.timeToMinutes(endTime) - timeUtils.timeToMinutes(startTime);
      return {
        id: e.id,
        type: TaskType.appointment,
        calendarId: e.calendarId,
        title: e.title,
        required: true,
        startTime: {
          min: startTime,
          max: startTime,
        },
        duration,
      }
    });
  }
}

export { NativeIntegtration };
