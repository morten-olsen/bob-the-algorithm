import styled from "styled-components/native";

type Props = {
  children: React.ReactNode;
};
const Wrapper = styled.View`
  flex-direction: row;
`;

const Horizontal = ({ children }: Props) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

export { Horizontal };
