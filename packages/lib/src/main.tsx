import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.scss";
import { Page } from "./Page";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div style={{ height: "100%", width: "100%" }}>
      <Page></Page>
    </div>
  </React.StrictMode>
);
