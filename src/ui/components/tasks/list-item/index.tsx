import { Task } from "#/features/data";
import { Row, RowProps } from "../../base";

type Props = RowProps & {
  item: Task;
}

const TaskListItem: React.FC<Props> = ({ item, ...rowProps }) => {
  return (
    <Row
      {...rowProps}
      title={item.title}
    />
  );
};

export { TaskListItem };
