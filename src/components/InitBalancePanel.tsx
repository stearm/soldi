import * as React from "react";
import styled from "styled-components";

import { useFormatChecker } from "../hooks/useFormatChecker";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10%;
`;

const BalanceSpan = styled.span`
  font-size: 55px;
  font-weight: 800;
`;

const BalanceInput = styled.input`
  padding: 20px 0px;
  font-size: 55px;
`;

const SubmitButton = styled.button`
  margin-top: 5px;
  font-size: 55px;
  font-weight: 800;
  border-radius: 5px;
`;

export const InitBalancePanel: React.FC = () => {
  const [balance, setBalance] = React.useState("");
  const isWrongFormat = useFormatChecker(balance);

  return (
    <Wrapper>
      <BalanceSpan>Enter your initial balance:</BalanceSpan>
      <BalanceInput type="text" value={balance} onChange={e => setBalance(e.target.value)} />
      <SubmitButton disabled={isWrongFormat}>Start</SubmitButton>
    </Wrapper>
  );
};
