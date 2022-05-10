import { useLocations, useRemoveLocation } from "#/features/location"
import { Button, Cell, Icon, Page, Row } from "#/ui/components/base";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

const LocationListScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const locations = useLocations();
  const removeLocation = useRemoveLocation();

  return (
    <Page>
      <Button title="Add" onPress={() => navigate('set-location', {})}/>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Row
            title={item.title}
            right={(
              <Cell onPress={() => removeLocation(item.id)}>
                <Icon
                  name="trash"
                  color="destructive"
                />
              </Cell>
            )}
          />
        )}
      />
    </Page>
  );
}

export { LocationListScreen };
