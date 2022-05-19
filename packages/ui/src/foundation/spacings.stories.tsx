import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useTheme } from 'styled-components/native';
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

const Example = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: red;
`

const SpacingComponent = () => {
  const theme = useTheme();

  return (
    <Table>
      <Thead>
        <tr>
          <td>Example</td>
          <td>Name</td>
          <td>Size</td>
        </tr>
      </Thead>
      <tbody>
        {Object.entries(theme.margins).map(([key, value]) => {
          return (
            <Row key={key}>
              <td><Example size={value} /></td>
              <td>{key}</td>
              <td>{value}px</td>
            </Row>
          )
        })}
      </tbody>
    </Table>
  )
  }

export default {
  title: 'Foundation/Spacing',
  component: SpacingComponent,
} as ComponentMeta<typeof SpacingComponent>;

export const Spacing = () => <SpacingComponent />;

