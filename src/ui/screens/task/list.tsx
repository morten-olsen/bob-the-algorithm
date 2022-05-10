import { useRemoveTask, useTasks } from "#/features/tasks";
import { List, Page } from "#/ui/components/base";
import { RootNavigationProp, TaskListScreenRouteProp } from "#/ui/router";
import { useNavigation, useRoute } from "@react-navigation/native";

const TaskListScreen: React.FC = () => {
  const { 
    params: { type },
  } = useRoute<TaskListScreenRouteProp>();
  const { navigate } = useNavigation<RootNavigationProp>();
  const tasks = useTasks(type);
  const [removeTask] = useRemoveTask();

  return (
    <Page>
      <List
        items={tasks}
        remove={removeTask}
        getKey={l => l.id}
        add={() => navigate('add-task', { type })}
        render={(item) => ({
          title: item.title,
          onPress: () => {
            navigate('add-task', { id: item.id })
          },
        })}
      />
    </Page>
  );
}

export { TaskListScreen };
