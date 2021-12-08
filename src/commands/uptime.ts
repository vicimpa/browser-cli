import { getEnv } from "./lib/getEnv";

export default () => {
  const { startTime } = getEnv();
  let delta = Date.now() - startTime;

  let ms = delta % 1000;
  let s = (delta /= 1000) | 0 % 60;
  let m = (delta /= 60) | 0 % 60;
  let h = (delta /= 60) | 0 % 24;
  let d = (delta /= 24) | 0;

  return `System uptime: ${d}d ${h}h ${m}m ${s}s ${ms}ms`;
};