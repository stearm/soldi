import * as React from "react";
import gql from "graphql-tag";
import { useMutation } from "urql";

import { AddMovementPanel } from "../components/AddMovementPanel";
import { RouteComponentProps } from "react-router-dom";
import { Movement } from "../types/Movement";
import { MovementType } from "../types/MovementType";
import { MutationFN } from "../types/urql/MutationFN";

const CREATE_MOVEMENT = gql`
  mutation createMovement($amount: Float!, $description: String, $type: MovementType!, $date: Date) {
    createMovement(input: { amount: $amount, description: $description, type: $type, date: $date }) {
      id
      amount
      type
      description
      date
    }
  }
`;

type Props = RouteComponentProps;
export type CreateMovementMutationVariables = { amount: number; description?: string; type: MovementType; date?: Date };
export type CreateMovementMutationFN = MutationFN<CreateMovementMutationVariables, { createMovement: Movement }>;

export const AddMovementContainer: React.FC<Props> = ({ ...routeProps }) => {
  const [response, createMovement] = useMutation<{ createMovement: Movement }, CreateMovementMutationVariables>(
    CREATE_MOVEMENT
  );
  const { fetching, error } = response;

  return <AddMovementPanel {...routeProps} loading={fetching} error={error && error.message} create={createMovement} />;
};
