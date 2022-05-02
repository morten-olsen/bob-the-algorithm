import { Row } from "../../row"

type CheckboxProps = {
  value?: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

const Checkbok: React.FC<CheckboxProps> = ({
  value,
  label,
  onChange,
}) => (
  <Row
    overline={label}
    title={value?  'Yes' : 'No'}
    onPress={() => onChange(!value)}
  />
);

export { Checkbok };
