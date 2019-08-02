import React from "react";
import ReactDOM from "react-dom";
import { Provider, createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";

import "./index.css";
import App from "./App";
import { ShowFeedbackProvider } from "./ShowFeedbackContext";

const client = createClient({
  url: "http://localhost:4000",
  exchanges: [devtoolsExchange, cacheExchange, fetchExchange]
});

ReactDOM.render(
  <Provider value={client}>
    <ShowFeedbackProvider>
      <App />
    </ShowFeedbackProvider>
  </Provider>,
  document.getElementById("root")
);
