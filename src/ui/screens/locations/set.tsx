import { useLocations, useSetLocation } from "#/features/location";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Popup, Button, TextInput } from "#/ui/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from 'nanoid';

const LocationSetScreen: React.FC = () => {
  const { params = {} } = useRoute() as any;
  const id = useMemo(
    () => params.id || nanoid(),
    [params.id],
  )
  const locations = useLocations();
  const { navigate, goBack } = useNavigation();
  const [title, setTitle] = useState('');
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const set = useSetLocation();  

  useEffect(
    () => {
      const current = locations[id];
      if (!current) {
        return;
      }
      setTitle(current.title);
      setLng(current.location?.longitute.toString() || '');
      setLat(current.location?.latitude.toString() || '');
    },
    [locations, id],
  )

  const save = useCallback(
    () => {
      const lngParsed = parseFloat(lng);
      const latParsed = parseFloat(lat);
      set({
        id,
        title,
        location: {
          longitute: lngParsed,
          latitude: latParsed,
        },
      });
      navigate('main');
    },
    [title, lng, lat, id],
  )

  return (
    <Popup onClose={goBack}>
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" />
      <TextInput value={lng} onChangeText={setLng} placeholder="Longitute" />
      <TextInput value={lat} onChangeText={setLat} placeholder="Latitude" />
      <Button title="Save" onPress={save} />
    </Popup>
  )
}

export { LocationSetScreen };

