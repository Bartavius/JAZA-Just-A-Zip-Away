import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./services/store";
// import Session from "./services/Session";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Session> */}
        <App /> 
      {/* </Session> */}
    </Provider>
  </React.StrictMode>
);
reportWebVitals(console.log);
