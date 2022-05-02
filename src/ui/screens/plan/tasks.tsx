import { useAgendaContext, useSetAgendaContext, useTasksWithContext } from "#/features/agenda-context";
import { set } from 'date-fns';
import chroma from 'chroma-js';
import stringToColor from 'string-to-color';
import { Button, Cell, Icon } from "#/ui/components";
import { Row } from "#/ui/components";
import { AgendaItemView } from "#/ui/components/specialized/plan/agenda-item";
import { Body1 } from "#/ui/typography";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';
import styled, { useTheme } from "styled-components/native";
import { useDate, useSetDate } from "#/features/calendar";

const Wrapper = styled.View`

`;

const Strip = () => {
  const date = useDate();
  const theme = useTheme();
  const setDate = useSetDate();
  const selected = useMemo(
    () => [{
      date,
      lines: [{ color: theme.colors.icon }],
    }],
    [date],
  );
  return (
    <CalendarStrip
      markedDates={selected}
      style={{
        height: 150,
        paddingTop: 60,
        paddingBottom: 10,
        backgroundColor: theme.colors.background,
      }}
      calendarColor={'#fff'}
      selectedDate={date}
      startingDate={date}
      onDateSelected={(date) => {
        setDate(set(date.toDate(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }));
      }}
      shouldAllowFontScaling={false}
      iconContainer={{flex: 0.1}}
      calendarHeaderStyle={{
        color: theme.colors.text,
        fontSize: theme.font.baseSize * 1.2,
      }}
      highlightDateNameStyle={{
        color: theme.colors.icon,
        fontSize: theme.font.baseSize * 0.6,
      }}
      iconLeftStyle={{
        tintColor: theme.colors.text,
      }}
      iconRightStyle={{
        tintColor: theme.colors.text,
      }}
      highlightDateNumberStyle={{
        color: theme.colors.icon,
        fontSize: theme.font.baseSize * 1.2,
      }}
      dateNumberStyle={{
        color: theme.colors.text,
        fontSize: theme.font.baseSize * 1.2,
      }}
      dateNameStyle={{
        color: theme.colors.text,
        fontSize: theme.font.baseSize * 0.6,
      }}
    />
  );
}

const TaskListScreen: React.FC = () => {
  const tasks = useTasksWithContext();
  const { navigate } = useNavigation();
  const contexts = useAgendaContext();
  const [set] = useSetAgendaContext();

  const toggle = useCallback(
    (task: any) => {
      const context = contexts[task.id] || {};
      set(task.id, {
        ...context,
        enabled: !task.enabled,
      })
    },
    [set],
  )
  return (
    <Wrapper>
      <FlatList
        ListHeaderComponent={Strip}
        data={Object.values(tasks)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Row
            onPress={() => {
              toggle(item);
              //navigate('agendaContextSet', { id: item.id });
            }}
            opacity={item.enabled ? undefined : 0.3}
            right={(
              <Button
                icon="edit"
                onPress={() => {
                  navigate('agendaContextSet', { id: item.id });
                }}
              />
            )}
          >
            <AgendaItemView
              item={{
                height: 1000 * 60 * 30,
                body: <Body1>{item.name}</Body1>,
                start: item.start.min,
                color: chroma(stringToColor(item.name)).luminance(0.7).saturate(1).brighten(0.6).hex(),
                end: new Date(item.start.max.getTime() + item.duration.min),
              }}
            />
          </Row>
        )}
      />
    </Wrapper>
  );
}

export { TaskListScreen };
