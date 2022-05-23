import { useCallback, useMemo, useState } from "react";
import styled from "styled-components/native";
import { Modal } from "../../base/modal";
import { Row, RowProps } from "../../base/row";

type SelectorProps<T> = {
  label: string;
  items: T[];
  render: (item: T) => RowProps;
  getId: (item: T) => string;
  selected?: T;
  onChangeSelected: (item?: T) => void;
}

const Wrapper = styled(Row)`
  padding: ${({ theme }) => theme.margins.small}px;
  border-color: ${({ theme }) => theme.colors.input};
  border-width: 2px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
`;

function Selector<T = any>({
  items,
  render,
  label,
  getId,
  selected,
  onChangeSelected,
}: SelectorProps<T>) {
  const [visible, setVisible] = useState(false);
  const selectedItem = useMemo(
    () => selected ? items.find(i => getId(i) === getId(selected)) : undefined,
    [selected, items],
  );
  const select = useCallback(
    (item: T) => {
      onChangeSelected(item);
      setVisible(false);
    },
    [onChangeSelected, setVisible],
  );
  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        {items.map((item) => (
          <Row
            key={getId(item)}
            {...render(item)}
            onPress={() => select(item)}
          />
        ))}
      </Modal>
      <Row>
        <Wrapper
          overline={label}
          title={'Select'}
          {...(selectedItem ? render(selectedItem) : {})}
          onPress={() => setVisible(true)}
        />
      </Row>
    </>
  )
}

export { Selector };
