import React from "react";
import "./App.css";
// import { InitBalancePanel } from "./components/InitBalancePanel";
import { BalancePanel } from "./components/BalancePanel";
import { Movement } from "./types/Movement";
import { MovementType } from "./types/MovementType";
import { AddMovementButton } from "./components/AddMovementButton";
// import { AddMovementPanel } from "./components/AddMovementPanel";

const movements: Array<Movement> = [
  { id: "1", amount: -10, type: MovementType.FOOD, date: Date.now() },
  { id: "2", amount: -517, description: "Rata di agosto", type: MovementType.MUTUO, date: Date.now() },
  { id: "3", amount: 1920, description: "Stipendio di agosto", type: MovementType.STIPENDIO, date: Date.now() },
  { id: "4", amount: -10, description: "Rocket", type: MovementType.FUN, date: Date.now() }
];

function App() {
  return (
    <>
      <BalancePanel balance={125456.23} movements={movements} />
      <AddMovementButton />
      {/* <AddMovementPanel /> */}
    </>
  );
  // return <InitBalancePanel />;
}

export default App;
