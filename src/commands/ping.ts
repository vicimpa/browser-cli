import { delay } from "library/delay";

export default async function (this: IContext) {
  this.log('Wait 1 second');
  await delay(1000);
  this.log('Pong!');

}
