import { TaskType } from "#/features/data";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  main: undefined;
  'add-task': {
    type: TaskType;
  } | {
    id: string;
  };
  'set-location': {
    id?: string;
  };
  'set-override': {
    id: string;
  };
};

export type MainTabParamList = {
  day: NavigatorScreenParams<RootStackParamList>;
  plan: NavigatorScreenParams<RootStackParamList>;
  more: NavigatorScreenParams<RootStackParamList>;
}

export type MoreStackParamList = {
  locations: undefined;
  tasks: {
    type: TaskType;
  };
}

export type MoreScreenNavigationProps = NativeStackNavigationProp<
  MoreStackParamList
>;


export type RootRouteProp = RouteProp<RootStackParamList>;
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type LocationSetScreenRouteProp = RouteProp<RootStackParamList, 'set-location'>;

export type TaskAddScreenRouteProp = RouteProp<RootStackParamList, 'add-task'>;
export type TaskAddScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'add-task'
>;

export type TaskListScreenRouteProp = RouteProp<MoreStackParamList, 'tasks'>;

export type DayScreenRouteProp = RouteProp<MainTabParamList, 'day'>;
