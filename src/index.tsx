import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import "react-dates/initialize";

import "./index.css";
import App from "./App";
import { ShowFeedbackProvider } from "./ShowFeedbackContext";

const uri = "http://localhost:4000";
const client = new ApolloClient({ uri, cache: new InMemoryCache() });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ShowFeedbackProvider>
      <App />
    </ShowFeedbackProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
