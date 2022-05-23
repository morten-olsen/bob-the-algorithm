import styled from "styled-components/native";
import { Page, Row } from '../base';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Wrapper = styled.View`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  padding: ${({ theme }) => theme.margins.medium}px;
  background: ${({ theme }) => theme.colors.background};
`;

const FormLayout = ({ children, title }: Props) => {
  return (
    <Page>
      <Wrapper>
          { title && <Row title={title} />}
          {children}
      </Wrapper>
    </Page>
  );
};

export { FormLayout };
