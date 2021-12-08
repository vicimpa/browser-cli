import { getEnv } from "./lib/getEnv";


export const _description_ = 'Show help message';

export default async () => {
  return getEnv().commands
    .map(e => `  - ${e.name}\t${e.description ? `(${e.description})` : ''}`)
    .join('\n');
};

