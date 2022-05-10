import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'styled-components/native';
import { Row, Button, Modal } from '#/ui/components/base';
import { Day, dayUtils } from '#/features/day';

type Props = {
  label: string;
  selected?: Day;
} & ({
  allowClear: true,
  onSelect: (input?: Day) => void;
} | {
  allowClear?: false,
  onSelect: (input: Day) => void;
})

const DateInput: React.FC<Props> = ({ label, selected, onSelect, allowClear }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const marked: any = {};
  if (selected) {
    marked[dayUtils.toId(selected)] = {
      selected: true,
      marked: true,
      selectedColor: theme.colors.primary,
    };
  }

  return (
    <Row
      overline={label}
      onPress={() => setVisible(true)}
      title={selected ? dayUtils.toId(selected) : 'Not set'}
    >
      <Modal visible={visible} onClose={() => setVisible(false)}>
          {visible && (<Calendar
            showWeekNumbers={true}
            markedDates={marked}
            hideArrows={false}
            enableSwipeMonths={true}
            onDayPress={({ year, month, day }) => {
              onSelect({ year, month, date: day });
              setVisible(false);
            }}
            current={selected ? dayUtils.toId(selected) : undefined}
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
    </Row>
  );
};

export default DateInput;
