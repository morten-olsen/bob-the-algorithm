import { Strategies, usePlanOptions, useSetPlanOptions } from "#/features/planner"
import { Selector } from "#/ui/components/form/selector";
import { Popup } from "#/ui/components";
import { useNavigation } from "@react-navigation/native";

const items = [{
  display: 'First valid',
  value: Strategies.firstValid,
}, {
  display: 'First complete',
  value: Strategies.firstComplet,
}, {
  display: 'All valid',
  value: Strategies.allValid,
}, {
  display: 'All',
  value: Strategies.all,
}];

const PlanSettingsScreen: React.FC = () => {
  const options = usePlanOptions();
  const setOptions = useSetPlanOptions();
  const { goBack } = useNavigation();

  return (
    <Popup onClose={goBack}>
      <Selector
        label="Strategy"
        items={items}
        getId={i => i}
        selected={options.strategy}
        setSelected={(strategy) => {
          setOptions({ strategy: strategy || Strategies.firstComplet });
        }}
      />
    </Popup>
  );
}

export { PlanSettingsScreen };
