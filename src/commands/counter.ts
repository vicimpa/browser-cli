import { delay } from "./lib/delay";

export const _description_ = 'Every seconds counter';

export default async function (
  this: IContext,
  ...args: string[]
) {
  this.log('Seconds counter.');
  this.log('Press Ctrl+C for exit.');
  let i = 0;

  while (true) {
    this.log('Count: ', ++i);
    await delay(1000);
  }
}
