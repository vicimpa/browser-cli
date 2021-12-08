import { delay } from "./lib/delay";

export const _description_ = 'Ping-Pong Program';

export default async function (this: IContext) {
  this.log('Wait 1 second');
  await delay(1000);
  this.log('Pong!');

}
