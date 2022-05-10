import { TaskType } from "#/features/data";
import { useTasks } from "#/features/tasks";
import { Group } from "#/ui/components/base"
import { RootNavigationProp } from "#/ui/router";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { TaskListItem } from "../list-item";

type Props = {
  type: TaskType;
}

const TaskGroup: React.FC<Props> = ({ type }) => {
  const { navigate } = useNavigation<RootNavigationProp>();
  const tasks = useTasks(type);

  const add = useCallback(
    (type: TaskType) => {
      navigate('add-task', {
        type,
      })
    },
    [navigate],
  );

  return (
    <Group
      title={type}
      add={() => add(type)}
      items={tasks || []}
      getKey={(task) => task.id}
      render={(task) => (
        <TaskListItem
          item={task}
          onPress={() => {
            navigate('set-override', { id: task.id });
          }}
        />
      )}
    />
  );
};

export { TaskGroup };
