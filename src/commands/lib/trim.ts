export const trim = (v: TemplateStringsArray, ...args: any[]) => {
  return v
    .reduce((a, e, i) => a + e + (args[i] || ''), '')
    .split(/\n/)
    .filter(e => e.trim()).
    join('\n');
}