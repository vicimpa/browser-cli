export function sleep(n = 0) {
  const time = Date.now() + n;
  while (Date.now() < time);
}