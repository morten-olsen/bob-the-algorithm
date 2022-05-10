import React, { Fragment, ReactNode, useState } from 'react';
import styled from 'styled-components/native';
import Collapsible from 'react-native-collapsible';
import { Body1 } from '#/ui/typography';
import { Icon } from '../icon';
import { Row, Cell } from '../row';
import { Header } from './header';

interface ListProps<T> {
  title: string;
  items: T[];
  startHidden?: boolean;
  getKey: (item: T) => any;
  render: (item: T) => ReactNode;
  add?: () => void;
}

interface ChildProps {
  title: string;
  startHidden?: boolean;
  add?: () => void;
  children?: ReactNode;
}

const Wrapper = styled.View`
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.background};
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-radius: 5px;
`;

function Group<T = any>(props: ListProps<T> | ChildProps) {
  const [visible, setVisible] = useState(!props.startHidden);
  const { title, items, getKey, render, add, children } =
    props as ListProps<T> & ChildProps;
  return (
    <Row>
      <Wrapper>
        <>
          <Header
            left={
              <Cell><Icon name={visible ? 'chevron-down' : 'chevron-up'} size={18} /></Cell>
            }
            title={title}
            add={add}
            onPress={() => setVisible(!visible)}
          />
          <Collapsible collapsed={!visible}>
            {items && items.map((item, i) => (
              <Fragment key={getKey(item) || i}>{render(item)}</Fragment>
            ))}
            {children}
            {!children && (!items || items.length === 0) && (
              <Row
                left={
                  <Cell>
                    <Icon color="textShade" name="maximize" />
                  </Cell>
                }
              >
                <Body1 style={{ marginLeft: 10 }} color="textShade">
                  Empty
                </Body1>
              </Row>
            )}
          </Collapsible>
        </>
      </Wrapper>
    </Row>
  );
}

export { Group };
