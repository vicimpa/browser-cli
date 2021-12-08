import type { env } from "env";

export default undefined;

try {
  if (!(self instanceof Window))
    throw 'Hi';
} catch (e) {
  const context: IContext = {
    log(...args: any[]) {
      postMessage(JSON.stringify({ program: 'log', args }));
    },
    error(...args: any[]) {
      postMessage(JSON.stringify({ program: 'error', args }));
    },
    clear() {
      postMessage(JSON.stringify({ program: 'clear', args: [] }));
    }
  };

  addEventListener('message', async ({ data }) => {
    const { program = '', args = [], cmd, env: environments } = JSON.parse(data) as {
      program: string,
      args: string[];
      cmd: string;
      env: typeof env;
    };

    (globalThis as any)['env'] = environments;

    const run = async () => {
      try {
        let module = {} as any, mod = cmd.split('"')[1];

        if (!mod)
          throw new Error(`commands/${program}`);

        try {

          module = /* @vite-ignore */ await import(`${mod}`);
        } catch (e) {
          try {

            module = /* @vite-ignore */ await import(`../commands/${program}`);
          } catch (e) { }
        }
        const subcommand = args[0];

        if (!module)
          throw new Error(`commands/${program}`);

        if (
          !module.default &&
          !module[subcommand]
        ) return `Error executable in "${program}"`;

        if (module[subcommand]) {
          if (typeof module[subcommand] == 'function')
            return await module[subcommand].apply(context, args.splice(1));
          else
            return module[subcommand];
        } else {
          if (typeof module.default == 'function')
            return await module.default.apply(context, args);
          else
            return module.default;
        }
      } catch (e) {
        if (e instanceof Error) {
          if (
            e.message.indexOf(`commands/${program}`) != -1 ||
            e.message.indexOf(`import`) != -1
          ) return `bsh: command not found: ${program}`;
        }

        return String(e);
      }
    };

    run()
      .then(context.log)
      .catch(context.error)
      .finally(() => {
        postMessage(JSON.stringify({ program: 'end', args: [] }));
      });
  });
}