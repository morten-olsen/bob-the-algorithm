import { useLocations, useRemoveLocation } from "#/features/location"
import { List, Page } from "#/ui/components/base";
import { useNavigation } from "@react-navigation/native";

const LocationListScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const locations = useLocations();
  const removeLocation = useRemoveLocation();

  return (
    <Page>
      <List
        items={locations}
        remove={l => removeLocation(l.id)}
        getKey={l => l.id}
        add={() => navigate('set-location', {})}
        render={(item) => ({
          title: item.title,
        })}
      />
    </Page>
  );
}

export { LocationListScreen };
