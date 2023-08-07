import { Cli } from "components/cli.component";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('app')!)
  .render(
    <StrictMode>
      <Cli />
    </StrictMode>
  );