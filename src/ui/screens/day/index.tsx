import { useAppointmentStatus } from "#/features/appointments";
import { AppointmentsStatus } from "#/features/appointments/context";
import { TaskType } from "#/features/data";
import { dayUtils, useDate } from "#/features/day";
import { useSetStartTimeOverride, useStartTimeOverride } from "#/features/overrides";
import { DateBar } from "#/ui/components/date"
import { TimeInput } from "#/ui/components/form";
import { TaskGroup } from "#/ui/components/tasks/group";

const DayScreen: React.FC = () => {
  const date = useDate();
  const appointmentStatus = useAppointmentStatus();
  const startTimeOverride = useStartTimeOverride();
  const [setStartTimeOverride] = useSetStartTimeOverride();

  return (
    <>
      <DateBar />
      <TimeInput
        key={dayUtils.toId(date)}
        label="Start time"
        value={startTimeOverride}
        onChange={setStartTimeOverride}
      />
      {appointmentStatus === AppointmentsStatus.rejected && (
        <TaskGroup type={TaskType.appointment} />
      )}
      <TaskGroup type={TaskType.routine} />
      <TaskGroup type={TaskType.goal} />
    </>
  );
};

export { DayScreen };
