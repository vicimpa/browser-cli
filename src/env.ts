import { getAllProgram } from "library/program";
const startTime = Date.now();

export const env = async () => {
  return {
    startTime,
    commands: await getAllProgram()
  };
};