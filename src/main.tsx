import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import * as themes from "./theme/schema.json";
import { ThemeData } from "./interface/ThemeData.ts";
import { setToLS } from "./utils/storage.ts";
const schemaData: ThemeData = themes;
export const Index = () => {
  setToLS("all-themes", schemaData);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Index />
  </React.StrictMode>
);
