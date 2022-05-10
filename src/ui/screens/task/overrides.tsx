import { useAsyncCallback } from "#/features/async";
import { nanoid } from 'nanoid';
import { Task, TaskType, Time, timeUtils, UserLocation } from "#/features/data";
import { useLocations } from "#/features/location";
import { useSetTask, useTasks } from "#/features/tasks";
import { Button, Cell, Group, Popup, Row } from "#/ui/components/base"
import { Checkbok, TextInput, TimeInput, OptionalSelector } from "#/ui/components/form";
import { RootNavigationProp, TaskAddScreenRouteProp } from "#/ui/router";
import { Overline } from "#/ui/typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { Override, useClearTaskOverride, useOverrides, useSetOverride, useSetTaskOverride } from "#/features/overrides";

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
  const [hasDays, setHasDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState<typeof days>([]);

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
      hasDays,
      selectedDays,
    ],
  );

  const [clear] = useAsyncCallback(
    async () => {
      await clearOverrides(id);
      navigate('main');
    },
    [id, clearOverrides],
  );

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
      <OptionalSelector
        label="Days"
        enabled={hasDays}
        items={days}
        selected={selectedDays}
        onChange={setSelectedDays}
        render={day=> ({
          title: day.name
        })}
        getKey={day => day.id.toString()}
        setEnabled={setHasDays}
        disabledText="Any day"
        enabledText="Specific days"
      />
      <SideBySide>
        <Checkbok label="Required" flex={1} />
        <TextInput label="Priority" flex={1} />
      </SideBySide>
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
