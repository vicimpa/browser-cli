import { Cli } from "components/cli.component";
import { env } from "env";
import { StrictMode } from "react";
import { render } from "react-dom";

import './index.sass';

const app = document.getElementById('app');

render(
  <StrictMode>
    <Cli />
  </StrictMode>,
  app
);

console.log(env);