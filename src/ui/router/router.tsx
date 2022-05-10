import { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '../components/base';
import { DayScreen } from '../screens/day';
import { TaskAddScreen } from '../screens/task/add';
import { MainTabParamList, RootStackParamList } from './types';
import { Platform } from 'react-native';
import { MoreScreen } from '../screens/more';
import { LocationListScreen } from '../screens/locations/list';
import { LocationSetScreen } from '../screens/locations/set';

const MoreStackNavigator = createNativeStackNavigator();

const MoreStack: React.FC = () => (
  <MoreStackNavigator.Navigator>
    <MoreStackNavigator.Screen name="more-main" component={MoreScreen} />
    <MoreStackNavigator.Screen name="locations" component={LocationListScreen} />
  </MoreStackNavigator.Navigator>
);

const MainTabsNvaigator = createBottomTabNavigator<MainTabParamList>();

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
          tabBarLabel: 'Days',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="check-square" />,
        }}
        name="day"
        component={DayScreen}
      />
      <MainTabsNvaigator.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'More',
          tabBarIcon: ({ focused }) => <Icon color={focused ? 'primary' : 'text'} name="more-vertical" />,
        }}
        name="more"
        component={MoreStack}
      />
    </MainTabsNvaigator.Navigator>
  );
};

const RootNavigator = Platform.OS === 'web'
  ? createStackNavigator<RootStackParamList>()
  : createNativeStackNavigator<RootStackParamList>();

const Root: React.FC = () => (
  <RootNavigator.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
    <RootNavigator.Group>
      <RootNavigator.Screen name="main" component={MainTabs} />
    </RootNavigator.Group>
    <RootNavigator.Group screenOptions={{ presentation: 'transparentModal' }}>
      <RootNavigator.Screen name="add-task" component={TaskAddScreen} />
      <RootNavigator.Screen name="set-location" component={LocationSetScreen} />
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
