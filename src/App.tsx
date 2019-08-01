import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { AddMovementPanel } from "./components/AddMovementPanel";
import { HomePageContainer } from "./containers/HomePageContainer";

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route path="/" exact component={HomePageContainer} />
            <Route path="/add-movement" component={AddMovementPanel} />
          </Switch>
        )}
      />
    </Router>
  );
}

export default App;
