import { getAllProgram } from "library/program";

export const env = async () => {
  return {
    startTime: Date.now(),
    commands: await getAllProgram()
  };
};