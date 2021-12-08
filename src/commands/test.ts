import { delay } from "library/delay";

export default async function (
  this: IContext,
  ...args: string[]
) {

  let i = 0;

  while (true) {
    this.log('Hi', i++);
    await delay(1000);
  }
}
