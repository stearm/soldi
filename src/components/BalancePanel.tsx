import * as React from "react";
import moment from "moment";
import numeral from "numeral";
import styled from "styled-components";
import { Movement } from "../types/Movement";

import { DayPicker } from "../components/DayPicker";
import { MovementInfoAndIcon } from "../types/MovementType";
import { BalanceSpan } from "./BalanceSpan";
import { ChartsPanel } from "./ChartsPanel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
`;

const MovementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  box-shadow: rgba(8, 35, 51, 0.03) 0px 0px 2px, rgba(8, 35, 51, 0.05) 0px 3px 6px;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  & > div > i {
    margin-right: 10px;
  }
`;

const ArrowsWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 10px;
  left: 0px;
  padding: 8px 10px;
  border-radius: 5px;
  color: rgb(31, 100, 212);

  & > div > i.im-arrow-left-circle {
    margin-right: 8px;
  }

  & > div > i {
    position: relative;
    top: 3px;
    font-size: 30px;
  }
`;

interface Props {
  balance: number;
  startBalance: number;
  endBalance: number;
  onChangeDateRange: (startDate: moment.Moment | null, endDate: moment.Moment | null) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  selectedStartDate: moment.Moment | null;
  selectedEndDate: moment.Moment | null;
  movements: Array<Movement>;
}

export const BalancePanel: React.FC<Props> = ({
  balance,
  startBalance,
  endBalance,
  movements,
  selectedStartDate,
  selectedEndDate,
  onChangeDateRange,
  onNextPage,
  onPreviousPage
}) => {
  const [isPickerOpen, setPickerOpen] = React.useState(false);

  return (
    <Wrapper>
      <div>
        <div style={{ paddingLeft: 10, fontSize: 25 }}>Your current balance is</div>
        <BalanceSpan>{numeral(balance).format("0.00")}</BalanceSpan>
        <ChartsPanel startBalance={startBalance} movements={movements} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", top: -5, margin: "7px 0px" }}>
          <i
            className="im im-calendar"
            style={{ marginRight: 5 }}
            onClick={_ => setPickerOpen(pickerOpen => !pickerOpen)}
          />
          {selectedStartDate && selectedEndDate && (
            <div>
              {selectedStartDate.format("DD/MM/YYYY")} - {selectedEndDate.format("DD/MM/YYYY")}
            </div>
          )}
        </div>
      </div>
      <div>
        {movements.map(m => {
          const isNegative: boolean = m.amount < 0;
          const absValue: number = Math.abs(m.amount);
          const formattedValue: string = numeral(absValue).format("0.00");
          const movementDate: string = moment(m.date).format("DD-MM-YYYY");
          const { info, icon } = MovementInfoAndIcon[m.type];

          return (
            <MovementWrapper key={m.id}>
              <div style={{ display: "flex", marginBottom: 10 }}>
                <span style={{ fontWeight: 900, marginRight: 2 }}>
                  {isNegative ? "-" : "+"}&nbsp;
                  {formattedValue}
                </span>
                <span>{m.description && `(${m.description})`}</span>
              </div>
              <div style={{ display: "flex" }}>
                <i style={{ color: MovementInfoAndIcon[m.type].color }} className={`im ${icon}`} />
                <span>{info}&nbsp;</span>
                <span style={{ marginLeft: "auto" }}>{movementDate}</span>
              </div>
            </MovementWrapper>
          );
        })}
      </div>
      <ArrowsWrapper>
        <div onClick={onPreviousPage} style={{ position: "relative" }}>
          <i className="im im-arrow-left-circle" />
        </div>
        <div onClick={onNextPage} style={{ position: "relative" }}>
          <i className="im im-arrow-right-circle" />
        </div>
      </ArrowsWrapper>
      {isPickerOpen && (
        <DayPicker
          onClickOutside={() => setPickerOpen(false)}
          onChangeDateRange={onChangeDateRange}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
        />
      )}
    </Wrapper>
  );
};
