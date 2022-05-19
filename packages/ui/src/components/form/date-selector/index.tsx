import React, { useState } from 'react';
import { Calendar } from '../../date';
import styled, { useTheme } from 'styled-components/native';
import { Row, Button, Modal, RowProps } from '../../base';

type Day = {
  year: number;
  month: number;
  date: number;
}

const Wrapper = styled(Row)`
  padding: 0;
  border-color: ${({ theme }) => theme.colors.input};
  border-width: 0.5px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
`;

const toId = (day: Day) => [
  day.year.toString().padStart(4, '0'),
  day.month.toString().padStart(2, '0'),
  day.date.toString().padStart(2, '0'),
].join('-');

type Props = RowProps & {
  label: string;
  selected?: Day;
} & ({
  allowClear: true,
  onSelect: (input?: Day) => void;
} | {
  allowClear?: false,
  onSelect: (input: Day) => void;
})

const DateSelector: React.FC<Props> = ({ label, selected, onSelect, allowClear, ...rowProps }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const marked: any = {};
  if (selected) {
    marked[toId(selected)] = {
      selected: true,
      marked: true,
      selectedColor: theme.colors.primary,
    };
  }

  return (
    <Row>
      <Wrapper
        {...rowProps}
        overline={label}
        onPress={() => setVisible(true)}
        title={selected ? toId(selected) : 'Not set'}
      >
        <Modal visible={visible} onClose={() => setVisible(false)}>
            {visible && (<Calendar
              hideArrows={false}
              renderArrow={direction => <div />}
              enableSwipeMonths={true}
              onDayPress={({ year, month, day }) => {
                onSelect({ year, month, date: day });
                setVisible(false);
              }}
              current={selected ? toId(selected) : undefined}
            />)}
            {allowClear && (
              <Row>
                <Button
                  title="Clear"
                  onPress={() => {
                    onSelect(undefined as any);
                    setVisible(false);
                  }}
                />
              </Row>
            )}
        </Modal>
      </Wrapper>
    </Row>
  );
};

export { DateSelector };
