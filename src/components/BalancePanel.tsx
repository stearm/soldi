import * as React from "react";
import styled from "styled-components";
import { Movement } from "../types/Movement";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10%;
`;

const BalanceSpan = styled.span`
  font-size: 75px;
  font-weight: 800;
  align-self: center;
  border: 1px solid black;
  padding: 10px;
`;

const MovementWrapper = styled.div``;

interface Props {
  balance: number;
  movements: Array<Movement>;
}

export const BalancePanel: React.FC<Props> = ({ balance, movements }) => {
  return (
    <Wrapper>
      <BalanceSpan>{balance}</BalanceSpan>
      {movements.map(m => {
        return (
          <MovementWrapper key={m.id}>
            {m.amount} - {m.description} - {m.type}
          </MovementWrapper>
        );
      })}
    </Wrapper>
  );
};
