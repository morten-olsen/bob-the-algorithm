import { TaskType } from "#/features/data";
import { Page, Row } from "#/ui/components/base";
import { MoreScreenNavigationProps } from "#/ui/router";
import { useNavigation } from "@react-navigation/native";

const MoreScreen: React.FC = () => {
  const { navigate } = useNavigation<MoreScreenNavigationProps>();

  return (
    <Page>
      <Row
        title="Calendars"
      />
      <Row
        title="Locations"
        onPress={() => navigate('locations')}
      />
      <Row
        title="Routines"
        onPress={() => navigate('tasks', { type: TaskType.routine })}
      />
      <Row
        title="Goals"
        onPress={() => navigate('tasks', { type: TaskType.goal })}
      />
    </Page>
  );
}

export { MoreScreen };
