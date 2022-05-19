import { useAsync, useAsyncCallback } from "#/features/async";
import { useContext } from "react"
import { Day, useDate } from "../day";
import { AppointmentsContext, AppointmentsStatus } from "./context"

export const useAppointmentStatus = () => {
  const { status } = useContext(AppointmentsContext);
  return status;
};

export const useAppointments = () => {
  const date = useDate();
  const context = useContext(AppointmentsContext);
  const result = useAsync(
    async () => {
      if (context.status !== AppointmentsStatus.approved) {
        return [];
      }
      const appointments = await context.getDay(date);
      return appointments;
    },
    [
      context.status === AppointmentsStatus.approved && context.getDay,
      date,
    ],
  );
  return result;
}

export const useGetAppointments = () => {
  const context = useContext(AppointmentsContext);
  const result = useAsyncCallback(
    async (date: Day) => {
      if (context.status !== AppointmentsStatus.approved) {
        return [];
      }
      const appointments = await context.getDay(date);
      return appointments;
    },
    [
      context.status === AppointmentsStatus.approved && context.getDay,
    ],
  );
  return result;
}
