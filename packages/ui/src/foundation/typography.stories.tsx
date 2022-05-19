import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useTheme } from 'styled-components/native';
import { types } from '../typography';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  max-width: 900px;
  margin: auto;
  border-collapse: collapse;
  border-spacing:0;

  td {
    margin: 0; 
    padding: 15px 15px;
  }
`;

const Thead = styled.thead`
  font-weight: bold;
`;

const Row = styled.tr`
  padding: 0 15px;
  &:nth-child(even) {
    background: rgba(0, 0, 0, .05);
  }
`;

const TypographyComponent = () => {
  const theme = useTheme();

  return (
    <Table>
      <Thead>
        <tr>
          <td>Example</td>
          <td>Name</td>
          <td>Size</td>
          <td>Weight</td>
          <td>Spacing</td>
        </tr>
      </Thead>
      <tbody>
        {Object.entries(theme.typography).map(([key, value]) => {
          const Component = types[key];
          return (
            <Row key={key}>
              <td><Component>{key}</Component></td>
              <td>{key}</td>
              <td>{value.size || 1}x</td>
              <td>{value.weight || 'normal'}</td>
              <td>{value.spacing || 0}px</td>
            </Row>
          )
        })}
      </tbody>
    </Table>
  )
  }

export default {
  title: 'Foundation/Typography',
  component: TypographyComponent,
} as ComponentMeta<typeof TypographyComponent>;

export const Typography = () => <TypographyComponent />;

