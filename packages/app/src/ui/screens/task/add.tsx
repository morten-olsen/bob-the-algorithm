import { useAsyncCallback } from "#/features/async";
import { nanoid } from 'nanoid';
import { Task, TaskType, Time, UserLocation } from "#/features/data";
import { useLocations } from "#/features/location";
import { useSetTask, useTasks } from "#/features/tasks";
import { Button, Cell, Group, Popup, Row } from "@morten-olsen/ui/components/base"
import { Checkbox, TextInput, TimeInput, OptionalSelector } from "@morten-olsen/ui/components/form";
import { RootNavigationProp, TaskAddScreenRouteProp } from "#/ui/router";
import { Overline } from "@morten-olsen/ui/typography";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styled from "styled-components/native";

const SideBySide = styled.View`
  flex-direction: row;
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

const TaskAddScreen: React.FC = () => {
  const { params: { type, id }} = useRoute<TaskAddScreenRouteProp>();
  const { navigate, goBack } = useNavigation<RootNavigationProp>();
  const [currentId, setCurrentId] = useState(id || nanoid());
  const [setTask] = useSetTask();
  const tasks = useTasks();
  const [currentType, setCurrentType] = useState<TaskType>(type);

  const locations = useLocations();
  const [title, setTitle] = useState('');
  const [maxStart, setMaxStart] = useState<Time>();
  const [minStart, setMinStart] = useState<Time>();
  const [duration, setDuration] = useState('');
  const [hasLocation, setHasLocation] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<UserLocation[]>([]);
  const [hasDays, setHasDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState<typeof days>([]);
  const [required, setRequired] = useState(false);

  useEffect(
    () => {
      if (!id) {
        return;
      }
      const current = tasks.find(t => t.id === id);
      if (!current) {
        return;
      }
      setTitle(current.title);
      setMaxStart(current.startTime.max);
      setMinStart(current.startTime.min);
      setDuration(current.duration?.toString() || '');
      setHasLocation(!!current.locations);
      setSelectedLocations(current.locations || []);
      setCurrentType(current.type || TaskType.goal);
      setRequired(current.required);
      if (current.type === TaskType.goal || current.type === TaskType.routine) {
        setHasDays(!!current.days);
      }
    },
    [id],
  )

  const [save] = useAsyncCallback(
    async () => {
      const task: Partial<Task> = {
        id: currentId,
        title,
        type: currentType,
        required,
        startTime: {
          max: maxStart!,
          min: minStart!,
        },
        duration: parseInt(duration),
        locations: hasLocation ? selectedLocations: undefined,
      };
      if (task.type === TaskType.goal || task.type === TaskType.routine) {
        task.days = hasDays
          ? new Array(7).fill(undefined).map((_, i) => !!selectedDays.find(d => d.id === i))
          : undefined;
      }
      await setTask(task as Task);
      navigate('main');
    },
    [
      title,
      currentId,
      maxStart,
      minStart,
      duration,
      hasLocation,
      selectedLocations,
      hasDays,
      selectedDays,
      required,
    ],
  );

  return (
    <Popup title={type ? `Add ${type}` : `Update ${title}`} onClose={goBack}>
      <Group title="Basic">
        <TextInput label="Title" value={title} onChangeText={setTitle} />
        <SideBySide>
          <TimeInput flex={1} label="Min start" value={minStart} onChange={setMinStart} />
          <TimeInput flex={1} label="Max start" value={maxStart} onChange={setMaxStart} />
        </SideBySide>
        <TextInput
          label="Duration"
          value={duration}
          onChangeText={setDuration}
          right={<Cell><Overline>min</Overline></Cell>}
        />
      </Group>
      <Group title="Optional" startHidden>
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
          <Checkbox label="Required" onChange={setRequired} value={required} />
        {type === TaskType.goal && (
          <SideBySide>
            <TextInput label="Start" flex={1} />
            <TextInput label="Deadline" flex={1} />
          </SideBySide>
        )}
      </Group>
      <Row>
        <Button onPress={save} title="Save" type="primary" />
      </Row>
    </Popup>
  );
};

export { TaskAddScreen };
