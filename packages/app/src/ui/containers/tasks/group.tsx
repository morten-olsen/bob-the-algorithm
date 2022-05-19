import { TaskType } from "#/features/data";
import { useTasks } from "#/features/tasks";
import { Group } from "@morten-olsen/ui"
import { RootNavigationProp } from "#/ui/router";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

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
      render={(task) => ({
        title: task.title,
        onPress: () => {
          navigate('set-override', { id: task.id });
        },
      })}
    />
  );
};

export { TaskGroup };
