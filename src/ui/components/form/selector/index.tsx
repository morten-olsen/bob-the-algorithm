import { cmyk } from "chroma-js";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Modal } from "../../modal";
import { Row } from "../../row";

type SelectorProps<T> = {
  label: string;
  items: {
    display: ReactNode;
    value: T;
  }[];
  getId: (item: T) => string;
  selected?: T;
  setSelected: (item?: T) => void;
}

function Selector<T = any>({
  items,
  label,
  getId,
  selected,
  setSelected,
}: SelectorProps<T>) {
  const [visible, setVisible] = useState(false);
  const selectedItem = useMemo(
    () => selected ? items.find(i => getId(i.value) === getId(selected)) : undefined,
    [selected, items],
  );
  const select = useCallback(
    (item: T) => {
      setSelected(item);
      setVisible(false);
    },
    [setSelected, setVisible],
  );
  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        {items.map((item) => (
          <Row
            key={getId(item.value)}
            onPress={() => select(item.value)}
            title={item.display}
          />
        ))}
      </Modal>
      <Row
        overline={label}
        onPress={() => setVisible(true)}
        title={selectedItem?.display || 'Select'}
      />
    </>
  )
}

export { Selector };
