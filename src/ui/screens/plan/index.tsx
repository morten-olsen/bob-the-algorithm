import { Day, dayUtils, useDate } from "#/features/day"
import { usePlan } from "#/features/planner";
import { Button } from "#/ui/components/base";
import DateInput from "#/ui/components/form/date";
import { PlanDay } from "#/ui/components/plan";
import { Body1 } from "#/ui/typography";
import { useCallback, useState } from "react";
import styled from "styled-components/native";

const Scroll = styled.ScrollView`
 flex: 1;
`
const Wrapper = styled.View`
  margin: 60px 0;
`

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
        <DateInput
          label="Start date"
          selected={start}
          onSelect={setStart}
        />
        <DateInput
          label="End date"
          selected={end}
          onSelect={setEnd}
        />
        <Button onPress={runPlanning} title="Plan" />
        {!!result && (
          <>
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
