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

const Time = styled.Text<{background : string}>`
  font-size: 10px;
  font-weight: bold;
`;

const TimeBox = styled.View<{
  background: string;
}>`
  margin-right: 10px;
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Filler = styled.View`
  margin: 10px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Block = styled.View<{
  background: string;
  height: number;
}>`
  background: ${({ background }) => background};
  height: ${({ height }) => height / 3}px;
  max-height: 100px;
  margin: 5px;
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
  border: solid 1px ${({ background }) => background === 'transparent' ? background : chroma(background).darken(0.3).hex()};
`;

const Main = styled.View`
  flex: 1;
`

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
        location={task.location?.join(', ') || 'anywhere'}
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
