import { env } from "env";
import Worker from "library/worker?worker";

import { version } from "../../package.json";
import { useProxyState } from "./useProxyState";

const modules = import.meta.glob('/src/commands/*.ts');

export const useRunner = () => {
  const state = useProxyState(() => ({
    running: false,
    output: [
      `Browser CLI v${version}\n`,
      `Type "help" for start or press "Tab"\n`
    ] as string[]
  }));

  const push = (str: string) => {
    if (!str) return;
    state.output.push(str + (str[str.length - 1] == '\n' ? '' : '\n'));
  };

  const context: IContext = {
    log(...args: any[]) {
      push(args.join(' '));
    },
    error(...args: any[]) {
      push('Error: ' + args.join(' '));
    },
    clear() {
      state.output.splice(0);
    }
  };

  return {
    running: state.running,
    output: state.output,
    clear: context.clear,
    context,
    runCommand(cmd: string, pre: string) {
      state.output.push(pre + cmd + '\n');
      cmd = cmd.trim();

      if (!cmd) return;
      const [program, ...args] = cmd.split(/\s+/);

      switch (program) {
        case 'clear': return context.clear();

        default: {
          state.running = true;

          const subs: (() => void)[] = [];
          const exit = () => subs.splice(0).map(e => e());
          const worker = new Worker();

          const listener = (e: KeyboardEvent) => {
            e.preventDefault();

            if (e.ctrlKey && e.key == 'c')
              exit();
          };

          document.addEventListener('keydown', listener);


          const promise = new Promise<void>(async (resolve) => {
            worker.onmessage = ({ data }) => {
              const { program, args } = JSON.parse(data);
              if (program == 'end')
                return resolve();
              else
                (<any>context)[program](...args);
            };

            const module = modules[`/src/commands/${program}.ts`];


            subs.push(() => {
              worker.terminate();
              resolve();
            });


            worker.postMessage(JSON.stringify({
              program,
              args,
              env: await env(),
              cmd: module?.toString() || ''
            }));
          });

          promise
            .finally(() => {
              exit();
              state.running = false;
              document.removeEventListener('keydown', listener);
            });
        }
      };
    }
  };
};