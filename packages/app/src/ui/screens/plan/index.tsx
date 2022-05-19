import { Day, dayUtils, useDate } from "#/features/day"
import { usePlan } from "#/features/planner";
import { Button, Row } from "@morten-olsen/ui/components/base";
import { CalendarStrip, DateSelector, FormLayout } from "@morten-olsen/ui";
import { PlanDay } from "#/ui/containers/plan";
import { useCallback, useState } from "react";
import styled from "styled-components/native";

const Scroll = styled.ScrollView`
 flex: 1;
`
const Wrapper = styled.View`
  margin: 60px 0;
`

const Horizontal = styled.View`
`;

const FlexDateSelector = styled(DateSelector)`
  width: 100%;
`;

const PlanScreen: React.FC = () => {
  const [start, setStart] = useState<Day>(dayUtils.today());
  const [end, setEnd] = useState<Day>(dayUtils.today());
  const [plan, { result }] = usePlan();

  const runPlanning = useCallback(
    () => plan({
      start,
      end,
      location: { id: 'sdf', title: 'sdf' },
    }),
    [start, end, plan],
  );

  return (
    <Scroll>
      <Wrapper>
        <Horizontal>
          <FlexDateSelector
            label="Start date"
            selected={start}
            onSelect={setStart}
          />
          <DateSelector
            label="End date"
            selected={end}
            onSelect={setEnd}
          />
        </Horizontal>
        <Row>
          <Button onPress={runPlanning} title="Plan" />
        </Row>
        {!!result && (
          <>
            <CalendarStrip
            />
            {Object.entries(result.days).map(([key, day]) => (
                <PlanDay day={day} />
            ))}
          </>
        )}
      </Wrapper>
    </Scroll>
  );
}

export { PlanScreen }
