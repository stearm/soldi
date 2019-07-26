import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { InitBalancePanel } from "./components/InitBalancePanel";
import { BalancePanel } from "./components/BalancePanel";
import { Movement } from "./types/Movement";
import { MovementType } from "./types/MovementType";

const movements: Array<Movement> = [
  { id: "1", amount: -10, type: MovementType.LUNCH },
  { id: "2", amount: 517, description: "Rata di agosto", type: MovementType.MUTUO },
  { id: "3", amount: 1920, description: "Stipendio di agosto", type: MovementType.STIPENDIO },
  { id: "4", amount: -10, description: "Rocket", type: MovementType.FUN }
];

function App() {
  return <BalancePanel balance={125456.23} movements={movements} />;
}

export default App;
