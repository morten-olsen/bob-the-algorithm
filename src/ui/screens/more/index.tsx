import { Page, Row } from "#/ui/components/base";
import { useNavigation } from "@react-navigation/native";

const MoreScreen: React.FC = () => {
  const { navigate } = useNavigation();

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
        onPress={() => navigate('routines')}
      />
      <Row
        title="Goals"
        onPress={() => navigate('goals')}
      />
    </Page>
  );
}

export { MoreScreen };
