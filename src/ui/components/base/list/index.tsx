import { FlatList } from "react-native";
import { Button } from "../button";
import { Icon } from "../icon";
import { Cell, Row, RowProps } from "../row";

type ListProps<T> = {
  add?: () => void;
  remove?: (item: T) => any;
  getKey: (item: T) => string;
  items: T[];
  render: (item: T) => RowProps;
}

function List<T>({
  add,
  remove,
  getKey,
  items,
  render,
}: ListProps<T>) {
  return (
    <>
      {!!add && <Button title="Add" onPress={add}/>}
      <FlatList
        data={items}
        keyExtractor={item => getKey(item)}
        renderItem={({ item }) => {
          const {right, ...props} = render(item);
          return (
            <Row
              {...props}
              right={(
                <>
                  {right}
                  {!!remove && (
                    <Cell onPress={() => remove(item)}>
                      <Icon
                        name="trash"
                        color="destructive"
                      />
                    </Cell>
                  )}
                </>
              )}
            />
          );
        }}
      />
    </>
  );
}

export { List };
