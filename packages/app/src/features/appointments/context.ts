import { createContext } from "react"
import { Appointment } from "../data"
import { Day } from "../day"

enum AppointmentsStatus {
  unavailable = 'unavailable',
  unapproved = 'unapproved',
  rejected = 'rejected',
  approved = 'approved',
}

type AppointmentsContextUnavailable = {
  status: AppointmentsStatus.unavailable | AppointmentsStatus.rejected;
}

type AppointmentsContextUnapprovedValue = {
  status: AppointmentsStatus.unapproved;
  request: () => Promise<void>;
}

type AppointmentsContextApproved = {
  status: AppointmentsStatus.approved;
  getDay: (day: Day) => Promise<Appointment[]>
}

type AppointmentsContextValue = AppointmentsContextUnavailable
  | AppointmentsContextUnapprovedValue
  | AppointmentsContextApproved;

const AppointmentsContext = createContext<AppointmentsContextValue>(undefined as any);

export type {
  AppointmentsContextValue,
};
export { AppointmentsContext, AppointmentsStatus };
