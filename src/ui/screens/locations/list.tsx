import { useLocations, useRemoveLocation } from "#/features/location"
import { Button, Cell } from "#/ui/components";
import { Row } from "#/ui/components/row/row";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`

`;

const Name = styled.Text`

`;

const LocationListScreen: React.FC = () => {
  const locations  = useLocations();
  const removeLocation = useRemoveLocation();
  const { navigate } = useNavigation();
  return (
    <Wrapper>
      <Button icon="plus-circle" onPress={() => navigate('locationSet')} />
      <FlatList
        data={Object.values(locations)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Row
            title={item.title}
            onPress={() => {
              navigate('locationSet', { id: item.id });
            }}
            right={
              <Cell>
                <Button type="destructive" icon="trash" onPress={() => removeLocation(item.id)} />
              </Cell>
            }
          />
        )}
      />
    </Wrapper>
  );
}

export { LocationListScreen };
