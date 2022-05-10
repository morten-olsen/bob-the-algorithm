import { nanoid } from 'nanoid';
import { useAsyncCallback } from "#/features/async";
import { useLocations, useSetLocation } from "#/features/location"
import { Button, Popup, Row } from "#/ui/components/base";
import { TextInput } from "#/ui/components/form";
import { LocationSetScreenRouteProp, RootNavigationProp } from "#/ui/router";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

const LocationSetScreen: React.FC = () => {
  const {
    params: { id = nanoid() },
  } = useRoute<LocationSetScreenRouteProp>();
  const { navigate } = useNavigation<RootNavigationProp>();
  const locations = useLocations();
  const [title, setTitle] = useState('');
  const setLocation = useSetLocation();

  useEffect(
    () => {
      const current = locations.find(l => l.id === id);
      if (!current) {
        return;
      }
      setTitle(current.title);
    },
    [id, locations],
  )

  const [save] = useAsyncCallback(
    async () => {
      await setLocation({
        id,
        title,
        position: { longitute: 0, latitude: 0 },
      });
      navigate('main');
    },
    [id, title],
  );

  return (
    <Popup title="Edit location">
      <TextInput
        label="What should it call the location?"
        value={title}
        onChangeText={setTitle}
      />
      <Row>
        <Button title="Save" onPress={save} />
      </Row>
    </Popup>
  );
};

export { LocationSetScreen };
