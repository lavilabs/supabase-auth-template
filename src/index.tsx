import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SupabaseContextProvider } from "./context/supabaseContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <SupabaseContextProvider>
      <App />
    </SupabaseContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
