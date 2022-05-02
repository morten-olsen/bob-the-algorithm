import { useRemoveRoutine, useRoutines } from "#/features/routines";
import { Button, Cell } from "#/ui/components";
import { Row } from "#/ui/components/row/row";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`

`;

const RoutinesListScreen: React.FC = () => {
  const routines  = useRoutines();
  const removeRoutine = useRemoveRoutine();
  const { navigate } = useNavigation();
  return (
    <Wrapper>
      <Button icon="plus-circle" onPress={() => navigate('routineSet')} />
      <FlatList
        data={Object.values(routines)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Row
            title={item.title}
            subtitle={item.location?.map(l => l.title).join(', ')}
            onPress={() => {
              navigate('routineSet', { id: item.id });
            }}
            right={
              <Cell>
                <Button icon="trash" type="destructive" onPress={() => removeRoutine(item.id)} />
              </Cell>
            }
          />
        )}
      />
    </Wrapper>
  );
}

export { RoutinesListScreen };
