
import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useTheme } from 'styled-components/native';
import { Icon } from '../components/base/icon';
import styled from 'styled-components';
import { icons } from 'feather-icons';

const Table = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
`;

const Row = styled.div`
  padding: 35px;
  &:nth-child(even) {
    background: rgba(0, 0, 0, .05);
  }
`;

const Name = styled.div`
  text-align: center;
  font-weight: bold;
`;

export const Icons = () => {
  const theme = useTheme();

  return (
    <Table>
      {Object.entries(icons).map(([key, value]) => {
        return (
          <Row>
            <Icon name={key} size={220} />
            <Name>
              {key}
            </Name>
          </Row>
        )
      })}
    </Table>
  )
  }

export default {
  title: 'Foundation/Icons',
  component: Icons,
} as ComponentMeta<typeof Icons>;

