import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Icon } from '../icon';
import { Row, Cell } from '../row';
import { Page } from '../page';

interface Props {
  onClose?: () => void;
  children: ReactNode;
}

const Top = styled.Pressable`
  flex: 1;
`;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 200px;
  border-radius: 12px;
  margin-bottom: -12px;
`;

const Outer = styled.View`
  flex: 1;
`;

const Popup: React.FC<Props> = ({ visible, children, onClose }) => {
  const insets = useSafeAreaInsets();

  return (
    <Page>
      <Outer>
        <Top onPress={onClose} />
        <Wrapper style={{ paddingBottom: insets.bottom + 12 }}>
          <Row
            right={
              <Cell onPress={onClose}>
                <Icon name="x-circle" />
              </Cell>
            }
          />
          {children}
        </Wrapper>
      </Outer>
    </Page>
  );
};

export default Popup;
