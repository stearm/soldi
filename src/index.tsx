import React from "react";
import ReactDOM from "react-dom";
import { Provider, createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import "react-dates/initialize";

import "./index.css";
import App from "./App";
import { ShowFeedbackProvider } from "./ShowFeedbackContext";

// const url = "http://192.168.1.167:4000";
const url = "http://10.0.0.49:4000";
// const url = "http://localhost:4000";

const client = createClient({
  url,
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
