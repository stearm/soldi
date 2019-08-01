import * as React from "react";
import moment from "moment";
import { useQuery } from "urql";

import { Balance } from "../types/Balance";
import { Movement } from "../types/Movement";
import { BalancePanel } from "../components/BalancePanel";
import { InitBalancePanel } from "../components/InitBalancePanel";
import { AddMovementButton } from "../components/AddMovementButton";

const GET_BALANCE_AND_MOVEMENTS = `
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

const HomePageContainer: React.FC = () => {
  const result = useQuery<QueryResult>({
    query: GET_BALANCE_AND_MOVEMENTS,
    variables: {
      startDate: moment().startOf("month"),
      endDate: moment().endOf("month")
    }
  });

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
          movements={movements}
        />
        <AddMovementButton />
      </>
    );
  }
};

export { HomePageContainer };
