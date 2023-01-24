import { sleep } from "./lib/sleep";

export const _description_ = 'Every seconds counter';

export default function (
  this: IContext,
  ...args: string[]
) {
  this.log('Press Ctrl+C for exit.');
  let i = 0;

  while (true) {
    this.log('Count: ', ++i);
    sleep(1000);
  }
}
