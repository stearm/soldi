import React from "react";
import ReactDOM from "react-dom";
import { Provider, createClient, fetchExchange, cacheExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";

import "./index.css";
import App from "./App";

const client = createClient({
  url: "http://localhost:4000",
  exchanges: [devtoolsExchange, cacheExchange, fetchExchange]
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
