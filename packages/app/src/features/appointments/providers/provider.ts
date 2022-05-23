import { Appointment } from "#/features/data";
import { Day } from "#/features/day";

interface IntegrationProvider {
  getAllCalendars: () => Promise<any>;
  setup: () => Promise<boolean>;
  getDay: (day: Day) => Promise<Appointment[]>;
}

export { IntegrationProvider };
