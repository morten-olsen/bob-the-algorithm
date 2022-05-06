import { useCurrentLocation } from "#/features/location"
import { usePlan } from "#/features/planner"
import { Button, Cell, Page, Row, TextInput } from "#/ui/components";
import { DayView } from "#/ui/components/specialized/plan/day";
import { Body1 } from "#/ui/typography";
import { useCallback, useMemo, useState } from "react";
import { useCommit, useDate } from "#/features/calendar";
import { format, formatDistance, formatDistanceToNow, set } from "date-fns";
import styled from "styled-components/native";
import { Status } from "#/features/planner/algorithm/build-graph";
import { useNavigation } from "@react-navigation/native";

const Wrapper = styled.ScrollView`

`;

const getStats = (status: Status) => {
  if (status.current === 'running') {
    const runTime = formatDistanceToNow(status.start, { includeSeconds: true })
    return `calulated ${status.nodes} nodes in ${runTime} using ${status.strategy}`;
  }
  const runTime = formatDistance(status.start, status.end, { includeSeconds: true })
  return `calulated ${status.nodes} nodes in ${runTime} using ${status.strategy}`;
};

const PlanDayScreen: React.FC = () => {
  const date = useDate();
  const [location] = useCurrentLocation();
  const [startTime, setStartTime] = useState('06:00');
  const [commit] = useCommit();
  const { navigate } = useNavigation();
  const current = useMemo(
    () => location || {
      id: 'unknown',
      title: 'Unknown',
    },
    [location]
  )
  const [plan, options] = usePlan({
    location: current,
  })
  const update = useCallback(
    () => {
      const target = new Date(`2000-01-01T${startTime}:00`)
      const corrected = set(date, {
        hours: target.getHours(),
        minutes: target.getMinutes(),
      })
      plan(corrected);
    },
    [date, plan, startTime],
  )
  return (
    <Wrapper>
      <Page>
        <TextInput
          overline="Start time"
          value={startTime}
          onChangeText={setStartTime}
          right={(
            <>
              <Cell>
                {!options.error && options.status && options.status.current === 'running' ? (
                  <Button type="destructive" onPress={options.status.cancel} icon="x" />
                ) : (
                  <Button icon="play" onPress={update} />
                )}
              </Cell>
              {!!options.result?.agenda && (
                <Cell>
                  <Button onPress={() => commit(options.result?.agenda || [])} icon="download" />
                </Cell>
              )}
              <Cell>
                <Button onPress={() => navigate('planSettings')} icon="settings" />
              </Cell>
            </>
          )}
        />
        {!!options.error && (
          <Row title={JSON.stringify(options.error)} />
        )}
        {options.status?.current === 'running' && (
          <Row
            title={getStats(options.status)}
          />
        )}
        {!!options.result && options.status?.current === 'completed' && (
          <Row title={format(date, 'EEEE - do MMMM')} overline={getStats(options.status)}>

            {options.result.impossible && options.result.impossible.length > 0 && <Body1>Impossible: {options.result.impossible.map(i => i.name).join(', ')}</Body1>}
            <DayView plan={options.result.agenda} />
          </Row>
        )}
      </Page>
    </Wrapper>
      
  )
}

export { PlanDayScreen };
