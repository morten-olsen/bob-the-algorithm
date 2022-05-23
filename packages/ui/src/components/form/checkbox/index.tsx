import { Row, RowProps, Cell, Icon } from "../../base"

type CheckboxProps = RowProps & {
  value?: boolean;
  label: string;
  onChangeValue: (value: boolean) => void;
}

const Checkbox = ({
  value,
  label,
  onChangeValue,
  ...rowProps
}: CheckboxProps) => {
  return (
    <Row
      {...rowProps}
      description={label}
      onPress={() => onChangeValue(!value)}
      left={(
        <>
          {rowProps.left}
          <Cell>
            <Icon
              name={value ? 'check-square' : 'square'}
              color={value ? 'primary' : 'input'}
            />
          </Cell>
        </>
      )}
    />
  );
};

export { Checkbox };
