import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store, { persistor } from "./services/store";
import { PersistGate } from "redux-persist/integration/react";
// import Session from "./services/Session";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  </React.StrictMode>
);
reportWebVitals(console.log);
