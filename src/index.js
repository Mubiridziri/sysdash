import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import ColorContextProvider from "./themes";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <ColorContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ColorContextProvider>,
  document.querySelector("#root")
);
