import { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { LocationListScreen } from '#/ui/screens/locations/list';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RoutinesListScreen } from '../screens/routines/list';
import { LocationSetScreen } from '../screens/locations/set';
import { PlanDayScreen } from '../screens/plan/day';
import { CalendarSelectScreen } from '../screens/calendars/select';
import { RoutineSetScreen } from '../screens/routines/set';
import { TaskListScreen } from '../screens/plan/tasks';
import { AgendaContextSetScreen } from '../screens/plan/set';
import { Icon } from '../components';
import { PlanSettingsScreen } from '../screens/plan/settings';

const MainTabsNvaigator = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  const theme = useTheme();
  return (
    <MainTabsNvaigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <MainTabsNvaigator.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Prepare',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="check-square" />,
        }}
        name="tasks"
        component={TaskListScreen}
      />
      <MainTabsNvaigator.Screen
        name="plan"
        component={PlanDayScreen}
        options={{
          tabBarLabel: 'Plan',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="calendar" />,
        }}
      />
      <MainTabsNvaigator.Screen
        name="locations"
        component={LocationListScreen}
        options={{
          tabBarLabel: 'Locations',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="map-pin" />,
        }}
      />
      <MainTabsNvaigator.Screen
        name="routines"
        component={RoutinesListScreen}
        options={{
          tabBarLabel: 'Routines',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="activity" />,
        }}
      />
      <MainTabsNvaigator.Screen
        name="calendars"
        component={CalendarSelectScreen}
        options={{
          tabBarLabel: 'Calendars',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="more-vertical" />,
        }}
      />
    </MainTabsNvaigator.Navigator>
  );
};

const RootNavigator = createNativeStackNavigator();

const Root: React.FC = () => (
  <RootNavigator.Navigator screenOptions={{ headerShown: false }}>
    <RootNavigator.Group>
      <RootNavigator.Screen name="main" component={MainTabs} />
    </RootNavigator.Group>
    <RootNavigator.Group screenOptions={{ presentation: 'transparentModal' }}>
      <RootNavigator.Screen name="locationSet" component={LocationSetScreen} />
      <RootNavigator.Screen name="routineSet" component={RoutineSetScreen} />
      <RootNavigator.Screen name="agendaContextSet" component={AgendaContextSetScreen} />
      <RootNavigator.Screen name="planSettings" component={PlanSettingsScreen} />
    </RootNavigator.Group>
  </RootNavigator.Navigator>
);

const Router: React.FC = () => {
  const theme = useTheme();
  const baseTheme = useMemo(
    () => DefaultTheme,
    [],
  );
  const navigationTheme = useMemo(
    () => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: theme.colors.shade,
        card: theme.colors.background,
        text: theme.colors.text,
      }
    }),
    [baseTheme, theme],
  );
  return (
    <NavigationContainer theme={navigationTheme}>
      <Root />
    </NavigationContainer>
  )
};

export { Router };
