import { useNavigation, useRoute } from '@react-navigation/native';
import { Popup, Button, Checkbok, TextInput } from "#/ui/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from 'nanoid';
import { useRoutines, useSetRoutine } from '#/features/routines';
import { format } from 'date-fns';
import { useLocations } from '#/features/location';

const RoutineSetScreen: React.FC = () => {
  const { params = {} } = useRoute() as any;
  const id = useMemo(
    () => params.id || nanoid(),
    [params.id],
  )
  const routines = useRoutines();
  const { navigate, goBack } = useNavigation();
  const [title, setTitle] = useState('');
  const [startMin, setStartMin] = useState('');
  const [startMax, setStartMax] = useState('');
  const [duration, setDuration] = useState('');
  const locations = useLocations();
  const [required, setRequired] = useState(false);
  const [location, setLocation] = useState('');
  const set = useSetRoutine();  

  useEffect(
    () => {
      const current = routines.find(r => r.id === id);
      if (!current) {
        return;
      }
      setTitle(current.title);
      if (current.start.min) {
        setStartMin(format(current.start.min, 'HH:mm'));
      }
      if (current.start.max) {
        setStartMax(format(current.start.max, 'HH:mm'));
      }
      if (current.duration) {
        setDuration((current.duration / 1000 / 60).toString());
      }
      setRequired(!!current.required);
      const name = current.location?.map(l => l.title).join(',') || '';
      setLocation(name);
    },
    [routines, id],
  )

  const save = useCallback(
    () => {
      const name = location.split(',').map(a => Object.values(locations).find(i => i.title.toLowerCase() === a.trim().toLowerCase())).filter(Boolean);
      set({
        id,
        title,
        priority: 50,
        required: required,
        location: name.length > 0 ? name as any : undefined,
        start: {
          min: new Date(`2020-01-01T${startMin}:00`),
          max: new Date(`2020-01-01T${startMax}:00`),
        },
        duration: parseInt(duration) * 1000 * 60
      });
      navigate('main');
    },
    [title, startMin, startMax, duration, location, required],
  )

  return (
    <Popup onClose={goBack}>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput value={startMin} onChangeText={setStartMin} placeholder="Start min" />
      <TextInput value={startMax} onChangeText={setStartMax} placeholder="Start max" />
      <TextInput value={duration} onChangeText={setDuration} placeholder="Duration" />
      <TextInput value={location} onChangeText={setLocation} placeholder="Location" />
      <Checkbok label="Required" value={required} onChange={setRequired} />
      <Button title="Save" onPress={save} />
    </Popup>
  )
}

export { RoutineSetScreen };

