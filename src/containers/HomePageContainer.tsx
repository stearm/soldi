import * as React from "react";
import moment from "moment";
import { useQuery } from "urql";
import gql from "graphql-tag";

import { Balance } from "../types/Balance";
import { Movement } from "../types/Movement";
import { BalancePanel } from "../components/BalancePanel";
import { InitBalancePanel } from "../components/InitBalancePanel";
import { AddMovementButton } from "../components/AddMovementButton";
import { DayPicker } from "../components/DayPicker";
import { CSSProperties } from "react";

const GET_BALANCE_AND_MOVEMENTS = gql`
  query getBalanceAndMovements($startDate: Date, $endDate: Date) {
    getBalance: balance {
      id
      owner
      amount
    }
    getStartBalance: balance(atDate: $startDate) {
      id
      owner
      amount
    }
    getEndBalance: balance(atDate: $endDate) {
      id
      owner
      amount
    }
    listMovements: movements(where: { from: $startDate, to: $endDate }) {
      content {
        id
        amount
        description
        type
        date
        userId
      }
    }
  }
`;

type QueryResult = {
  getBalance: Balance | null;
  getStartBalance: Balance | null;
  getEndBalance: Balance | null;
  listMovements: { content: Array<Movement> };
};

const iconStyle: CSSProperties = { color: "#000000", position: "relative", top: 3 };

const HomePageContainer: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<{ startDate: moment.Moment | null; endDate: moment.Moment | null }>({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });

  const [isPickerOpen, setPickerOpen] = React.useState(false);

  const result = useQuery<QueryResult>({
    query: GET_BALANCE_AND_MOVEMENTS,
    variables: {
      ...dateRange
    }
  });

  const changeRange = (startDate: moment.Moment | null, endDate: moment.Moment | null) =>
    setDateRange({ startDate, endDate });

  const { data, fetching } = result[0];

  if (fetching || !data) {
    return <span>Loading...</span>;
  } else {
    const balance = data.getBalance;
    const startBalance = data.getStartBalance;
    const endBalance = data.getEndBalance;
    const movements = data.listMovements.content;

    if (!startBalance || !endBalance) {
      return <span>Error!</span>;
    }

    return !balance ? (
      <InitBalancePanel />
    ) : (
      <>
        <i className="im im-calendar" style={iconStyle} onClick={_ => setPickerOpen(pickerOpen => !pickerOpen)} />
        {isPickerOpen && (
          <DayPicker
            onChangeDateRange={changeRange}
            selectedStartDate={dateRange.startDate}
            selectedEndDate={dateRange.endDate}
          />
        )}
        <BalancePanel
          balance={balance.amount}
          startBalance={startBalance.amount}
          endBalance={endBalance.amount}
          movements={movements}
        />
        <AddMovementButton />
      </>
    );
  }
};

export { HomePageContainer };
