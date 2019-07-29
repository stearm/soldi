import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { BalancePanel } from "./components/BalancePanel";
import { Movement } from "./types/Movement";
import { MovementType } from "./types/MovementType";
import { AddMovementButton } from "./components/AddMovementButton";
import { AddMovementPanel } from "./components/AddMovementPanel";
import { InitBalancePanel } from "./components/InitBalancePanel";

const movements: Array<Movement> = [
  { id: "1", amount: -10, type: MovementType.FOOD, date: Date.now() },
  { id: "2", amount: -517, description: "Rata di agosto", type: MovementType.MUTUO, date: Date.now() },
  { id: "3", amount: 1920, description: "Stipendio di agosto", type: MovementType.STIPENDIO, date: Date.now() },
  { id: "4", amount: -10, description: "Rocket", type: MovementType.FUN, date: Date.now() }
];

const balance = 1;

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route
              path="/"
              exact
              component={() =>
                balance ? (
                  <>
                    <BalancePanel balance={125456.23} movements={movements} />
                    <AddMovementButton />
                  </>
                ) : (
                  <InitBalancePanel />
                )
              }
            />
            <Route path="/add-movement" component={AddMovementPanel} />
          </Switch>
        )}
      />
    </Router>
  );
}

export default App;
