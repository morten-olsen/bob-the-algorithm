
import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { CalendarEntry, CalendarStrip, Row } from '..';
import { FormLayout } from '../components';

export const Agenda = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  return (
    <FormLayout>
      <CalendarStrip
        selected={selectedDate}
        onSelect={setSelectedDate}
      />
      <Row>
        <CalendarEntry
          start={new Date(2020, 0, 1, 9, 0, 0)}
          end={new Date(2020, 0, 1, 11, 0, 0)}
          checked={true}
          title="Ride mountain bike"
          location="Mountain bike park"
        />
      </Row>
      <Row>
        <CalendarEntry
          start={new Date(2020, 0, 1, 12, 0, 0)}
          end={new Date(2020, 0, 1, 12, 30, 0)}
          checked={false}
          title="Pick up kids"
          location="The playground"
        />
      </Row>
      <Row>
        <CalendarEntry
          start={new Date(2020, 0, 1, 19, 0, 0)}
          end={new Date(2020, 0, 1, 19, 30, 0)}
          title="Read a book"
          location="Home"
        />
      </Row>
    </FormLayout>
  )
}

export default {
  title: 'Examples/Calendar',
  component: Agenda,
} as ComponentMeta<typeof Agenda>;


