import { sleep } from "./lib/sleep";

export const _description_ = 'Ping-Pong Program';

export default function (this: IContext) {
  this.log('Wait 1 second');
  sleep(1000);
  this.log('Pong!');
}
