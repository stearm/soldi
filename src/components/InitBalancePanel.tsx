import * as React from "react";
import styled from "styled-components";

const decimalRegExp = new RegExp(/^[0-9]*\.[0-9]{2}$/);

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
`;

export const InitBalancePanel: React.FC = () => {
  const [balance, setBalance] = React.useState("");
  const [isWrongFormat, setIsWrongFormat] = React.useState(false);

  React.useEffect(() => {
    const match = decimalRegExp.test(balance);
    setIsWrongFormat(!match);
  }, [balance]);

  return (
    <Wrapper>
      <BalanceSpan>Enter your initial balance:</BalanceSpan>
      <BalanceInput type="text" value={balance} onChange={e => setBalance(e.target.value)} />
      <SubmitButton>Start</SubmitButton>
    </Wrapper>
  );
};
