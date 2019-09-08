import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { FeedbackPanel } from "./components/FeedbackPanel";
import { AddMovementContainer } from "./containers/AddMovementContainer";
import { HomePageContainer } from "./containers/HomePageContainer";

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <>
            <Switch location={location}>
              <Route path="/" exact component={HomePageContainer} />
              <Route path="/add-movement" component={AddMovementContainer} />
            </Switch>
            <FeedbackPanel />
          </>
        )}
      />
    </Router>
  );
}

export default App;
