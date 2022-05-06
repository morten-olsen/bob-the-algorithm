import { useLocations, useSetLocation } from "#/features/location";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Popup, Button, Checkbok, TextInput } from "#/ui/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from 'nanoid';
import { useAgendaContext, useSetAgendaContext } from "#/features/agenda-context";
import { format } from "date-fns";

const AgendaContextSetScreen: React.FC = () => {
  const { params = {} } = useRoute() as any;
  const id = useMemo(
    () => params.id || nanoid(),
    [params.id],
  )
  const contexts = useAgendaContext();
  const { navigate, goBack } = useNavigation();
  const locations = useLocations();
  const [location, setLocation] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [startMin, setStartMin] = useState('');
  const [startMax, setStartMax] = useState('');
  const [duration, setDuration] = useState('');
  const [count, setCount] = useState('1');
  const [set] = useSetAgendaContext();  

  useEffect(
    () => {
      const current = contexts[id];
      if (!current) {
        return;
      }
      const name = current.locations?.map(l => l.title).join(',') || '';
      if (current.startMin) {
        setStartMin(format(current.startMin, 'HH:mm'));
      }
      if (current.startMax) {
        setStartMax(format(current.startMax, 'HH:mm'));
      }
      if (current.duration) {
        setDuration((current.duration / 1000 / 60).toString());
      }
      if (current.count) {
        setCount(current.count.toString());
      }
      setLocation(name);
      setEnabled(current.enabled);
    },
    [contexts, id],
  )

  const save = useCallback(
    () => {
      const name = location.split(',').map(a => Object.values(locations).find(i => i.title.toLowerCase() === a.trim().toLowerCase())).filter(Boolean);
      set(id, {
        enabled,
        locations: name as any,
        count: parseInt(count),
        startMin: startMin ? new Date(`2020-01-01T${startMin}:00`) : undefined,
        startMax: startMax ? new Date(`2020-01-01T${startMax}:00`) : undefined,
        duration: duration ? parseInt(duration) * 1000 * 60 : undefined,
      });
      navigate('main');
    },
    [set, id, enabled, location, count, locations, startMin, startMax, duration],
  )

  return (
    <Popup onClose={goBack}>
      <TextInput value={location} onChangeText={setLocation} placeholder="Locations" />
      <TextInput value={startMin} onChangeText={setStartMin} placeholder="Start min" />
      <TextInput value={startMax} onChangeText={setStartMax} placeholder="Start max" />
      <TextInput value={duration} onChangeText={setDuration} placeholder="Duration" />
      <TextInput value={count} onChangeText={setCount} placeholder="Count" />
      <Checkbok label="Enabled" value={enabled} onChange={setEnabled} />
      <Button title="Save" onPress={save} />
    </Popup>
  )
}

export { AgendaContextSetScreen };

