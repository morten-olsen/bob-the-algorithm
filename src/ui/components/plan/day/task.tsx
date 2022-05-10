import { useMemo } from 'react';
import { PlannedTask } from "#/features/planner/types";
import chroma from 'chroma-js';
import styled from "styled-components/native";
import stringToColor from 'string-to-color';
import { timeUtils } from '#/features/data';
import { Body1 } from '#/ui/typography';

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
    () => timeUtils.timeToMinutes(task.end) - timeUtils.timeToMinutes(task.start),
    [task.start, task.end],
  );
  const view = (
    <Block height={Math.max(70, height * 10)} background={color}>
      <TimeBox background={color}>
        <Time background={color}>{timeUtils.timeToString(task.start)}</Time>
        <Time background={color}>{timeUtils.timeToString(task.end)}</Time>
      </TimeBox>
      <Main>
        <Body1>{task.name}</Body1>
      </Main>
      <Filler />
    </Block>
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
