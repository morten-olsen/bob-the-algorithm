import { useMemo } from 'react';
import { PlannedTask } from "#/features/planner/types";
import chroma from 'chroma-js';
import styled from "styled-components/native";
import stringToColor from 'string-to-color';
import { timeUtils } from '#/features/data';
import { Body1, CalendarEntry, Row } from '@morten-olsen/ui';

type Props = {
  task: PlannedTask;
  onPress?: () => void;
};


const Touch = styled.TouchableOpacity`
`;

const PlanDayTask: React.FC<Props> = ({ task, onPress }) => {
  const color = useMemo(
    () => chroma(stringToColor(task.name)).luminance(0.7).saturate(1).brighten(0.6).hex(),
    [task.name],
  );
  const height = useMemo(
    () => (timeUtils.timeToMinutes(task.end) - timeUtils.timeToMinutes(task.start)) / 10,
    [task.start, task.end],
  );
  const view = (
    <Row>
      <CalendarEntry
        start={timeUtils.timeToDate(task.start)}
        end={timeUtils.timeToDate(task.end)}
        title={task.name}
      />
    </Row>
  );

  if (onPress) {
    return (
      <Touch onPress={onPress}>
        {view}
      </Touch>
    );
  }
  return view;
};

export { PlanDayTask };
