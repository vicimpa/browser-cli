import "./index.sass";

import { Cli } from "components/cli.component";
import { StrictMode } from "react";
import { render } from "react-dom";

const app = document.getElementById('app');

render(
  <StrictMode>
    <Cli />
  </StrictMode>,
  app
);