import React from "react";
import ReactDOM from "react-dom";
import { Provider, createClient } from "urql";

import "./index.css";
import App from "./App";

const client = createClient({
  url: "http://localhost:4000"
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
