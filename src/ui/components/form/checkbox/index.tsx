import { Row, RowProps } from "#/ui/components/base"

type CheckboxProps = RowProps & {
  value?: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

const Checkbok: React.FC<CheckboxProps> = ({
  value,
  label,
  onChange,
  ...rowProps
}) => (
  <Row
    {...rowProps}
    overline={label}
    title={value?  'Yes' : 'No'}
    onPress={() => onChange(!value)}
  />
);

export { Checkbok };
