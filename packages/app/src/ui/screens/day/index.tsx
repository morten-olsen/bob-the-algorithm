import { useAppointmentStatus } from "#/features/appointments";
import { AppointmentsStatus } from "#/features/appointments/context";
import { TaskType } from "#/features/data";
import { dayUtils, useDate, useSetDate } from "#/features/day";
import { useSetStartTimeOverride, useStartTimeOverride } from "#/features/overrides";
import { CalendarStrip } from "@morten-olsen/ui/components/date"
import { TimeInput } from "@morten-olsen/ui/components/form";
import { TaskGroup } from "#/ui/containers/tasks/group";
import styled from "styled-components/native";

const Wrapper = styled.View`
  margin-top: 30px;
  flex: 1;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const DayScreen: React.FC = () => {
  const date = useDate();
  const setDate = useSetDate();
  const appointmentStatus = useAppointmentStatus();
  const startTimeOverride = useStartTimeOverride();
  const [setStartTimeOverride] = useSetStartTimeOverride();

  return (
    <Wrapper>
      <CalendarStrip
        selected={dayUtils.dayToDate(date)}
        onSelect={(date) => setDate(dayUtils.dateToDay(date))}
      />
      <Content>
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
      </Content>
    </Wrapper>
  );
};

export { DayScreen };
