import * as React from "react";
import moment from "moment";
import { useQuery } from "urql";
import gql from "graphql-tag";

import { Balance } from "../types/Balance";
import { Movement } from "../types/Movement";
import { BalancePanel } from "../components/BalancePanel";
import { InitBalancePanel } from "../components/InitBalancePanel";
import { AddMovementButton } from "../components/AddMovementButton";

const GET_BALANCE_AND_MOVEMENTS = gql`
  query getBalanceAndMovements($startDate: Date, $endDate: Date, $offset: Int) {
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
    listMovements: movements(where: { from: $startDate, to: $endDate }, offset: $offset) {
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

const LIMIT = 1;

const HomePageContainer: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });

  const [offset, setOffset] = React.useState(0);

  const result = useQuery<QueryResult>({
    query: GET_BALANCE_AND_MOVEMENTS,
    variables: {
      ...dateRange,
      offset,
      limit: LIMIT
    }
  });

  const changeRange = (startDate: moment.Moment | null, endDate: moment.Moment | null) =>
    setDateRange({ startDate, endDate });

  const nextPage = () => setOffset(offset => offset + LIMIT);
  const previousPage = () => setOffset(offset => offset - LIMIT);

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
        <BalancePanel
          balance={balance.amount}
          startBalance={startBalance.amount}
          endBalance={endBalance.amount}
          selectedStartDate={dateRange.startDate}
          selectedEndDate={dateRange.endDate}
          onChangeDateRange={changeRange}
          onNextPage={nextPage}
          onPreviousPage={previousPage}
          movements={movements}
        />
        <AddMovementButton />
      </>
    );
  }
};

export { HomePageContainer };
