import * as React from "react";
import moment from "moment";
import numeral from "numeral";
import styled from "styled-components";
import { Movement } from "../types/Movement";

import { MovementInfoAndIcon } from "../types/MovementType";
import { BalanceSpan } from "./styles/BalanceSpan";
import { ChartsPanel } from "./ChartsPanel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5%;
`;

const MovementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: #f7f7f7;
  padding: 10px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  & > div > i {
    margin-right: 10px;
  }
`;

interface Props {
  balance: number;
  movements: Array<Movement>;
}

export const BalancePanel: React.FC<Props> = ({ balance, movements }) => {
  return (
    <Wrapper>
      <span style={{ paddingLeft: 10, fontSize: 25 }}>Your current balance is</span>
      <BalanceSpan>{numeral(balance).format("0.00")}</BalanceSpan>
      <ChartsPanel balance={balance} movements={movements} />
      {movements.map(m => {
        const isNegative: boolean = m.amount < 0;
        const absValue: number = Math.abs(m.amount);
        const formattedValue: string = numeral(absValue).format("0.00");
        const movementDate: string = moment(m.date).format("DD-MM-YYYY");
        const { info, icon } = MovementInfoAndIcon[m.type];

        return (
          <MovementWrapper key={m.id}>
            <div style={{ display: "flex", marginBottom: 10 }}>
              <span style={{ fontWeight: 900 }}>
                {isNegative ? "-" : "+"}&nbsp;
                {formattedValue}
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <i style={{ color: MovementInfoAndIcon[m.type].color }} className={`im ${icon}`} />
              <span>{info}&nbsp;</span>
              <span>{m.description && `(${m.description})`} </span>
              <span style={{ marginLeft: "auto" }}>{movementDate}</span>
            </div>
          </MovementWrapper>
        );
      })}
    </Wrapper>
  );
};
