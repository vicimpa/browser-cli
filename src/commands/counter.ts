import { delay } from "library/delay";

export default async function (
  this: IContext,
  ...args: string[]
) {
  this.log('Seconds counter.');
  let i = 0;

  while (true) {
    this.log('Count: ', ++i);
    await delay(1000);
  }
}
