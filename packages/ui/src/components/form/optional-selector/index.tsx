import { Body1 } from "../../../typography";
import { useCallback } from "react";
import styled from "styled-components/native";
import { Row, RowProps, Cell, Icon } from "../../base";

type Props<T> = {
  label: string;
  setEnabled: (enabled: boolean) => void;
  enabled: boolean;
  onChange: (items: T[]) => void;
  items: T[];
  enabledText: string;
  disabledText: string;
  selected?: T[];
  render: (item: T) => RowProps;
  getKey: (item: T) => string;
};

const Wrapper = styled.View`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.shade};
  border-radius: 7px;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-radius: 5px;
`;

const Top = styled.View`
  flex-direction: row;
`;

const Touch = styled.TouchableOpacity`
  flex: 1;
`;

const Content = styled.View`
`;

const TopButton = styled.View<{ selected: boolean }>`
  background: ${({ selected, theme }) => selected ? theme.colors.shade : theme.colors.background};
  padding: ${({ theme }) => theme.margins.small}px;
  align-items: center;
  justify-content: center;
`

function OptionalSelector<T>({
  label,
  enabled,
  setEnabled,
  onChange,
  items,
  enabledText,
  disabledText,
  selected,
  render,
  getKey,
}: Props<T>) {
  const toggle = useCallback(
    (item: T) => {
      if (!selected) {
        return onChange([item]);
      }
      const nextId = getKey(item);
      const current = selected.find(i => getKey(i) === nextId);
      if (current) {
        onChange(selected.filter(i => i !== current));
      } else {
        onChange([...selected, item]);
      }
    },
    [selected, getKey]
  )
  return (
    <Row overline={label}>
      <Wrapper>
        <Top>
          <Touch onPress={() => setEnabled(false)}>
            <TopButton selected={!enabled}>
              <Body1>{disabledText}</Body1>
            </TopButton>
          </Touch>
          <Touch onPress={() => setEnabled(true)}>
            <TopButton selected={enabled}>
              <Body1>{enabledText}</Body1>
            </TopButton>
          </Touch>
        </Top>
        {enabled && (
          <Content>
            {items.map((item) => {
              const { left, ...props } = render(item);
              const isSelected = !!selected && selected.includes(item);
              return (
                <Row
                  key={getKey(item)}
                  {...props}
                  left={(
                    <>
                      <Cell onPress={() => toggle(item)}>
                        <Icon name={isSelected ? 'check-circle' : 'circle'} />
                      </Cell>
                      {left}
                    </>
                  )}
                />
              );
            })}
          </Content>
        )}
      </Wrapper>
    </Row>
  )  
}

export { OptionalSelector }
