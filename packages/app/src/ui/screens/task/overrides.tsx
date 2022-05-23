import { useAsyncCallback } from "#/features/async";
import { Time, timeUtils, UserLocation } from "#/features/data";
import { useLocations } from "#/features/location";
import { useTasks } from "#/features/tasks";
import { Button, Cell, Popup, Row } from "@morten-olsen/ui/components/base"
import { Checkbox, TextInput, TimeInput, OptionalSelector } from "@morten-olsen/ui/components/form";
import { RootNavigationProp, TaskAddScreenRouteProp } from "#/ui/router";
import { Overline } from "@morten-olsen/ui/typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { Override, useClearTaskOverride, useOverrides, useSetTaskOverride } from "#/features/overrides";

const SideBySide = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const dayNames = [
  'Monday',
  'Tuesday',
  'Wednsday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const days = new Array(7).fill(undefined).map((_, i) => ({
  id: i,
  name: dayNames[i],
}))

const OverrideSetScreen: React.FC = () => {
  const { params: { id }} = useRoute<TaskAddScreenRouteProp>();
  const { navigate, goBack } = useNavigation<RootNavigationProp>();
  const [setOverride] = useSetTaskOverride()
  const [clearOverrides] = useClearTaskOverride();
  const overrides = useOverrides();
  const tasks = useTasks();
  const task = useMemo(
    () => tasks.find(t => t.id === id)!,
    [tasks, id],
  );

  const locations = useLocations();
  const [maxStart, setMaxStart] = useState<Time>();
  const [minStart, setMinStart] = useState<Time>();
  const [duration, setDuration] = useState('');
  const [hasLocation, setHasLocation] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<UserLocation[]>([]);

  useEffect(
    () => {
      if (!id) {
        return;
      }
      const current = overrides.tasks[id];
      if (!current) {
        return;
      }
      setMinStart(current.startMin);
      setMaxStart(current.startMax);
      setDuration(current.duration?.toString() || '');
      setHasLocation(!!current.locations);
      setSelectedLocations(current.locations || []);
    },
    [id],
  )

  const [save] = useAsyncCallback(
    async () => {
      const override: Override = {
        startMin: minStart,
        startMax: maxStart,
        duration: duration ? parseInt(duration) : undefined,
        locations: hasLocation ? selectedLocations: undefined,
      };
      await setOverride(id, override);
      navigate('main');
    },
    [
      id,
      maxStart,
      minStart,
      duration,
      hasLocation,
      selectedLocations,
    ],
  );

  const [clear] = useAsyncCallback(
    async () => {
      await clearOverrides(id);
      navigate('main');
    },
    [id, clearOverrides],
  );

  if (!task) {
    return <></>;
  }

  return (
    <Popup title={`Overrides for ${task.title}`} onClose={goBack}>
      <SideBySide>
        <TimeInput
          flex={1}
          placeholder={task.startTime.min ? timeUtils.timeToString(task.startTime.min) : undefined}
          label="Min start"
          value={minStart}
          onChange={setMinStart}
        />
        <TimeInput
          flex={1}
          placeholder={task.startTime.max ? timeUtils.timeToString(task.startTime.max) : undefined}
          label="Max start"
          value={maxStart}
          onChange={setMaxStart}
        />
      </SideBySide>
      <TextInput
        label="Duration"
        value={duration}
        onChangeText={setDuration}
        right={<Cell><Overline>min</Overline></Cell>}
      />
      <OptionalSelector
        label="Location"
        enabled={hasLocation}
        items={locations}
        selected={selectedLocations}
        onChange={setSelectedLocations}
        render={location => ({
          title: location.title,
        })}
        getKey={location => location.id}
        setEnabled={setHasLocation}
        disabledText="Anywhere"
        enabledText="Specific location"
      />
      <Checkbox label="Required" />
      <TextInput
        label="Priority"
        placeholder="5"
      />
      <Row>
        <SideBySide>
          <Button onPress={clear} title="Clear" type="destructive" />
          <Button onPress={save} title="Save" type="primary" />
        </SideBySide>
      </Row>
    </Popup>
  );
};

export { OverrideSetScreen };
