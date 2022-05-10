import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Icon } from '../icon';
import { Row, Cell, RowProps } from '../row';
import { Page } from '../page';

type Props = RowProps & {
  onClose?: () => void;
  children: ReactNode;
}

const Top = styled.Pressable`
  flex: 1;
`;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 500px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 200px;
  border-radius: 12px;
  margin-bottom: -12px;
  max-height: 80%;
`;

const Outer = styled.View`
  flex: 1;
  align-items: center;
`;

const Content = styled.ScrollView`
`;

const Popup: React.FC<Props> = ({ children, onClose, right, ...rowProps }) => {
  const insets = useSafeAreaInsets();

  return (
    <Page>
      <Outer>
        <Top onPress={onClose} />
        <Wrapper style={{ paddingBottom: insets.bottom + 12 }}>
          <Row
            {...rowProps}
            right={
              <>
                {right}
                <Cell onPress={onClose}>
                  <Icon name="x-circle" />
                </Cell>
              </>
            }
          />
          <Content>
            {children}
          </Content>
        </Wrapper>
      </Outer>
    </Page>
  );
};

export { Popup };
