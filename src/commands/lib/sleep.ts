export function sleep(n = 0) {
  const time = Date.now() + n;

  while (true) {
    if (Date.now() < time)
      continue;

    return;
  }
}